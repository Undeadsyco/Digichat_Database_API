// ts-check

/** @typedef {import('../types').user} user */
/** @typedef {import('../types').userList} userList */
/** @typedef {import('../types').numberLike} numberLike */
/** @typedef {import('.').findOrCreateReturnObj} findOrCreateReturnObj */

const choseIncludeOptions = require('./includeObjs');

/** 
 * @namespace UserQueries
 * @category Services
 * @class
 * @hideconstructor 
 */
class UserQueries {
  /**
   * checks database for records containing the given email 
   * in request and if not found creates a new user in the 
   * table using info given in request
   * 
   * @static
   * @async
   * @method
   * @param {user} user 
   * @returns {Promise<findOrCreateReturnObj>} a promise containing the created user if it was created and a a created object signaling if it was created
   */
  static createNewUser = async (user) => await models.users.findOrCreate({
    where: { email: user.email },
    defaults: user
  });

  /**
   * finds and retreives a single user in the database based 
   * on the the search parameters given 
   * 
   * @static
   * @async
   * @method
   * @param {user} whereParam 
   * @returns {Promise<user>} a promise containing the searched user
   */
  static findOneUser = async (whereParam) => await models.users.findOne({
    where: whereParam,
    include: choseIncludeOptions({ user: { posts: true, groups: true }}),
  });

  /**
   * finds and retreives a user in the database using givin userId
   * 
   * @static
   * @async
   * @method
   * @param {numberLike} userId 
   * @returns {Promise<user>} a promise containing the searched user
   */
  static findUserById = async (userId) => await models.users.findByPk(userId, {
    attributes: ['user_id', 'full_name', 'username', 'email', 'admin'],
    include: choseIncludeOptions({ user: { posts: true, groups: true }}),
  });

  /**
   * finds and retreives all usres in database
   * 
   * @static
   * @async
   * @method
   * @param {user} whereParam
   * @returns {Promise<userList>} a promise containing a list of searched users
   */
  static findAllUsers = async (whereParam) => await models.users.findAll({ where: whereParam });
  
  /**
   * removes a user from the dadabase using givin userId
   * 
   * @static
   * @async
   * @method
   * @param {numberLike} userId 
   * @returns {Promise<any>}
   */
  static destroyUser = async (userId) => models.users.destroy({ where: { user_id: userId } });
}

module.exports = UserQueries;