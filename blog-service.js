const fs = require('fs');
const path = require('path');

let posts = [];
let categories = [];

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

function getAllPosts() {
  return new Promise((resolve, reject) => {
    if (posts.length > 0) {
      resolve(posts);
    } else {
      reject('No posts found');
    }
  });
}

function getCategories() {
  return new Promise((resolve, reject) => {
    if (categories.length > 0) {
      resolve(categories);
    } else {
      reject('No categories found');
    }
  });
}

module.exports = {
  initialize,
  getAllPosts,
  getCategories
};
