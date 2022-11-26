/**
 * @category Services
 * @memberof module:Queries
 * @inner
 * @template T
 * @typedef {Object} findOrCreateReturnObj
 * @property {(T | undefined)} result 
 * Generic T used as placeholder for type of object to be returned if found
 * @property {any} created
 */

/**
 * @category Services
 * @memberof module:Queries 
 * @inner
 * @typedef {Object} queries
 * @property {GroupQueries} GroupQueries
 * @property {MembershipQueries} MembershipQueries
 * @property {UserQueries} UserQueries
 * @property {FriendshipQueries} FriendshipQueries
 */

const GroupQueries = require('./GroupQueries');
const MembershipQueries = require('./MembershipQueries');
const UserQueries = require('./UserQueries');
const FriendshipQueries = require('./FriendshipQueries');

/**
 * @namespace Queries
 * @category Services
 * @exports Queries
 * @type {queries}
 */
module.exports = {
  /** @type {GroupQueries} */ GroupQueries,
  /** @type {MembershipQueries} */ MembershipQueries,
  /** @type {UserQueries} */ UserQueries,
  /** @type {FriendshipQueries} */ FriendshipQueries,
}