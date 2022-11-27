const { CommentQueries } = require('../queries');

module.exports = class CommentController {
  static async getAllComments({ user }, req, res, next) {
    try {
      if (!user) throw new Error('')

      const comments = await CommentQueries.findAll({ PostId: req.params.postId });

      next({ comments });
    } catch (error) {
      next({ error })
    }
  }

  static async createComment({ user }, req, res, next) {
    try {
      if (!user) throw new Error();

      const { result, created } = await CommentQueries.create({
        PostId: req.body.postId,
        UserId: req.body.userId,
        CommentBody: req.body.body,
        Likes: 0,
        Dislikes: 0
      }, { CommentId: 0 });

      if (!created) throw new Error();

      next({ user });
    } catch (error) {
      next({ error });
    }
  }

  static async updateComment({ user }, req, res, next) {
    try {
      if (!user) throw new Error('');

      switch (req.params.type) {
        case 'likes':
          await CommentQueries.update({ Likes: parseInt(req.body.likes + 1) }, { CommentId: parseInt(req.params.commentId) });
          break;
        case 'dislikes':
          await CommentQueries.update({ Dislikes: parseInt(req.body.dislikes + 1) }, { CommentId: parseInt(req.params.commentId) });
          break;
      }

      next({ user });
    } catch (error) {
      next({ error });
    }
  }

  static async deleteComment({ user }, req, res, next) {
    try {
      if (!user) throw new Error('');

      const result = await CommentQueries.delete({ CommentId: req.params.commentId });

      if (!result) throw new Error('')

      next({ user });
    } catch (error) {
      next({ error });
    }
  }
}