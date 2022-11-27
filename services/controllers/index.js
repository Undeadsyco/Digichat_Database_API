const GroupController = require('./GroupController');
const UserController = require('./UserController');
const PostController = require('./PostsController');
const CommentController = require('./CommentsController');

/** 
 * @category Services 
 * @exports Controllers
 */
module.exports = {
  /** @type {GroupController} */ GroupController,
  /** @type {UserController} */ UserController,
  /** @type {PostController} */ PostController,
  /** @type {CommentController} */ CommentController,
}
