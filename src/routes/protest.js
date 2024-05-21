const express = require('express')
const ProtestHandler = require('../handlers/protest-handler')
const verifyToken = require('../middleware/auth-middleware')
const protestHandler = new ProtestHandler()
var router = express.Router()

router.get('/',
    /* #swagger.tags = ['Protestos']
       #swagger.description = 'Endpoint para encontrar todos os Protestos.' */
    protestHandler.findAll
)

router.get('/:id',
    /* #swagger.tags = ['Protestos']
       #swagger.description = 'Endpoint para encontrar um protesto pelo id.' */
    [verifyToken],
    protestHandler.findById
)

router.post('/',
    // #swagger.tags = ['Protestos']
    // #swagger.description = 'Endpoint para inserir um protesto.'

    /* #swagger.parameters['insertData'] = {
            in: 'body',
            description: 'Informações do protesto.',
            required: true,
            schema: { $ref: "#/definitions/AddProtests" }
    } */
    [verifyToken],
    protestHandler.insert.bind(protestHandler)
)

router.put('/:id',
    // #swagger.tags = ['Protestos']
    // #swagger.description = 'Endpoint para atualizar um protesto.'

    /* #swagger.parameters['updateData'] = {
            in: 'body',
            description: 'Informações do protesto.',
            schema: { $ref: "#/definitions/EditProtest" }
    } */
    [verifyToken],
    protestHandler.update.bind(protestHandler)
)

router.delete('/:id',
    // #swagger.tags = ['Protestos']
    // #swagger.description = 'Endpoint para atualizar um protesto.'
    [verifyToken],
    protestHandler.delete.bind(protestHandler)
)

module.exports = router
