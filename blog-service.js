const fs = require('fs');

// Global arrays to hold posts and categories
let posts = [];
let categories = [];

// Initialize function to read the JSON files
function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/posts.json', 'utf8', (err, data) => {
      if (err) {
        reject('Unable to read posts file');
      } else {
        posts = JSON.parse(data);

        fs.readFile('./data/categories.json', 'utf8', (err, data) => {
          if (err) {
            reject('Unable to read categories file');
          } else {
            categories = JSON.parse(data);
            resolve();
          }
        });
      }
    });
  });
}

// Function to get all posts
function getAllPosts() {
  return new Promise((resolve, reject) => {
    if (posts.length > 0) {
      resolve(posts);
    } else {
      reject('No results returned');
    }
  });
}

// Function to get only published posts
function getPublishedPosts() {
  return new Promise((resolve, reject) => {
    const publishedPosts = posts.filter(post => post.published === true);
    if (publishedPosts.length > 0) {
      resolve(publishedPosts);
    } else {
      reject('No published posts found');
    }
  });
}

// Function to get all categories
function getCategories() {
  return new Promise((resolve, reject) => {
    if (categories.length > 0) {
      resolve(categories);
    } else {
      reject('No categories found');
    }
  });
}

// Export the functions
module.exports = {
  initialize,
  getAllPosts,
  getPublishedPosts,
  getCategories
};
