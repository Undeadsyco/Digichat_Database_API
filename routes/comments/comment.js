var express = require("express");
var router = express.Router();
var models = require("../../models");
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var authService = require("../../services/auth");

const { CommentController } = require('../../services/controllers');

router.route('/')
  .get(CommentController.getAllComments)
  .post(CommentController.createComment, CommentController.getAllComments)
  .put(CommentController.updateComment, CommentController.getAllComments)
  .delete(CommentController.deleteComment, CommentController.getAllComments)

module.exports = router