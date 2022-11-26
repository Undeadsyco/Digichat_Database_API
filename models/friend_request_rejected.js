/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('friend_request_rejected', {
    rejected_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    rejecting_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    date_rejected: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'friend_request_rejected'
  });
};
