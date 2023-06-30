const { httpError } = require('../helpers/handleError')
const userModel = require('../models/users')
const jwt = require('jsonwebtoken');
const { tokenSign } = require('../helpers/generateToken');


const getItems = async (req, res) => {
    try {
        const listAll = await userModel.find({})
        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}

const getItem = async (req, res) => {
    try {
        const id = await userModel.findById(req.params.id);
        res.send({ id: id });
    } catch (e) {
        httpError(res, e);
    }
}

const createItem = async (req, res) => {
    try {
        const { name, age, email } = req.body
        const resDetail = await userModel.create({
            name, age, email
        })
        console.log(process.env.JWT_SECRET)
       const token = await tokenSign(resDetail); // Llama a tokenSign pasando resDetail como argumento

       res.send({ data: resDetail, token }) // Incluye el token en la respuesta
    } catch (e) {
        httpError(res, e)
    }
}


const updateItem = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, age, email } = req.body;
        
        const updatedUser = await userModel.findOneAndUpdate({ _id: id }, { name, age, email }, { new: true });
        
        res.send({ id: id, updatedUser: updatedUser });
    } catch (e) {
        httpError(res, e);
    }
}
const deleteItem = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedUser = await userModel.deleteOne({ _id: id });

        res.send({ id: id, deletedUser: deletedUser });
    } catch (e) {
        httpError(res, e);
    }
}

module.exports = { getItem, getItems, deleteItem, createItem, updateItem }