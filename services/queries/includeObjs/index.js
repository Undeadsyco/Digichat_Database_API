// @ts-check
/** @typedef {import('../../types').includeObj} includeObj */
/** @typedef {import('../../types').includeObjList} includeObjList */
/** @typedef {import('../../types').includeOptions} includeOptions */

const models = require('../../../models');

/** @type {includeObj} */
const postAuthor = {
  model: models.users,
  as: 'postAuthor',
  attributes: ['username'],
}

/** @type {includeObj} */
const commentAuthor = {
  model: models.users,
  as: 'commentAuthor',
  attributes: ['username']
}

/** @type {includeObj} */
const postComments = {
  model: models.comments,
  as: 'postComments',
  include: commentAuthor,
}

/** @type {includeObj} */
const groupPosts = {
  model: models.posts,
  as: 'groupPosts',
  include: [
    postAuthor,
    postComments
  ]
}

/** @type {includeObj} */
const userGroups = {
  model: models.users,
  as: 'members'
}

/** @type {includeObj} */
const userPosts = {
  model: models.posts,
  as: 'userPosts',
  include: [
    postAuthor,
    postComments,
  ]
}

/** @type {includeObj} */
const groupMembers = {
  model: models.groups,
  as: 'userGroups',
}

/**
 * @typedef {Object} groupIncludeOptions
 * @property {boolean} members
 * @property {boolean} posts 
 */
/**
 * @typedef {Object} includeParam
 * @property {groupIncludeOptions} group
 * @property {any} user
 * @property {any} post
 * @property {any} comment
 */
/**
 * sets wheather the group posts or members 
 * should be returned with the groups
 * @function
 * @param {includeParam} includeParam an object defining which models to include when groups return
 * @return {Array<includeOptions>} include options
 */
const choseIncludeOptions = (includeParam) => {
  const {
    group = { posts: false, members: false },
    user = { posts: false, groups: false },
    post,
    comment
  } = includeParam;

  /** @type {Array<includeOptions>} */
  const include = [];

  if (group.members) include.push(groupMembers);
  if (group.posts) include.push(groupPosts);
  if (user.posts) include.push(userPosts);
  if (user.groups) include.push(userGroups);

  return include;
}

module.exports = choseIncludeOptions;
