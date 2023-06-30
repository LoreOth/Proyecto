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
        const { name, age, email, role } = req.body
        const existingUser = await userModel.findOne({ email }) // Busca si hay otro usuario con el mismo email
        if (existingUser) { // Si se encuentra otro usuario con el mismo email
            return res.status(400).send({ error: 'Ya existe otro usuario con el mismo email' })
        }
        const resDetail = await userModel.create({
            name, age, email, role
        })
        const token = await tokenSign(resDetail);
        console.log('Se creo el usuario' + resDetail)
        res.send({ data: resDetail, token })
    } catch (e) {
        httpError(res, e)
    }
}


const updateItem = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, age, email } = req.cuerpo;

        const existingUser = await userModel.findOne({ email: email });

        if (existingUser && existingUser._id.toString() !== id) {
            return res.status(400).send('El email ya existe en el sistema');
        }
        const updatedUser = await userModel.findOneAndUpdate(
            { _id: id },
            { name, age, email },
            { new: true }
        );

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