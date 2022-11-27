const models = require('../../models');

module.exports = class PostQueries {
  static findOne = async (whereParam) => await models.posts.findOne({ where: whereParam });
  static findAll = async (whereParam) => await models.posts.findAll({ where: whereParam });
  static createNew = async (user) => await models.posts.findOrCreate({ where: { PostId: 0 }, defaults: user });
  static update = async (post, whereParam) => await models.posts.update({ PostBody: post }, { where: whereParam });
  static destroy = async (whereParam) => await models.posts.destroy({ where: whereParam });
}