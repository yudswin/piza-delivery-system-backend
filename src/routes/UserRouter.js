const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

router.post('/signup', userController.createUser)
router.post('/signin', userController.loginUser)
router.post('/logout', userController.logoutUser)
router.put('/updateUser/:id', authUserMiddleWare, userController.updateUser)
router.delete('/deleteUser/:id', authMiddleWare, userController.deleteUser)
router.get('/getAll', userController.getAllUser)
router.get('/getDetails/:id', userController.getDetailsUser)
router.post('/refreshToken', userController.refreshToken)
router.post('/deleteMany', authMiddleWare, userController.deleteMany)

module.exports = router