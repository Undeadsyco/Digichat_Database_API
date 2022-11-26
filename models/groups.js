/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('groups', {
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    group_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    discription: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    islikes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_private: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'groups'
  });
};
