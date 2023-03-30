const {Router} = require('express');
const router = Router();
const blogController = require('../controllers/blogController');

router.get('/blog',blogController.getBlogs);

router.get('/blog/create',blogController.createBlog);

router.post('/blog',blogController.postBlog);

router.get('/blog/:id',blogController.getBlog);

router.get('/blog/delete/:id',blogController.deleteBlog);

module.exports = router;