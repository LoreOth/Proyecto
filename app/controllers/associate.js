const { httpError } = require('../helpers/handleError')
const associateModel = require('../models/associate')
const jwt = require('jsonwebtoken');
const { tokenSign } = require('../helpers/generateToken');
const crypto = require('crypto');


const getItems = async (req, res) => {
    try {
        const listAll = await associateModel.find({})
        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}

const getBySurname = async (req, res) => {
    try {
        const surname = req.params.surname
        const listAll = await associateModel.find({ surname: surname })
        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}

const getItem = async (req, res) => {
    try {
        const id = await associateModel.findById(req.params.email);
        res.send({ id: id });
    } catch (e) {
        httpError(res, e);
    }
}

const createItem = async (req, res) => {
    try {
        const { name, age, email, address, phone, surname, gender, isTeacher } = req.body
        const existingUser = await associateModel.findOne({ email }) // Busca si hay otro usuario con el mismo email
        if (existingUser) { // Si se encuentra otro usuario con el mismo email
            return res.status(400).send({ error: 'Ya existe otro usuario con el mismo email' })
        }
        const password = generateRandomSequence();
        const resDetail = await associateModel.create({
            name, age, email, password , address, phone, surname,gender,isTeacher
        })
        const token = await tokenSign(resDetail);
        console.log('Se creo el usuario' + resDetail)
        res.send({ data: resDetail, token })
    } catch (e) {
        httpError(res, e)
    }
}



const generateRandomSequence = () => {
  const length = 10;
  const buffer = crypto.randomBytes(length);
  const sequence = buffer.toString('hex').slice(0, length);

  return sequence;
};


const updateItem = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, age, email } = req.cuerpo;

        const existingUser = await associateModel.findOne({ email: email });

        if (existingUser && existingUser._id.toString() !== id) {
            return res.status(400).send('El email ya existe en el sistema');
        }
        const updatedUser = await associateModel.findOneAndUpdate(
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
        const deletedUser = await associateModel.deleteOne({ _id: id });
        res.send({ id: id, deletedUser: deletedUser });
    } catch (e) {
        httpError(res, e);
    }
}


module.exports = { getItem, getItems, deleteItem, createItem, updateItem,getBySurname }