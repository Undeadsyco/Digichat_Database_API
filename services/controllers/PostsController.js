const PostQueries = require('../queries/PostQueries');

module.exports = class PostController {
  static async getAllPosts(req, res, next) {
    try {
      const posts = PostQueries.findAll({
        [Op.and]: [
          { Visible: 0 },
          { GroupId: 0 }
        ]
      });

      if (!posts) throw new Error('no posts found');

      next({ posts });
    } catch (error) {
      next({ error });
    }
  }

  static async createPost({ user }, req, res, next) {
    try {
      if (!user) {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify({ status: false, message: 'Something Went Wrong', data: null }));
      }

      const { result, created } = PostQueries.createNew({
        UserId: user.UserId,
        GroupId: req.body.groupId === undefined ? 0 : req.body.groupId,
        PostHead: req.body.title,
        PostBody: req.body.body,
        Likes: 0,
        Dislikes: 0,
        Visible: req.body.isHidden === false ? 0 : 1
      });

      if (!created) {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify({ status: false, message: 'something went wrong', data: null }));
      }

      next({ user });
    } catch (error) {
      next({ error });
    }
  }

  static async updatePost({ user }, req, res, next) {
    try {
      const post = PostQueries.findOne({ PostId: parseInt(req.body.postId) });
      if (parseInt(user.UserId) !== parseInt(post.UserId)) {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify({ ststus: false, message: 'Something Went Wrong', data: null }))
      }

      PostQueries.update(req.body.body, { PostId: parseInt(req.body.postId) });
      next({ user });
    } catch (error) {
      next({ error })
    }
  }

  static async deletePost({ user }, req, res, next) {
    try {
      if (!user) {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify({ status: false, message: 'Guests are not allowed to delete posts' }))
      }

      const post = PostQueries.findOne({ PostId: req.params.postId })

      if (user.UserId !== post.UserId || user.Admin !== 1) {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify({ status: false, id: [user.UserId, newPost[0].UserId] }))
      }

      const result = PostQueries.destroy({ PostId: req.params.postId });
      if (!result) {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify({ status: false, message: 'something whent worng' }))
      }

      next({ user });
    } catch (error) {
      next({ error });
    }
  }
}
