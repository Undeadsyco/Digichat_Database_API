/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'group_id'
      }
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    body: {
      type: DataTypes.STRING(5000),
      allowNull: false
    },
    edited: {
      type: DataTypes.INTEGER(1).UNSIGNED.ZEROFILL,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
      allowNull: false
    },
    dislikes: {
      type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
      allowNull: false
    },
    private: {
      type: DataTypes.INTEGER(1).UNSIGNED.ZEROFILL,
      allowNull: false
    },
    last_edited: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'posts'
  });
};
