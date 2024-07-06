import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:3000/posts');
      setPosts(response.data);
    };
    fetchPosts();
  }, []);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {currentPosts.map(post => (
          <li key={post.id}>
            <a href={post.link}>{post.title}</a>
            <p>{post.pubDate}</p>
          </li>
        ))}
      </ul>
      <div>
        {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(number => (
          <button key={number + 1} onClick={() => paginate(number + 1)}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
