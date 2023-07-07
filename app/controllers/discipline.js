const { httpError } = require('../helpers/handleError')
const disciplineModel = require('../models/discipline')
const { tokenSign } = require('../helpers/generateToken');


const getItems = async (req, res) => {
    try {
        const listAll = await disciplineModel.find({})
        res.send( { data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}

const getItem = async (req, res) => {
    try {
        const id = await disciplineModel.findById(req.params.id);
        res.send({ id: id });
    } catch (e) {
        httpError(res, e);
    }
}

const createItem = async (req, res) => {
    try {
        const { name, description, days, hour, teacher } = req.body
        const existingDiscipline = await disciplineModel.findOne({ name }) // Busca si hay otro usuario con el mismo email
        if (existingDiscipline) { // Si se encuentra otro usuario con el mismo email
            return res.status(400).send({ error: 'Ya existe la disciplina' })
        }
        const resDetail = await disciplineModel.create({
            name, description, days, hour, teacher
        })
        console.log('Se creo la disciplina' + resDetail)
        res.send({ data: resDetail })
    } catch (e) {
        httpError(res, e)
    }
}





const updateItem = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, age, email } = req.cuerpo;

        const existingDiscipline = await disciplineModel.findOne({ email: email });

        if (existingDiscipline) {
            const updatedDiscipline = await disciplineModel.findOneAndUpdate(
                { _id: id },
                { name, age, email },
                { new: true }
            );
            res.send({ id: id, updatedDiscipline: updatedDiscipline });
        }
    } catch (e) {
        httpError(res, e);
    }
}


const deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedDiscipline = await disciplineModel.deleteOne({ _id: id });
        res.send({ id: id, deletedDiscipline: deletedDiscipline });
    } catch (e) {
        httpError(res, e);
    }
}


module.exports = { getItem, getItems, deleteItem, createItem, updateItem }