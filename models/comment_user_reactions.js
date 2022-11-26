/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment_user_reactions', {
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'comments',
        key: 'comment_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    reaction_status: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'comment_user_reactions'
  });
};
