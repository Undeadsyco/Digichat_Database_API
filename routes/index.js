const router = require('express').Router();

const users = require('./users');
const groups = require('./groups/groups');
const posts = require('./posts/post');
const comments = require('./comments/comment');

const { UserController } = require('../services/controllers');
const { verifyUser, signUser } = require('../services/middleware');

router.get('/', (_, res) => { res.send('connected to api'); });

router.post('/signup', UserController.createUser, signUser);
router.get('/login', verifyUser, UserController.verifyUser);
router.post('/login', UserController.loginUser, signUser);
router.get('/logout', UserController.logoutUser);

// routes
router.use('/groups', groups);
router.use('/users', verifyUser, users);
router.use('/posts', verifyUser, posts);
router.use('/comments', verifyUser, comments);

module.exports = router;