/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'post_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    body: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
      allowNull: false
    },
    dislikes: {
      type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
      allowNull: false
    }
  }, {
    tableName: 'comments'
  });
};
