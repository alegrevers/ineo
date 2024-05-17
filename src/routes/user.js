const express = require('express')
const UserHandler = require('../handlers/user-handler')
const userHandler = new UserHandler()
var router = express.Router()

router.get('/',
    /* #swagger.tags = ['Usuários']
       #swagger.description = 'Endpoint para encontrar todos os usuários.' */
    userHandler.findAll
)

router.get('/:id',
    /* #swagger.tags = ['Usuários']
       #swagger.description = 'Endpoint para encontrar um usuário pelo id.' */
    userHandler.findById
)

router.post('/',
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Endpoint para inserir um usuário.'

    /* #swagger.parameters['insertData'] = {
            in: 'body',
            description: 'Informações do usuário.',
            required: true,
            schema: { $ref: "#/definitions/AddUsuários" }
    } */
    userHandler.insert
)

router.put('/:id',
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Endpoint para atualizar um usuário.'

    /* #swagger.parameters['updateData'] = {
            in: 'body',
            description: 'Informações do usuário.',
            schema: { $ref: "#/definitions/EditUsuários" }
    } */
    userHandler.update
)

router.delete('/:id',
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Endpoint para atualizar um usuário.'

    userHandler.delete
)

module.exports = router
