// ts-check

/**
 * @category Services
 * @extends Error
 * @alias module:Errors/GroupErrors.GroupNotFound
 * @memberof GroupErrors
 */
class GroupNotFoundError extends Error {
  /** 
   * @constructor 
   * @param {string} message
   */
  constructor(message) {
    super(message);
  }
}

/** 
 * @namespace GroupErrors
 * @category Services
 * @exports Errors/GroupErrors
 */
module.exports = {
  /** @type {Error} */ GroupNotFoundError,
}