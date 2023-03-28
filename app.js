const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const helpers = require('./helpers/helpers');
const ejs = require('ejs');
require('dotenv').config();

const app = express();

// allow assets to be served
app.use(express.static('public'));

// register view engine
app.set('view engine', 'ejs');

// connect mongoose to db
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@first-project.k3cyc8a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology:true})
    .then((res)=>{
        console.log('DB connected Successfully');
        app.listen(3000);
    })
    .catch((err)=>{
        console.log('Oops! an error occured!');
        console.log(err);
    });

app.use(function(req, res, next) {
  res.locals.helpers = helpers;
  next();
});

app.get('/',(req, res)=>{
    Blog.find()
    .then((result)=>{
        res.render('index',{title: 'Home',currenturl: req.url,blogs: result});
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.get('/blog',(req, res)=>{
    res.render('blog',{title: 'Blog',currenturl: req.url});
});

app.get('/add-record',(req,res) => {
    const blog = new Blog({
        title: 'Second Blog post',
        snippet: 'This is the very start of this blog',
        body: 'This is the very start of this blog post of all other thing',
    });
    blog.save();
    res.send(blog);
    res.end();
});

app.get('/about',(req, res)=>{
    res.render('about',{ title: 'About',currenturl: req.url});
});

app.get('/contact',(req, res)=>{
    res.render('contact', { title: 'Contact',currenturl: req.url});
});

app.use((req,res) => {
    res.render('404', { title: '404',currenturl: req.url});
})


