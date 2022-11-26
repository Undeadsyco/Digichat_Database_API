// @ts-ckeck

/** @typedef {import('../types').request} request */
/** @typedef {import('../types').response} response */
/** @typedef {import('../types').nextFunction} nextFunction */
/** @typedef {import('../types').user} user */
/** @typedef {import('../types').GroupController} groupController */
/** @typedef {import('../types').passedObject} passedObject */

const { GroupQueries, MembershipQueries } = require('../queries');

const { GenericError } = require('../errors');

/**
 * @constructor
 */
class GroupController {
  /**
   * getAllGroups function uses the [findAllGroups]{@link GroupQueries.findAllGroups} query
   * in the {@link GroupQuery} object to access the model and retrive all
   * recored groups from the database, then sends a response to the client
   * @see GroupQueries
   * @see GroupQueries.findAllGroups
   * @async
   * @static
   * @method
   * @param {request} _ express request object: unused in this function
   * @param {response} res express request object
   */
  static async getAllGroups(_, res) {
    res.header('Content-Type', 'application/json');
    try {
      const groups = await GroupQueries.findAllGroups();
      if (!groups) throw new Error('could not find groups at this moment');

      res.send(JSON.stringify(groups));
    } catch (error) {
      res.json({ errMessage: error.message }).status(500);
    }
  }

  /**
   * getGroupById function uses the [findOneGroupById]{@link GroupQuery.findOneGroupById} query
   * in the {@link GroupQuery} class to access the model and retrive one recored group from the 
   * database based on the groupId inside the request.query object, then sends a responce to the client
   * @see GroupQueries
   * @see GroupQueries.findOneGroupById
   * @async
   * @static
   * @method
   * @param {passedObject} passedObject object passed from last route
   * @param {request} req express request object 
   * @param {response} res express responce object
   */
  static async getGroupById({ verifiedUser, error }, req, res) {
    try {
      if (error) throw error;

      const { groupId } = req.query;
      const group = await GroupQueries.findOneGroupById(groupId);

      res.header('Content-Type', 'application/json')
      res.json({ group }).end();
    } catch (error) {
      res.json({ errMessage: error.message }).status(500);
    }
  }

  // getGroupByParams
  // getOneGroupByParams

  /**
   * uses [createGroupByName]{@link GroupQueries.createGroupByName} query function in the 
   * {@link GroupQueries} class to add a new record to the group table if the name does not 
   * already exist, then uses the [addOwnerToGroup]{@link MembershipQueries.addOwnerToGroup} 
   * to create a connection bwteen the user and newly created group
   * @see GroupQueries
   * @see GroupQueries.createGroupByName
   * @see MembershipQueries
   * @see MembershipQueries.addOwnerToGroup
   * @async
   * @static
   * @method
   * @param {passedObject} passedObject object passed from last route
   * @param {request} req express request object 
   * @param {response} res express responce object
   */
  static async createNewGroup({ verifiedUser, error }, req, res) {
    res.header('Content-Type', 'application/json');
    try {
      if (error) throw error;

      const { groupName } = req.query;

      const { result: group, created: groupCreated } = await GroupQueries.createGroupByName(groupName);
      if (!groupCreated && !group) throw new Error('unable to create group at this time');
      else if (!groupCreated) throw new Error('this name is taken');

      const { result: membership } = MembershipQueries.addOwnerToGroup(verifiedUser.user_id, group.group_id);
      if (!membership) throw new GenericError();

      res.json({ group }).status(200);
    } catch (error) {
      res.json({ error: error.message }).status(500);
    }
  }

  /**
   * uses [getGroupMember]{@link MembershipQueries.getGroupMember} query function in the
   * {@link MembershipQueries} class to retrive the connection between a user and group,
   * then uses the [editGroupDetails]{@link GroupQueries.editGroupDetails} query function
   * in the {@link GroupQueries} class to edit a group record if the user has a membership 
   * status of owner
   * @see GroupQueries
   * @see GroupQueries.editGroupDetails
   * @see MembershipQueries
   * @see MembershipQueries.getGroupMember
   * @async
   * @static
   * @method
   * @param {passedObject} passedObject object passed from last route
   * @param {request} req 
   * @param {response} res 
   */
  static async updateGroupDetails({ verifiedUser, error }, req, res) {
    res.header('Content-Type', 'application/json');
    try {
      if (error) throw error;

      const { groupEdits } = req.body;

      const membership = await MembershipQueries.getGroupMember(verifiedUser.user_id, groupEdits.group_id);
      if (membership.membership_status !== 'Owner') res.send(JSON.stringify({ message: 'you cannot edit this' }));

      const group = await GroupQueries.editGroupDetails(groupEdits);
      if (!group) res.send(JSON.stringify({ message: 'edit was unsuccessful' }));

      res.send(JSON.stringify(group));
    } catch (error) {
      res.json({ message: error.message }).status(500);
    }
  }

  /**
   * uses [getGroupMember]{@link MembershipQueries.getGroupMember} query function in the
   * {@link MembershipQueries} class to retrive the connection between a user and group,
   * then uses the [editGroupDetails]{@link GroupQueries.editGroupDetails} query function
   * in the {@link GroupQueries} class to edit a group record if the user has a membership 
   * status of owner
   * @see GroupQueries
   * @see GroupQueries.editGroupDetails
   * @see MembershipQueries
   * @see MembershipQueries.getGroupMember
   * @async
   * @static
   * @method
   * @param {passedObject} passedObject object passed from last route
   * @param {request} req 
   * @param {response} res 
   */
  static async deleteGroupById({ verifiedUser, error }, req, res) {
    res.header('Content-Type', 'application/json');
    try {
      if (error) throw error;

      const membership = await MembershipQueries.getGroupMember(req.query.groupId, verifiedUser.user_id);
      if (!membership) throw new GenericError();
      if (relation.MemberShip !== 'Owner') throw new Error('You must be the owner');

      const success = await GroupQueries.deleteGroupById(req.query.groupId);
      if (!success) res.json({ message: 'was unable to successfully delete group' });
      res.status(200).json({ message: 'geoup was successfully deleted' });
    } catch (error) {
      res.json({ errMessage: error.message }).status(500);
    }
  }

  /**
   * uses [findOneGroupById]{@link GroupQueries.findOneGroupById},
   * [findOneGroupById]{@link GroupQueries.likeGroupById},
   * [findOneGroupById]{@link GroupQueries.dislikeGroupById},
   * query functions in the {@link GroupQueries} class to retrive a
   * the group matching the groupId and then ass a like or dislike
   * depending on the reactionType variable
   * @see GroupQueries
   * @see GroupQueries.findOneGroupById
   * @see GroupQueries.likeGroupById
   * @see GroupQueries.dislikeGroupById
   * @async
   * @static
   * @method
   * @param {passedObject} passedObject object passed from last route
   * @param {request} req
   * @param {response} res 
   */
  static async reactToGroupById({ verifiedUser, error }, req, res) {
    res.header('Content-Type', 'application/json');
    try {
      if (error) throw error;

      const { groupId, reactionType } = req.query;

      let group = await GroupQueries.findOneGroupById(groupId);
      if (!group) throw new Error('could not find specified group');

      if (reactionType === 'likes') group = await GroupQueries.likeGroupById(group);
      if (reactionType === 'dislikes') group = await GroupQueries.dislikeGroupById(group);

      res.status(200).json({ group });
    } catch (error) {
      res.json({ errMessage: error.message }).status(500);
    }
  }

  /**
   * uses [addRquestToJoinGroup]{@link MembershipQueries.addRquestToJoinGroup}
   * query function in the {@link MembershipQueries} class to create a connection
   * between user using userId, and group usring groupId
   * @see MembershipQueries
   * @see MembershipQueries.addRquestToJoinGroup
   * @async
   * @static
   * @method
   * @param {passedObject} passedObject object passed from last route
   * @param {request} req
   * @param {response} res 
   */
  static async joinGroupRequest({ verifiedUser, error }, req, res) {
    res.header('Content-Type', 'application/json');
    try {
      if (error) throw error;

      const { groupId } = req.query;
      const { _, created } = await MembershipQueries.addRquestToJoinGroup(groupId, verifiedUser.user_id);

      if (!created) res.json({ message: 'you are already in this group' });
      res.json({ message: 'group joined successfully' });
    } catch (error) {
      res.json({ errMessage: error.message }).status(500);
    }
  }

  // static async cancelGroupRequest() {}

  // static async denyGroupRequest() {}

  // static async acceptGroupRequest() {}

  /**
   * uses [removeUserFromGroupMembership]{@link MembershipQueries.removeUserFromGroupMembership}
   * query function in the {@link MembershipQueries} class to remove a connection between user 
   * using userId, and group usring groupId
   * @see MembershipQueries
   * @see MembershipQueries.removeUserFromGroupMembership
   * @async
   * @static
   * @method
   * @param {passedObject} passedObject object passed from last route
   * @param {request} req
   * @param {response} res 
   */
  static async leaveGroup({ verifiedUser, error }, req, res) {
    res.header('Content-Type', 'application/json');
    try {
      if (error) throw error;

      const { groupId } = req.query;
      const result = await MembershipQueries.removeUserFromGroupMemebership(verifiedUser.user_id, groupId);

      if (!result) throw new Error("was unable to process this request at the moment");
      res.json({ message: 'you have left the group' });
    } catch (error) {
      res.json({ errMessage: error.message }).status(500);
    }
  }

  /**
   * uses [getGroupMember]{@link MembershipQueries.getGroupMember}
   * and [getGroupMember]{@link MembershipQueries.promoteToAdminMembership}
   * query functions in the {@link MembershipQueries} class to retrive user
   * membership with in a group and then promotes that member to admin status
   * if the user has Owner or Admin Status
   * @see MembershipQueries
   * @see MembershipQueries.getGroupMember
   * @see MembershipQueries.promoteToAdminMembership
   * @async
   * @static
   * @method
   * @param {passedObject} passedObject object passed from last route
   * @param {request} req
   * @param {response} res 
   */
  static async promoteToAdmin({ verifiedUser, error }, req, res) {
    res.header('Content-Type', 'application/json');
    try {
      if (error) throw error;

      const { userId, groupId } = req.query;
      const membership = await MembershipQueries.getGroupMember(verifiedUser.user_id);
      if (!membership) throw new Error('was unable to confirm your membership status');
      if (membership.membership_status !== 'Owner' || membership.membership_status !== 'Admin')
        throw new Error('you must be the group owner to do this');

      const result = await MembershipQueries.promoteToAdminMembership(userId, groupId);
      if (!result) throw new Error('was unable to set user to admin');

      res.json({ message: 'user was made an admin successfully' });
    } catch (error) {
      res.json({ errMessage: error.message }).status(500);
    }
  }

  /**
   * uses [getGroupMember]{@link MembershipQueries.getGroupMember}
   * and [getGroupMember]{@link MembershipQueries.promoteToAdminMembership}
   * query functions in the {@link MembershipQueries} class to retrive user
   * membership with in a group and then demotes that admin to member status
   * if the user has Owner Status
   * @see MembershipQueries
   * @see MembershipQueries.getGroupMember
   * @see MembershipQueries.promoteToAdminMembership
   * @async
   * @static
   * @method
   * @param {passedObject} passedObject object passed from last route
   * @param {request} req
   * @param {response} res 
   */
  static async demoteToMember({ verifiedUser, error }, req, res) {
    res.header('Content-Type', 'application/json');
    try {
      if (error) throw error;

      const { userId, groupId } = req.query;

      const membership = await MembershipQueries.getGroupMember(verifiedUser.user_id);
      if (!membership) throw new Error('was unable to confirm your membership status');
      if (membership.membership_status !== 'Owner') throw new Error('you must be the group owner to do this');

      const result = await MembershipQueries.demoteToMemberMembership(userId, groupId);
      if (!result) throw new Error('was unable to set user to memeber');

      res.json({ message: 'seccessfully set user to member' });
    } catch (error) {
      res.json({ errMessage: error.message }).status(500);
    }
  }

  /**
   * uses [getGroupMember]{@link MembershipQueries.getGroupMember}
   * and [promoteToAdminMembership]{@link MembershipQueries.promoteToAdminMembership}
   * and [promoteToOwnerMembership]{@link MembershipQueries.promoteToOwnerMembership}
   * query functions in the {@link MembershipQueries} class to retrive user
   * membership with in a group and then promotes that admin to owner status
   * and demotes the owner to admin status if the user has Owner Status
   * @see MembershipQueries
   * @see MembershipQueries.getGroupMember
   * @see MembershipQueries.promoteToAdminMembership
   * @see MembershipQueries.promoteToOwnerMembership
   * @async
   * @static
   * @method
   * @param {passedObject} passedObject object passed from last route
   * @param {request} req
   * @param {response} res 
   */
  static async switchOwnership({ verifiedUser, error }, req, res) {
    try {
      if (error) throw error;

      const { userId, groupId } = req.query;

      const membership = await MembershipQueries.getGroupMember(verifiedUser.user_id);
      if (!membership) throw new Error('was unable to confirm your membership status');
      if (membership.membership_status !== 'Owner') throw new Error('you must be the group owner to do this');

      const toAdminResult = await MembershipQueries.promoteToAdminMembership(verifiedUser.user_id, groupId);
      const toOwnerResults = await MembershipQueries.promoteToOwnerMembership(userId, groupId);

      if (!toAdminResult || !toOwnerResults) throw new Error('something went wrong');

      res.json({ message: 'ownership successfully transfered' });
    } catch (error) {
      res.json({ errMessage: error.message }).status(500);
    }
  }
}

module.exports = GroupController;
