const router = require('express').Router();

const { UserController } = require('../../services/controllers');

router.get('/', (req, res, next) => {
  res.send('connected to user friends route');
});

router.post('/request', UserController.sendFriendRequest);
router.delete('/cancel', UserController.cancelFriendrequest);
router.post('/accept', UserController.acceptFriendRequest);
router.put('/deny', UserController.denyFriendRequest);
router.delete('/remove', UserController.removeFriend);

module.exports = router;
