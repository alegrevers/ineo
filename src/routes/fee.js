const express = require('express')
const FeeHandler = require('../handlers/fee-handler')
const verifyToken = require('../middleware/auth-middleware')
const feeHandler = new FeeHandler()
var router = express.Router()

router.get('/',
    /* #swagger.tags = ['Emolumentos']
       #swagger.description = 'Endpoint para encontrar todos os Emolumentos.' */
    feeHandler.findAll
)

router.get('/:id',
    /* #swagger.tags = ['Emolumentos']
       #swagger.description = 'Endpoint para encontrar um emolumento pelo id.' */
    [verifyToken],
    feeHandler.findById
)

router.post('/',
    // #swagger.tags = ['Emolumentos']
    // #swagger.description = 'Endpoint para inserir um emolumento.'

    /* #swagger.parameters['insertData'] = {
            in: 'body',
            description: 'Informações do emolumento.',
            required: true,
            schema: { $ref: "#/definitions/AddEmolumentos" }
    } */
    [verifyToken],
    feeHandler.insert
)

router.put('/:id',
    // #swagger.tags = ['Emolumentos']
    // #swagger.description = 'Endpoint para atualizar um emolumento.'

    /* #swagger.parameters['updateData'] = {
            in: 'body',
            description: 'Informações do emolumento.',
            schema: { $ref: "#/definitions/EditEmolumentos" }
    } */
    [verifyToken],
    feeHandler.update
)

router.delete('/:id',
    // #swagger.tags = ['Emolumentos']
    // #swagger.description = 'Endpoint para atualizar um emolumento.'
    [verifyToken],
    feeHandler.delete
)

module.exports = router
