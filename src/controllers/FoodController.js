const FoodService = require('../services/FoodService')

const createFood = async (req, res) => {
    try {
        const { name, image, type, countInStock, price, rating, description, discount } = req.body

        if (name === undefined) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Name is missing.'
            })
        }
        if (image === undefined) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Image is missing.'
            })
        }
        if (type === undefined) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Type is missing.'
            })
        }
        if (countInStock === undefined) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Count in stock is missing.'
            })
        }
        if (price === undefined) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Price is missing.'
            })
        }
        if (rating === undefined) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Rating is missing.'
            })
        }
        if (discount === undefined) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Discount is missing.'
            })
        }

        const response = await FoodService.createFood(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            message: 'An error occurred while creating the food item.',
            error: e
        })
    }
}

const updateFood = async (req, res) => {
    try {
        const FoodId = req.params.id
        const data = req.body
        if (!FoodId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The FoodId is required'
            })
        }
        const response = await FoodService.updateFood(FoodId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsFood = async (req, res) => {
    try {
        const FoodId = req.params.id
        if (!FoodId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The FoodId is required'
            })
        }
        const response = await FoodService.getDetailsFood(FoodId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteFood = async (req, res) => {
    try {
        const FoodId = req.params.id
        if (!FoodId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The FoodId is required'
            })
        }
        const response = await FoodService.deleteFood(FoodId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await FoodService.deleteManyFood(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllFood = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await FoodService.getAllFood(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e) // Log the error
        return res.status(404).json({
            message: e.message // Send the error message in the response
        })
    }
}

const getAllType = async (req, res) => {
    try {
        const response = await FoodService.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllBest = async (req, res) => {
    try {
        const response = await FoodService.getAllBest()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}



module.exports = {
    createFood,
    updateFood,
    getDetailsFood,
    deleteFood,
    getAllFood,
    deleteMany,
    getAllBest,
    getAllType
}
