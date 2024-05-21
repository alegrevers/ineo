const SequelizeMock = require("sequelize-mock")
const request = require('supertest')
const app = require('../app')
let userId
let token
const testData = {
    name: 'ford',
    email: 'fiesta',
    password: 'password'
}

describe('Handler Test', () => {
    let sequelizeMock
    let User
    let Protest
    let Fee

    beforeAll(async () => {
        // sequelizeMock = new SequelizeMock()
        // User = sequelizeMock.define("User", {id: 1, name: "abc", email:"email@email.com"})
        // User.prototype.create = jest.fn().mockResolvedValue({id: 1, name: "abc", email:"email@email.com"})
        const testUser = await request(app).post('/api/user').send(testData)
        const userData = JSON.parse(testUser.res.text)

        userId = userData.id
    })

    beforeEach(async () => {
        const tokenRequest = await request(app).post('/api/user/login').send(testData)
        const tokenData = JSON.parse(tokenRequest.res.text)
        token = tokenData.accessToken
    })

    afterEach(async () => {
        await request(app).delete(`/api/user/${userId}`).set({ authorization: token })
    })

    test('Get All user', async () =>{
        const res = await request(app).get('/api/user')
            .expect(200)
        expect(res.body.length >= 1).toBe(true)
    })

    test('Get user by Id', async () =>{
        const res = await request(app).get(`/api/user/${userId}`)
            .set({ authorization: token })
            .expect(200)
        expect(res.body).toEqual({ id: userId, ...testData})
    })

    test('Shouldn\'t Get user by Id by not found', async () =>{
        const res = await request(app).get(`/api/user/${new ObjectId()}`)

        expect(res.status).toEqual(new IdNotFoundError().statusCode)
        expect(JSON.parse(res.error.text).error).toEqual(new IdNotFoundError().message)
    })

    test('Insert new user', async () =>{
        const insertData = {
            maker: 'chevrolet',
            model: 'cruze',
            year: 2018,
            color: 'grey'
        }
        const res = await request(app).post('/api/user')
            .send(insertData)
            .expect(200)

        const newId = res.body.id
        expect(res.body).toEqual({ id: newId, ...insertData})
    })

    test('Shouldn\'t Insert new user by model missing', async () =>{
        const insertData = {
            maker: 'chevrolet',
            year: 2018,
            color: 'grey'
        }
        const res = await request(app).post('/api/user')
            .send(insertData)
            .expect(400)

        expect(res.status).toEqual(new ModelMissingError().statusCode)
        expect(JSON.parse(res.error.text).error).toEqual(new ModelMissingError().message)
    })

    test('Update a user', async () =>{
        const updateData = {
            maker: 'chevrolet',
        }

        await request(app).put(`/api/user/${userId}`)
            .send(updateData)
            .expect(200)

        const updatedData = await request(app).get(`/api/user/${userId}`)
            .expect(200)

        expect(updatedData.body.maker).toEqual(updateData.maker)
    })

    test('Shouldn\'t Update new user by id not found', async () =>{
        const updateData = {
            maker: 'chevrolet',
        }
        const res = await request(app).put(`/api/user/${new ObjectId()}`)
            .send(updateData)
            .expect(404)

            expect(res.status).toEqual(new IdNotFoundError().statusCode)
            expect(JSON.parse(res.error.text).error).toEqual(new IdNotFoundError().message)
    })

    test('Delete a user', async () =>{
        const insertData = {
            maker: 'chevrolet',
            model: 'cruze',
            year: 2018,
            color: 'grey'
        }
        const insertedData = await request(app).post('/api/user')
            .send(insertData)
            .expect(200)

        const newId = insertedData.body.id

        await request(app).delete(`/api/user/${newId}`)
            .expect(200)

        const fetchData = await request(app).get('/api/user')
            .expect(200)

        const deletedData = await request(app).get(`/api/user/${newId}`)
            .expect(404)

        expect(fetchData.body).toHaveLength(2)
        expect(deletedData.status).toEqual(new IdNotFoundError().statusCode)
        expect(JSON.parse(deletedData.error.text).error).toEqual(new IdNotFoundError().message)
    })

    test('Shouldn\'t Delete new user by id not found', async () =>{
        const res = await request(app).delete(`/api/user/${new ObjectId()}`)
            .expect(404)

        expect(res.status).toEqual(new IdNotFoundError().statusCode)
        expect(JSON.parse(res.error.text).error).toEqual(new IdNotFoundError().message)
    })
})