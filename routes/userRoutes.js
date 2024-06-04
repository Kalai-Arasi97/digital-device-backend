const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.post('/adddata', userController.addData);

router.post('/userlogin', userController.userLogin);

router.get('/getallusers', userController.getAllUsers);

router.put('/updateuser/:userId', userController.updateUser);

router.delete('/deleteuser/:userId', userController.deleteUser);


module.exports = router;
