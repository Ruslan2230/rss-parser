# RSS Parser and Admin UI

## Опис

Цей проєкт реалізує парсер RSS стрічки та адміністративний інтерфейс для перегляду постів.

## Встановлення та запуск

1. Клонування репозиторію:
    ```bash
    git clone https://github.com/yourusername/rss-parser.git
    cd rss-parser
    ```

2. Створення файлу .env на основі .env.example та налаштування змінних оточення.

3. Запуск додатку за допомогою Docker:
    ```bash
    make up
    ```

4. Відкрийте браузер та перейдіть за адресою [http://localhost:3000](http://localhost:3000) для перевірки роботи парсера.

5. Для перегляду постів, перейдіть у директорію `admin-ui` та запустіть фронтенд додаток:
    ```bash
    cd admin-ui
    npm start
    ```

## Використання

Парсер буде автоматично запускатися кожну годину, завантажуючи нові публікації з RSS стрічки та зберігаючи їх у базу даних.
## docker build -t rss-parser .
## docker run -p 3000:3000 rss-parser