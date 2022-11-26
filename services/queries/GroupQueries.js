// ts-check

/** @typedef {import('../types').model} model */
/** @typedef {import('../types').group} group */
/** @typedef {import('.').findOrCreateReturnObj} findOrCreateReturnObj */

const models = require('../../models');
const choseIncludeOptions = require('./includeObjs/index');

/** 
 * @namespace GroupQueries
 * @category Services
 * @class 
 * @hideconstructor
 */
class GroupQueries {
  /** 
   * queries database for a list of all groups,
   * uses {@link choseIncludeOptions} function to include 
   * members and posts in the returned data
   * @see choseIncludeOptions
   * @async
   * @static
   * @method
   * @returns {Promise<model>} list of groups  
   */
  static findAllGroups = async () => await models.groups.findAll({
    include: choseIncludeOptions({ group: { members: true, posts: true }})
  });

  /**
   * queries database and returns all records matching the givin search
   * @async
   * @static
   * @method
   * @param {group} whereParams acceptable options to use when searching for a group
   * @returns {Promise<groupList>} list of groups matching where parameters
   */
  static findGroupsByParams = async (whereParams) => await models.groups.findAll({ where: whereParams });

  /**
   * queries the database for group matching givin id
   * @async
   * @static
   * @method
   * @param {numberLike} groupId 
   * @returns {Promise<group>} found group matching given id
   */
  static findGroupById = async (groupId) => await models.groups.findByPk(groupId);

  /**
   * queries the database for a single group and returns 
   * the first record matching the givin search parameters
   * @async
   * @static
   * @method
   * @param {group} whereParams acceptable options to use when searching for a group
   * @returns {Promise<group>} first found group mtching givin where parameters
   */
  static findGroupByParams = async (whereParams) => await models.groups.findOne({ where: whereParams });

  /**
   * queries the databse based on the givin group 
   * name and if it does not find a match, will 
   * create a new group in database
   * @async
   * @static
   * @method
   * @param {group} group 
   * @returns {Promise<findOrCreateReturnObj<group>>} 
   */
  static createGroupByName = async (group) => await models.groups.findOrCreate({
    where: { group_name: group.group_name },
    defaults: group
  });

  /**
   * using group id, applies specified updates 
   * in group edits obj to group matching id
   * @async
   * @static
   * @method
   * @param {group} groupEdits 
   * @returns {Promise<group>}
   */
  static editGroupDetails = async (groupEdits) => await models.groups.update(groupEdits, {
    where: { group_id: groupEdits.group_id }
  });

  /**
   * using groupId param, query the database for a 
   * group and removes matching group from the table
   * @async
   * @static
   * @method
   * @param {numberLike} groupId 
   * @returns {Promise<any>}  
   */
  static destroyGroupById = async (groupId) => await models.groups.destroy({
    where: { group_id: groupId }
  });

  /**
   * using groupId, add a like to the matching group
   * @async
   * @static
   * @method
   * @param {group} group
   * @returns {Promise<group>} edited group 
   */
  static likeGroupById = async (group) => await models.groups.update(
    { likes: group.likes + 1 },
    { where: { group_id: group.group_id } },
  );

  /**
   * using groupId, add a like to the matching group
   * @async
   * @static
   * @method
   * @param {group} group
   * @returns {Promise<group>} edited group 
   */
  static dislikeGroupById = async (group) => await models.groups.update(
    { dislikes: group.dislikes + 1 },
    { where: { group_id: group.group_id } },
  );
}

module.exports = GroupQueries;
