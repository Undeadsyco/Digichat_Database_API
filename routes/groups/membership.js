const router = require("express").Router();
const Op = require('sequelize').Op;

const models = require("../../models");
const authService = require("../../services/auth");
const { GroupController } = require('../../services/controllers');

router.get('/', (req, res) => {
  res.json({ message: 'connected to membership route' });
});

router.post('/join_group', GroupController.joinGroupRequest);
router.delete('/leave_group', GroupController.leaveGroup);
router.put('/promote_admin', GroupController.promoteToAdmin);
router.put('/demote_admin', GroupController.demoteToMember);
router.put('/switch_owner', GroupController.switchOwnership);

module.exports = router;
