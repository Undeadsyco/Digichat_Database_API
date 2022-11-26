const authService = require('../auth');

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) throw new Error('you must be logged in');
    const user = await authService.verifyUser(token);
    if (!user) throw new Error('unable to find user');
    if (user instanceof Error) throw user;

    next({ verifiedUser: user });
  } catch (error) {
    next({ error });
  }
}