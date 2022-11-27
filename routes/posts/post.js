var express = require("express");
var router = express.Router();
var models = require("../../models");
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var authService = require("../../services/auth");

const PostController = require('../../services/controllers/PostsController');

router
  .route('/')
  .get(PostController.getAllPosts)
  .post(PostController.createPost, PostController.getAllPosts)
  .put(PostController.updatePost, PostController.getAllPosts)
  .delete(PostController.deletePost, PostController.getAllPosts);

module.exports = router