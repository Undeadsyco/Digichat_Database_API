// ts-check

/**
 * @category Services
 * @extends Error
 * @alias module:Errors/UserErrors.UserError
 * @memberof UserErrors
 */
class UserError extends Error {
  /** 
   * @constructor 
   * @param {string} message error message to be passed into super method
   */
  constructor(message) {
    super(message)
  }
}

/**
 * @category Services
 * @extends UserError
 * @alias module:Errors/UserErrors.UserExistsError
 * @memberof UserErrors
 */
class UserExistsError extends UserError {
  /** 
   * @constructor
   * @param {string} email email used to search for user 
   */
  constructor(email) {
    super(`User using the email: ${email} already exists`);
  }
}

/**
 * @category Services
 * @extends UserError
 * @alias module:Errors/UserErrors.UserLoginError
 * @memberof UserErrors
 */
class UserLoginError extends UserError{
  /** 
   * @constructor 
   * @param {string} message error message to be passed into super method
   */
  constructor(message) {
    super(message);
  }
}

/**
 * @category Services
 * @extends UserLoginError
 * @alias module:Errors/UserErrors.IncorrectPasswordError
 * @memberof UserErrors
 */
class IncorrectPasswordError extends UserLoginError {
  /** @constructor */
  constructor() {
    super('Password is incorrect');
  }
}

/**
 * @category Services
 * @extends UserLoginError
 * @alias module:Errors/UserErrors.UserNotFoundError
 * @memberof UserErrors
 */
class UserNotFoundError extends UserLoginError {
  /** 
   * @constructor 
   * @param {string} email email used to search for user
   */
  constructor(email) {
    super(`Unable to find user with the given email: ${email}`);
  }
}

/**
 * @namespace UserErrors
 * @category Services
 * @exports Errors/UserErrors
 */
module.exports = {
  /** @type {Error} */ UserError,
  /** @type {Error} */ UserExistsError,
  /** @type {Error} */ UserLoginError,
  /** @type {Error} */ IncorrectPasswordError,
  /** @type {Error} */ UserNotFoundError,
}