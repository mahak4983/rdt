const express = require('express');

const postController = require('../controllers/post');
const isAuth =  require('../middleware/is-auth');


const router = express.Router();

router.get('/post/:postId', postController.getSinglePost);

router.post('/post', isAuth, postController.postSinglePost);

router.get('/posts', postController.getPosts);

router.post('/addComment', isAuth, postController.addComment);