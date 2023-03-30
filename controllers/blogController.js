const Blog = require('../models/blogs');

module.exports.getBlogs = (req, res)=>{
    Blog.find()
    .then((result)=>{
        res.render('blog',{title: 'Blog',currenturl: req.url,blogs: result});
    })
    .catch((err)=>{
        console.log(err);
    });
}

module.exports.createBlog = (req,res) => {
    res.render('create',{title: 'Create Blog',currenturl: req.url});
}

module.exports.postBlog = (req,res) => {
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=>{
        res.redirect('/blog');
    }).catch((err)=>{
        console.log(err);
    });
}

module.exports.getBlog = (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('view',{title: 'View Blog',currenturl: req.url,blog: result});
    }).catch((err)=>{
        console.log(err);
    });
}

module.exports.deleteBlog = (req,res)=>{
    const id = req.params.id;
    console.log(id);
    Blog.findByIdAndDelete(id)
    .then((result)=>{
         res.redirect('/blog');
    }).catch((err)=>{
        console.log(err);
    });
}