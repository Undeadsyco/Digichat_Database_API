// ts-check

/** @namespace */

/** @typedef {import("../types").numberLike} numberLike */
/** @typedef {import('.').findOrCreateReturnObj} findOrCreateReturnObj */

const { Op } = require("sequelize");
const models = require('../../models');

const destroyQueryWhere = (user1Id, user2Id) => ({
  where: {
    [Op.or]: [
      {
        [Op.and]: [
          { sender_id: user1Id },
          { receiver_id: user2Id },
        ],
      },
      {
        [Op.and]: [
          { sender_id: user2Id },
          { receiver_id: user1Id },
        ],
      }
    ]
  },
})

/** 
 * @namespace FriendshipQueries
 * @category Services
 * @class 
 * @hideconstructor
 */
class FriendshipQueries {
  /**
   * @alias module:Queries.FriendshipQueries.createFriendRequest
   * creates a connection between two users theat represents 
   * a friend request and sets its status as pending
   * 
   * @static
   * @async
   * @method
   * @param {numberLike} senderId 
   * @param {numberLike} receiverId 
   * @returns {Promise<any>}
   */
  static async createFriendRequest(senderId, receiverId) {
    return await models.friend_requests.create({
      sender_id: senderId,
      receiver_id: receiverId,
      request_status: 'pending'
    });
  }

  /**
   * destroys the relation between two users
   * representing the cancelation of the request 
   * 
   * @static
   * @async
   * @method
   * @param {numberLike} user1Id
   * @param {numberLike} user2Id
   * @returns {Promise<any>}
   */
  static async destroyFriendRequest(user1Id, user2Id) {
    return await models.friend_requests.destroy(destroyQueryWhere(user1Id, user2Id));
  }

  /**
   * updates the relation between two users, setting the 
   * status to what is givin the the request
   * 
   * @static
   * @async
   * @method
   * @param {any} update 
   * @returns {Promise<any>}
   */
  static async updateRequestStatus(update) {
    return await models.friend_requests.update(update, {
      where: {
        [Op.and]: [
          { sender_id: update.senderId },
          { receiver_id: update.receiverId },
        ],
      },
    });
  }

  /**
   * creates a relation between two users representing 
   * the two users as friends and sets its status to friends
   * 
   * @static
   * @async
   * @method
   * @param {numberLike} senderId 
   * @param {numberLike} receiverId 
   * @returns {Promise<any>}
   */
  static async createFriendRelation(senderId, receiverId) {
    return await models.friends.create({
      sender_id: senderId,
      receiver_id: receiverId,
      status: 'friends',
    });
  }

  /**
   * destroies the relation between two users representing 
   * the removing users from eachothers friends
   * 
   * @static
   * @async
   * @method
   * @param {numberLike} user1Id
   * @param {numberLike} user2Id
   * @returns {Promise<any>}
   */
  static async destroyFriendRelation(user1Id, user2Id) {
    return await models.friends.destroy(destroyQueryWhere(user1Id, user2Id));
  }
}

module.exports = FriendshipQueries;