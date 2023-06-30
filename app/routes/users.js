const express = require('express')
const router = express.Router()
const checkOrigin = require('../middleware/origin')
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const { getItems, getItem, createItem, deleteItem, updateItem } = require('../controllers/users')
const { validateCreate } = require('../validators/users')

router.get('/', checkAuth, checkRoleAuth(['admin','user']), getItems)

router.get('/:id', checkOrigin, getItem, checkRoleAuth(['admin']))

//TODO: Donde recibimos data http://localhost:8080/api/users/
router.post('/', checkOrigin, validateCreate, createItem)

router.patch('/:id', updateItem,checkRoleAuth(['admin','user']))

router.delete('/:id', deleteItem, checkRoleAuth(['admin']))


module.exports = router