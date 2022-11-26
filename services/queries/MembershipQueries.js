// @ts-ckeck

/** @typedef {import('../types').numberLike} numberLike */
/** @typedef {import('../types').groupMembership} groupMembership */
/** @typedef {import('.').findOrCreateReturnObj} findOrCreateReturnObj */

const Op = require('sequelize').Op;
const models = require('../../models');

const whereParams = (userId, groupId) => ({
  [Op.and]: [
    { group_id: groupId },
    { user_id: userId }
  ]
});

/** 
 * @namespace MembershipQueries
 * @category Services
 * @class 
 * @hideconstructor
 */
class MembershipQueries {
  /**
   * finds a member using userId in a group using groupId
   * 
   * @static
   * @async
   * @method
   * @param {numberLike} userId id of the searched member
   * @param {numberLike} groupId if of the searched group
   * @returns {Promise<groupMembership>}
   */
  static getGroupMember = async (userId, groupId) => await models.group_membership.findOne({ where: whereParams(userId, groupId) });

  /**
   * establishes a connection between a user using 
   * user id, and a group using group id to add 
   * that ueser to the group with an owner status
   * 
   * @static
   * @async
   * @method
   * @param {numberLike} userId 
   * @param {numberLike} groupId 
   * @returns {Promise<groupMembership>}
   */
  static addOwnerToGroup = async (userId, groupId) => await models.group_membership.create({
    group_id: userId,
    user_id: groupId,
    membership_status: 'Owner'
  });

  /**
   * establishes a connection between a user using user id,
   * and a group using group id to create a request for that 
   * ueser to join the group with a pending status
   * 
   * @static
   * @async
   * @method
   * @param {numberLike} groupId 
   * @param {numberLike} userId 
   * @returns {Promise<findOrCreateReturnObj<groupMembership>>}
   */
  static addRquestToJoinGroup = async (groupId, userId) => await models.group_requests.findOrCreate({
    where: whereParams(userId, groupId),
    defaults: {
      group_id: groupId,
      user_id: userId,
      membership_status: 'pending',
    }
  });

  /**
   * removes the connection between the user specified
   * with userId and the group specified with groupId
   * removing user from the group
   * 
   * @static
   * @async
   * @method
   * @param {numberLike} userId 
   * @param {numberLike} groupId 
   * @returns {Promise<any>}
   */
  static removeUserFromGroupMemebership = async (userId, groupId) => await models.group_membership.destroy({ where: whereParams(userId, groupId) });

  /**
   * updates a connection bewteen a user specified with
   * userId and a group specified with groupId to have
   * a mambership status of Admin
   * 
   * @static
   * @async
   * @method
   * @param {numberLike} userId 
   * @param {numberLike} groupId 
   * @returns {Promise<groupMembership>}
   */
  static promoteToAdminMembership = async (userId, groupId) => await models.group_membership.update(
    { membership_status: 'Admin' },
    { where: whereParams(userId, groupId) },
  );

  /**
   * updates a connection bewteen a user specified with
   * userId and a group specified with groupId to have
   * a mambership status of Member
   * 
   * @static
   * @async
   * @method
   * @param {numberLike} userId 
   * @param {numberLike} groupId 
   * @returns {Promise<groupMembership>}
   */
  static demoteToMemberMembership = async (userId, groupId) => await models.group_membership.update(
    { membership_status: 'Member' },
    { where: whereParams(userId, groupId) }
  );

  /**
   * updates a connection bewteen a user specified with
   * userId and a group specified with groupId to have
   * a mambership status of Owner
   * 
   * @static
   * @async
   * @method
   * @param {numberLike} userId 
   * @param {numberLike} groupId 
   * @returns {Promise<groupMembership>}
   */
  static promoteToOwnerMembership = async (userId, groupId) => await models.group_membership.update(
    { membership_status: 'Owner' },
    { where: whereParams(userId, groupId) },
  );
}

module.exports = MembershipQueries;
