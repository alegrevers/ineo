const express = require('express')
const UserHandler = require('../handlers/user-handler')
const verifyToken = require('../middleware/auth-middleware')
const userHandler = new UserHandler()
var router = express.Router()

router.post('/login',
    /* #swagger.tags = ['Usuários']
       #swagger.description = 'Endpoint para autenticar um usuário.' */

    /* #swagger.parameters['insertData'] = {
        in: 'body',
        description: 'Informações de login.',
    } */
    userHandler.login
)

router.get('/',
    /* #swagger.tags = ['Usuários']
       #swagger.description = 'Endpoint para encontrar todos os usuários.' */
    userHandler.findAll
)

router.get('/:id',
    /* #swagger.tags = ['Usuários']
       #swagger.description = 'Endpoint para encontrar um usuário pelo id.' */
    [verifyToken],
    userHandler.findById
)

router.post('/',
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Endpoint para inserir um usuário.'

    /* #swagger.parameters['insertData'] = {
            in: 'body',
            description: 'Informações do usuário.',
            required: true,
            schema: { $ref: "#/definitions/AddUsers" }
    } */
    userHandler.insert
)

router.put('/:id',
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Endpoint para atualizar um usuário.'

    /* #swagger.parameters['updateData'] = {
            in: 'body',
            description: 'Informações do usuário.',
            schema: { $ref: "#/definitions/EditUser" }
    } */
    [verifyToken],
    userHandler.update
)

router.delete('/:id',
    // #swagger.tags = ['Usuários']
    // #swagger.description = 'Endpoint para atualizar um usuário.'
    [verifyToken],
    userHandler.delete
)

module.exports = router
