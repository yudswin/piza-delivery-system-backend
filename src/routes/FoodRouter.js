const express = require("express");
const router = express.Router()
const FoodController = require('../controllers/FoodController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', FoodController.createFood)
router.put('/update/:id', authMiddleWare, FoodController.updateFood)
router.get('/getDetails/:id', FoodController.getDetailsFood)
router.delete('/delete/:id', authMiddleWare, FoodController.deleteFood)
router.get('/getAll', FoodController.getAllFood)
router.post('/deleteMany', authMiddleWare, FoodController.deleteMany)
router.get('/getAllType', FoodController.getAllType)
router.get('/getAllBest', FoodController.getAllBest)

module.exports = router