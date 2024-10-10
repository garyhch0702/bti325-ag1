/*********************************************************************************
* BTI325 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Chenghao Hu Student ID: 149773228 Date: [2024/10/10]
*
* Online (Vercel) URL: https://bti325-ag2-qdenm0u41-garyhus-projects.vercel.app/
********************************************************************************/

const express = require('express');
const path = require('path');
const blogService = require('./blog-service');
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Redirect root to /about
app.get('/', (req, res) => {
  res.redirect('/about');
});

// Serve the about.html file
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Serve the blog posts that are published
app.get('/blog', (req, res) => {
  blogService.getPublishedPosts()
    .then(posts => res.json(posts))
    .catch(err => res.json({ message: err }));
});

// Serve all posts
app.get('/posts', (req, res) => {
  blogService.getAllPosts()
    .then(posts => res.json(posts))
    .catch(err => res.json({ message: err }));
});

// Serve all categories
app.get('/categories', (req, res) => {
  blogService.getCategories()
    .then(categories => res.json(categories))
    .catch(err => res.json({ message: err }));
});

// 404 Page Not Found route
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Initialize blog-service and start the server
blogService.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Express http server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(`Failed to initialize blog service: ${err}`);
  });
