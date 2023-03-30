const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const helpers = require('./helpers/helpers');
const ejs = require('ejs');
const blogRouter = require('./routes/blogRoute');
require('dotenv').config();

const app = express();

// allow assets to be served
app.use(express.static('public'));

// register view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

// connect mongoose to db
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@first-project.k3cyc8a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology:true})
    .then((res)=>{
        console.log('DB connected Successfully');
        app.listen(process.env.PORT || 3000);
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

app.use(blogRouter);

app.get('/about',(req, res)=>{
    res.render('about',{ title: 'About',currenturl: req.url});
});

app.get('/contact',(req, res)=>{
    res.render('contact', { title: 'Contact',currenturl: req.url});
});

app.use((req,res) => {
    res.render('404', { title: '404',currenturl: req.url});
})


