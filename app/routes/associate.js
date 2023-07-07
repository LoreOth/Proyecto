const express = require('express')
const router = express.Router()
const checkOrigin = require('../middleware/origin')
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const { getItems, getItem, createItem, deleteItem, updateItem, getBySurname } = require('../controllers/associate')
const { validateCreate } = require('../validators/users')

router.get('/listar', getItems)

router.get('/getBySurname/:surname', getBySurname)

router.get('/:id',getItem)

//TODO: Donde recibimos data http://localhost:8080/api/associate/create
router.post('/create', createItem)

router.patch('/:id',checkRoleAuth('admin','user'), updateItem)

router.delete('/:id',checkRoleAuth('admin'), deleteItem)
module.exports = router