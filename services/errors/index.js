// /** @typedef {import('./userErrors').userErrors} userErrors */
const UserErrors = require('./UserErrors');
const GroupErrors = require('./GroupErrors');

/**
 * @category Services
 * @memberof module:Errors
 * @inner
 * @typedef {Object} userErrors
 * @property {Error} UserError UserError class
 * @property {Error} UserExistsError UserExistsError class
 * @property {Error} UserLoginError UserLoginErrorClass
 * @property {Error} IncorrectPasswordError IncorrectPasswordError class
 * @property {Error} UserNotFoundError UserNotFoundError class
 */

/**
 * @category Services
 * @memberof module:Errors
 * @inner
 * @typedef {Object} groupErrors
 * @property {Error} GroupNotFoundError
 */

/**
 * @category Services
 * @class
 * @alias Errors#GenericError
 * @memberof module:Errors
 */
class GenericError extends Error {
  /** @constructor */
  constructor() {
    super('something went wrong');
  }
}

/** 
 * @namespace Errors
 * @category Services 
 * @exports Errors
 */
module.exports = {
  GenericError,
  /**
   * @type {userErrors}
   * @memberof module:Errors
   */
  UserErrors,
  /**
   * @type {groupErrors}
   * @memberof module:Errors
   */
  GroupErrors,
}