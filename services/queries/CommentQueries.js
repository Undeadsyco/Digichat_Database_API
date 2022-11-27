const models = require('../../models');

module.exports = class CommentQueries {
  // static findOne = async (whereParam) => ;
  static findAll = async () => await models.comments.findAll({ where: whereParam });
  static create = async (body, whereParam) => await models.comments.findOrCreate({ where: whereParam, defaults: body });
  static update = async (update, whereParam) => await models.comments.update( update, { where: whereParam } );
  static delete = async (whereParam) => await models.comments.destroy({ where: whereParam });
}