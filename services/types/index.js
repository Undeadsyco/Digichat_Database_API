/** @typedef {import('express').Request} request */
/** @typedef {import('express').Response} response */
/** @typedef {import('express').NextFunction} nextFunction */
/** @typedef {import('sequelize').Model} model */

/** @typedef {(string | number)} numberLike */
/** @typedef {(boolean | number)} booleanLike */
/** @typedef {Array<user>} userList */
/** @typedef {Array<group>} groupList */
/** @typedef {Array<post>} postList */
/** @typedef {Array<comment>} commentList */

/** 
 * @typedef {Object} includeObj
 * @property {(model | any)} model
 * @property {string} as
 * @property {Array<string>} [attributes] 
 * @property {includeOptions} [include]
 */
/** @typedef {Array<includeObj>} includeObjList */
/** @typedef {(includeObj | includeObjList | string | Array<string>)} includeOptions */

/**
 * @typedef {Object} user
 * @property  {numberLike} [user_id]
 * @property {string} [full_name]
 * @property {string} [email]
 * @property {string} [username]
 * @property {string} [password]
 * @property {boolean} [admin]
 * @property {groupList} [groups]
 * @property {postList} [posts]
 */

/**
 * @typedef {Object} group
 * @property {numberLike} [group_id]
 * @property {string} [group_name]
 * @property {string} [discription]
 * @property {number} [likes]
 * @property {number} [dislikes]
 * @property {booleanLike} [is_private]
 * @property {userList} [members]
 * @property {postList} [posts]
 */

/**
 * @typedef {Object} post
 * @property {numberLike} [postId]
 * @property {(numberLike | group)} [parent_id]
 * @property {(numberLike | user)} [author_id]
 * @property {string} [title]
 * @property {string} [body]
 * @property {booleanLike} [edited]
 * @property {number} [likes]
 * @property {number} [dislikes]
 * @property {booleanLike} [private]
 * @property {Date} [last_edited]
 * @property {commentList} [comments]
 */

/**
 * @typedef {Object} groupMembership
 * @property {(numberLike | group)} group_id
 * @property {(numberLike | user)} user_id
 * @property {string} membership_status
 */

/**
 * @typedef {Object} passedObject
 * @property {user} verifiedUser
 * @property {Error} error
 */

module.exports = {};