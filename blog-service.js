const fs = require('fs');
const path = require('path');

let posts = [];
let categories = [];

// Initialize function to read the JSON files
function initialize() {
  return new Promise((resolve, reject) => {
    try {
      posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'posts.json'), 'utf8'));
      categories = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'categories.json'), 'utf8'));
      resolve();
    } catch (err) {
      reject('Unable to read categories or posts file');
    }
  });
}

// Function to get all posts
function getAllPosts() {
  return new Promise((resolve, reject) => {
    if (posts.length > 0) {
      resolve(posts);
    } else {
      reject('No posts found');
    }
  });
}

// Function to get published posts
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
  getPublishedPosts,  // Ensure this is exported
  getCategories
};
