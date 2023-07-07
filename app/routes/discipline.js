const express = require('express')
const router = express.Router()
const checkOrigin = require('../middleware/origin')
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const { getItems, getItem, createItem, deleteItem, updateItem } = require('../controllers/discipline')
const { validateCreate } = require('../validators/users')

router.get('/listar', getItems)

router.get('/:id', checkOrigin, checkRoleAuth('admin'),getItem)

//TODO: Donde recibimos data http://localhost:8080/api/users/
router.post('/create', createItem)

router.patch('/:id',checkRoleAuth('admin','user'), updateItem)

router.delete('/:id',checkRoleAuth('admin'), deleteItem)
module.exports = router