const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone
            })
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = async (userLogin) => {
    const { email, password } = userLogin;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('The user is not defined');
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        throw new Error('The password or user is incorrect');
    }
    const accessToken = await genneralAccessToken({ id: user.id, isAdmin: user.isAdmin });
    const refreshToken = await genneralRefreshToken({ id: user.id, isAdmin: user.isAdmin });
    return {
        status: 'OK',
        message: 'SUCCESS',
        accessToken,
        refreshToken
    };
};

const updateUser = async (id, data) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('The user is not defined');
    }
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    return {
        status: 'OK',
        message: 'SUCCESS',
        data: updatedUser
    };
};

const deleteUser = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('The user is not defined');
    }
    await User.findByIdAndDelete(id);
    return {
        status: 'OK',
        message: 'Delete user success',
    };
};

const deleteManyUser = async (ids) => {
    await User.deleteMany({ _id: { $in: ids } });
    return {
        status: 'OK',
        message: 'Delete user success',
    };
};

const getAllUser = async () => {
    const allUser = await User.find().sort({createdAt: -1, updatedAt: -1});
    return {
        status: 'OK',
        message: 'Success',
        data: allUser
    };
};

const getDetailsUser = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('The user is not defined');
    }
    return {
        status: 'OK',
        message: 'SUCCESS',
        data: user
    };
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    deleteManyUser
};