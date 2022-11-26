/** @typedef {import('../types').request} request */
/** @typedef {import('../types').response} response */
/** @typedef {import('../types').nextFunction} nextFunction */
/** @typedef {import('../types').passedObject} passedObject */

const authService = require('../auth');
const { UserQueries, FriendshipQueries } = require('../queries');
const { UserErrors: { UserExistsError, UserNotFoundError } } = require('../errors');

/** @constructor */
class UserController {
  /**
   * using the [createUser]{@link UserQueries.createNewUser} query, search 
   * the database for user with matching email and creating a new user 
   * if its not found and throwing an [UserExistsError]{@link module:UserErrors.UserExistsError} if found
   * 
   * @static
   * @async
   * @method
   * @param {request} req express request object
   * @param {response} res express resonse object
   * @param {nextFunction} next express next function
   * 
   * @see UserQueries
   * @see [createNewUser]{@link UserQueries.createNewUser}
   * @throws {typeof UserExistsError} 
   * an error created when a user already exists matching the given email.
   * 
   *  see [UserExistsError]{@link module:UserErrors.UserExistsError}
   */
  static async createUser(req, res, next) {
    try {
      const { result: user, created } = await UserQueries.createNewUser({
        full_name: req.body.name,
        email: req.body.email,
        username: req.body.userName,
        password: authService.hashPassword(req.body.password),
        admin: 0
      })

      if (!created) throw new UserExistsError(req.body.email);

      next({ user });
    } catch (error) {
      next({ error });
    }
  }

  /** 
   * Using the [findOneUser]{@link UserQueries#findOneUser} query, 
   * search the database for a user with the givin email, throw a 
   * {@link UserNotFoundError} if not found, then passes the 
   * control to the {@link signUser} middleware with the next function
   * 
   * @see UserQueries
   * @see UserQueries#findOneUser
   * @see UserNotFoundError
   * @see signUser
   * @static
   * @async
   * @method
   * @throws {UserNotFoundError} An Error created when unable to find a user based on the searched paramaters
   * @param {request} req express request object
   * @param {response} res express resonse object
   * @param {nextFunction} next express next function
   */
  static loginUser = async (req, res, next) => {
    res.header('Content-Type', 'application/json');
    try {
      const user = await UserQueries.findOneUser({ email: req.body.email });
      if (!user) throw new UserNotFoundError(req.body.email);
      next({ user });
    } catch (error) {
      next({ error });
    }
  }

  /** 
   * using the [findOneUser]{@link UserQueries#findOneUser}, searches the 
   * database for a user matching the givin id, if not found, throws a 
   * {@link UserNotFoundError}, then sends the user in the responce object
   * 
   * @see UserQueries
   * @see UserQueries#findOneUser
   * @see [UserNotFoundError]{@link module:UserErrors#UserNotFoundError}
   * @static
   * @async
   * @method
   * @throws {Error} errors passed from {@link verifyUser} middleware
   * @throws {UserNotFoundError} An error created when unable to find user based on specified parameters 
   * @param {passedObject} passedObject object passed from the {@link verifyUser} middleware
   * @param {request} req express request object
   * @param {response} res express resonse object
   * @param {nextFunction} next express next function
   */
  static verifyUser = async ({ verifiedUser, error }, req, res, next) => {
    res.header('Content-Type', 'application/json');
    try {
      if (error) throw error;

      const user = await UserQueries.findOneUser({ user_id: verifiedUser.user_id });
      if (!user) throw new UserNotFoundError();
      res.json({ status: true, data: user });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  }

  /**
   * creates a new token that expires immediately, replacing existing token and effectivlly logging out user
   * 
   * @static
   * @async
   * @method
   * @param {request} req express request object
   * @param {response} res express resonse object
   * @param {nextFunction} next express next function
   */
  static logoutUser = async (req, res, next) => {
    res.cookie('jwt', "", { expires: new Date(0) })
    res.json({ result: true, message: 'logged out' });
  }

  /** 
   * 
   * 
   * @static
   * @async
   * @method
   * @param {passedObject} passedObject object passed from the {@link verifyUser} middleware
   * @param {request} req express request object
   * @param {response} res express resonse object
   * @param {nextFunction} next express next function
   */
  static getAllUsers = async ({ verifiedUser, error }, req, res, next) => {
    res.header('Content-Type', 'application/json');
    try {
      if (error) throw error;

      const users = await UserQueries.findAllUsers();
      res.json({ users });
    } catch (error) {
      res.json({ errMessage: error.messaage }).status(500);
    }
  }

  /** 
   * 
   * @static
   * @async
   * @method
   * @param {passedObject} passedObject object passed from the {@link verifyUser} middleware
   * @param {request} req express request object
   * @param {response} res express resonse object
   * @param {nextFunction} next express next function
   */
  static getOneUser = async ({ verifiedUser, error }, req, res, next) => {
    try {
      if (error) throw error;

      const user = await UserQueries.findOneUser({ email: req.body.email });
      if (!user) throw new UserNotFoundError(req.body.email);

      res.header('Content-Type', 'application/json');
      res.json({ user });
    } catch (error) {
      res.json({ errMessage: error.message }).status();
    }
  }

  /** 
   * 
   * @static
   * @async
   * @method
   * @param {passedObject} passedObject object passed from the {@link verifyUser} middleware
   * @param {request} req express request object
   * @param {response} res express resonse object
   * @param {nextFunction} next express next function
   */
  static deleteUser = async ({ verifiedUser, error }, req, res, next) => {
    try {
      if (error) throw error;

      if (user.Admin !== 1) throw new Error('');

      const result = await UserQueries.destroyUser(req.query.userId)
      if (!result) throw new Error('Was unable to delete user data this time');

      res.header('Content-Type', 'application/json')
      res.json({ message: 'user was successfully deleted' });
    } catch (error) {
      res.json({ errMessage: error.message }).status(500);
    }
  }

  /** 
   * 
   * @static
   * @async
   * @method
   * @param {passedObject} passedObject object passed from the {@link verifyUser} middleware
   * @param {request} req express request object
   * @param {response} res express resonse object
   * @param {nextFunction} next express next function
   */
  static sendFriendRequest = async ({ verifiedUser, error }, req, res, next) => {
    res.header('Content-Type', 'application/json');
    try {
      if (error) throw error;

      const request = await FriendshipQueries.createFriendRequest(verifiedUser, req.query.userId)
      if (!request) throw new Error(`was unable to create request from ${verifiedUser.user_id} to ${req.query.userId}`);

      res.json({ result: true, data: result });
    } catch (error) {
      res.json({ errMessage: error.message }).status(500);
    }
  }

  /** 
   * 
   * @static
   * @async
   * @method
   * @param {passedObject} passedObject object passed from the {@link verifyUser} middleware
   * @param {request} req express request object
   * @param {response} res express resonse object
   * @param {nextFunction} next express next function
   */
  static cancelFriendrequest = async ({ verifiedUser, error }, req, res, next) => {
    res.header('Content-Type', 'application/json');
    try {
      if (error) throw error;

      const result = await FriendshipQueries.destroyFriendRequest(verifiedUser.user_id);
      if (!result) throw new Error('Was unable to remove this user as a friend, please try again later');

      res.json({ messge: 'friend removed' });
    } catch (error) {
      res.json({ errMessage: error.message }).status(500);
    }
  }

  /** 
   * 
   * @static
   * @async
   * @method
   * @param {passedObject} passedObject object passed from the {@link verifyUser} middleware
   * @param {request} req express request object
   * @param {response} res express resonse object
   * @param {nextFunction} next express next function
   */
  static acceptFriendRequest = async ({ verifiedUser, error }, req, res, next) => {
    res.header('Content-Type', 'application/json');
    try {
      if (error) throw error;

      const { result: relation, created } = await FriendshipQueries.createFriendRelation(req.query.userId, verifiedUser.user_id);
      if (!created | !relation) throw new Error('');

      const updated = await FriendshipQueries.updateRequestStatus({
        sender_id: req.query.userId,
        receiver_id: verifiedUser.user_id,
        status: 'accepted',
      });
      if (!updated) throw new Error('');

      res.json({ message: 'you and blank are now friends' }).status(200);
    } catch (error) {
      res.json({ errMessage: error.message }).status(500);
    }
  }

  /** 
   * 
   * @static
   * @async
   * @method
   * @param {passedObject} passedObject object passed from the {@link verifyUser} middleware
   * @param {request} req express request object
   * @param {response} res express resonse object
   * @param {nextFunction} next express next function
   */
  static denyFriendRequest = async ({ verifiedUser, error }, req, res, next) => {
    res.header('Content-Type', 'application/json');
    try {
      if (error) throw error;

      const update = await FriendshipQueries.updateRequestStatus({
        sender_id: req.query.userId,
        receiver_id: verifiedUser.user_id,
        status: 'denied',
      });
      if (!update) throw new Error('unable to process request right now, please try again later');

      res.json({ messge: 'successful' });
    } catch (error) {
      res.json({ errMessage: error.message }).status(500);
    }
  }

  /** 
   * 
   * @static
   * @async
   * @method
   * @param {passedObject} passedObject object passed from the {@link verifyUser} middleware
   * @param {request} req express request object
   * @param {response} res express resonse object
   * @param {nextFunction} next express next function
   */
  static removeFriend = async ({ verifiedUser, error }, req, res, next) => {
    res.header('Content-Type', 'application/json')
    try {
      if (error) throw error;

      const result = await FriendshipQueries.destroyFriendRelation(verifiedUser.user_id, req.query.userId);
      if (!result) throw new Error(' unable to process request at this time');

      res.json({ message: 'friend has been removed successfully' });
    } catch (error) {
      res.json({ errMessage: error.message }).status(500);
    }
  }
}

module.exports = UserController;