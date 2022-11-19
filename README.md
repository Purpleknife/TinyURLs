# TinyURLs ✂️

TinyURLs is an app that allows users to shorten long URLs.

This project's goal is to revisit an old project made with Node JS, Express and EJS templates: [TinyApp](https://github.com/Purpleknife/tinyapp), and rebuild it using TypeScript, React JS and Express.

<strong><h3>🔴 This project's goals were:</h3></strong>
- Learn TypeScript.
- Learn how to use TypeScript with React.
- Learn how to pass down and handle props with TypeScript.
- Learn how to manage state with TypeScript.

## Features
- [X] A user can generate a short URL by submitting a long URL. 
- [X] They can login or register to save their generated tiny URLs.
- [X] They can delete or edit the URLs.
- [X] They can see how many times their tiny URL was clicked.
- [X] When they click on a tiny URL, they're redirect to its long URL.
- [X] They can see how many times the URL was clicked and when was the last visit.

## Testing with Jest
Since the project is limited in scope, I decided to include some tests for different parts of the app.

The result of these tests is 100% coverage.

![Test results](https://user-images.githubusercontent.com/107894342/202579607-778ca3ee-fe3d-4ec2-9636-7bb437d5c3b6.png)


## Setup
1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the `.env` file with your correct local information : username, password, database, port.
3. Install dependencies: `npm i` in both `front-end` and `back-end` folders.
4. `cd back-end` then `npm start` to run the Server, and `cd front-end` to run the App.
5. To reset the database: `npm run db:reset`.

## Final Product
https://user-images.githubusercontent.com/107894342/202586896-563c16c4-8f4a-4917-95f7-e503bbf4538f.mp4

![App_Overview](https://user-images.githubusercontent.com/107894342/202579593-e62e0f19-02bf-429e-be82-83de4593b208.png)



## Built with
- Back-end:
  - express
  - TypeScript
  - Node JS
  - bcryptjs
  - dotenv
  - method-override
  - morgan
  - pg
  - nodemon

- Front-end
  - React JS
  - TypeScript
  - React-Router
  - React-Cookie
  - React-Bootstrap
  - SASS
  - bcryptjs
  - axios
  - moment

- Database
  - PostgreSQL
