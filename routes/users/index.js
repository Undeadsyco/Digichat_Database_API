const router = require('express').Router();
const friendsRouter = require('./friends');

const { UserController } = require('../../services/controllers');

router.get('/', ({ verifiedUser, error }, req, res, next) => {
  try {
    if (error) throw error;
    res.send('connected to api users route');
  } catch (error) {
    res.json({ errMessage: error.message }).status(500);
  }
});

router.get('/get_all', UserController.getAllUsers);
router.get('/get_one', UserController.getOneUser);
router.delete('/delete_one', UserController.deleteUser);

router.use('/friends', friendsRouter);

module.exports = router;