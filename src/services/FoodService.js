const Food = require("../models/FoodModel")

const createFood = (newFood) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, category, type, countInStock, price, rating, description, discount } = newFood
        try {
            const checkFood = await Food.findOne({
                name: name
            })
            if (checkFood !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of Food is already'
                })
            }
            const newFood = await Food.create({
                name,
                image,
                type,
                countInStock: Number(countInStock),
                price,
                rating,
                description,
                discount: Number(discount),
            })
            if (newFood) {
                resolve({
                    status: 'OK',
                    message: 'Food item has been CREATED successfully.',
                    data: newFood
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateFood = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFood = await Food.findOne({
                _id: id
            })
            if (checkFood === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Food is not defined'
                })
            }

            const updatedFood = await Food.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'Food item has been UPDATED successfully.',
                data: updatedFood
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteFood = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFood = await Food.findOne({
                _id: id
            })
            if (checkFood === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Food is not defined'
                })
            }

            await Food.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Food item has been DELETED successfully.',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyFood = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Food.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Multiple food items have been DELETED successfully.',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsFood = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const foodItem = await Food.findOne({
                _id: id
            })
            if (foodItem === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Food is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Food item details fetched successfully.',
                data: foodItem
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllFood = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalFood = await Food.countDocuments()
            let allFood = []
            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Food.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    status: 'OK',
                    message: 'All food items fetched successfully.',
                    data: allObjectFilter,
                    total: totalFood,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalFood / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allFoodSort = await Food.find().limit(limit).skip(page * limit).sort(objectSort).sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    status: 'OK',
                    message: 'All food items fetched successfully.',
                    data: allFoodSort,
                    total: totalFood,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalFood / limit)
                })
            }
            if (!limit) {
                allFood = await Food.find().sort({ createdAt: -1, updatedAt: -1 })
            } else {
                allFood = await Food.find().limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
            }
            resolve({
                status: 'OK',
                message: 'All food items fetched successfully.',
                data: allFood,
                total: totalFood,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalFood / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Food.distinct('type')
            resolve({
                status: 'OK',
                message: 'All food types fetched successfully.',
                data: allType,
            })
        } catch (e) {
            reject(e)
        }
    })
}


const getAllBest = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const foodItem = await Food.find({ isBestSeller: true })
            if (foodItem === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Food is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Food item details fetched successfully.',
                data: foodItem
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createFood,
    updateFood,
    getDetailsFood,
    deleteFood,
    getAllFood,
    deleteManyFood,
    getAllBest,
    getAllType
}