const express = require('express'); 
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require('./models'); 
const jsonParser = bodyParser.json(); 
const app = express(); 
app.use(morgan('common'));

//Have Blog Posts already exist
BlogPosts.create('Intro', 'First content', 'Sesha', 'March 3'); 
BlogPosts.create('First', 'I feel great', 'Sesha', 'March 4'); 
BlogPosts.create('Second', 'I feel okay', 'Sesha', 'March 5'); 

//Get 
app.get('/blog-posts', (req, res) => {
 res.json(BlogPosts.get()); 
});

//Post 
app.post('/blog-posts', jsonParser, (req, res) => {
 const reqFields = ['title', 'content', 'author', 'publishDate']; 
 for (let i = 0; i < reqFields.length; i++){
  const field = reqFields[i]; 
  if (!(field in req.body)){
   const message = `Missing ${req.body}`;
   console.error(message); 
   return res.status(400).send(message);
  }
 }
 const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
 res.status(200).json(item);
});

//
