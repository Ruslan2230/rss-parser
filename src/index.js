const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const { CronJob } = require('cron');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

const sequelize = new Sequelize('yourdbname', 'yourdbuser', 'yourdbpassword', {
	host: 'db',
	dialect: 'postgres'
});

const Post = sequelize.define('Post', {
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	link: {
		type: DataTypes.STRING,
		allowNull: false
	},
	pubDate: {
		type: DataTypes.DATE,
		allowNull: false
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: true
	}
}, {
	tableName: 'posts'
});

const parseRSS = async () => {
	try {
		const response = await axios.get('https://lifehacker.com/rss');
		const rss = await xml2js.parseStringPromise(response.data);
		
		const posts = rss.rss.channel[0].item.map(item => ({
			title: item.title[0],
			link: item.link[0],
			pubDate: new Date(item.pubDate[0]),
			description: item.description[0]
		}));
		
		await Post.bulkCreate(posts, { ignoreDuplicates: true });
	} catch (error) {
		console.error('Error parsing RSS feed:', error);
	}
};

const job = new CronJob('0 * * * *', parseRSS, null, true, 'America/Los_Angeles');
job.start();

app.get('/', (req, res) => {
	res.send('RSS Parser is running!');
});

sequelize.sync().then(() => {
	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	});
}).catch(error => {
	console.error('Unable to connect to the database:', error);
});
