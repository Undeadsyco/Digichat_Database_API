/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('friends', {
    sender_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    receiver_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'friends'
  });
};
