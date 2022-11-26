/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('friend_requests', {
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    request_status: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'friend_requests'
  });
};
