// routers
const router = require("express").Router();
const secureRouter = require('express').Router()
const membershipRouter = require('./membership');

// middleware
const { verifyUser } = require('../../services/middleware');

// controllers
const { GroupController } = require('../../services/controllers');

router.get('/', (req, res) => {
  res.send('connected to groups api route');
});

router.get('/get_all', GroupController.getAllGroups);

secureRouter.get('/get_by_id', GroupController.getGroupById);
secureRouter.post('/create_new', GroupController.createNewGroup);
secureRouter.put('/update_group', GroupController.updateGroupDetails);
secureRouter.delete('/delete_group', GroupController.deleteGroupById);
secureRouter.put('/react_to_group', GroupController.reactToGroupById);
secureRouter.use('/membership', membershipRouter);

router.use('/secure', verifyUser, secureRouter);

module.exports = router;
