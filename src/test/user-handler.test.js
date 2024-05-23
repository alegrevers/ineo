const request = require('supertest')
const database = require('../utils/database-utils');
const app = require('../app');
const UserNotFoundError = require('../errors/user-not-found-error');
const EmailMissingError = require('../errors/email-missing-error');
database.sync()

const fakeUserId = 'e3c81a61-b4d9-45a2-99bb-8255959fa10c'
let userId
let token
const testData = {
    name: 'ford',
    email: 'fiesta',
    password: 'password'
}

describe('Handler Test', () => {
    beforeAll(async () => {
        const testUser = await request(app).post('/api/user').send(testData)
        const userData = JSON.parse(testUser.res.text)
        userId = userData.id

        const tokenRequest = await request(app).post('/api/user/login').send(testData)
        const tokenData = JSON.parse(tokenRequest.res.text)
        token = `Bearer ${tokenData.accessToken}`

    })

    afterAll(async () => {
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
        expect(res.body).toEqual({ id: userId, name: testData.name, email: testData.email })
    })

    test('Shouldn\'t Get user by Id by user not found', async () =>{
        const res = await request(app).get(`/api/user/${fakeUserId}`).set({ authorization: token })

        expect(res.status).toEqual(new UserNotFoundError().statusCode)
        expect(JSON.parse(res.error.text).error).toEqual(new UserNotFoundError().message)
    })

    test('Insert new user', async () =>{
        const insertData = {
            name: 'roberto@gmail.com',
            email: 'Roberto',
            password: 'grey'
        }
        const res = await request(app).post('/api/user')
            .send(insertData)
            .expect(200)

        const newId = res.body.id
        expect(res.body).toEqual({ id: newId, name: insertData.name, email: insertData.email })
        await request(app).delete(`/api/user/${newId}`).set({ authorization: token })
    })

    test('Shouldn\'t Insert new user by email missing', async () =>{
        const insertData = {
            name: 'Roberto',
            password: 'grey'
        }
        const res = await request(app).post('/api/user')
            .send(insertData)
            .expect(400)

        expect(res.status).toEqual(new EmailMissingError().statusCode)
        expect(JSON.parse(res.error.text).error).toEqual(new EmailMissingError().message)
    })

    test('Update a user', async () =>{
        const updateData = {
            email: 'carlitos@gmail.com',
        }

        await request(app).put(`/api/user/${userId}`)
            .send(updateData)
            .set({ authorization: token })
            .expect(200)

        const updatedData = await request(app).get(`/api/user/${userId}`)
            .set({ authorization: token })
            .expect(200)

        expect(updatedData.body.maker).toEqual(updateData.maker)
    })

    test('Shouldn\'t Update new user by id not found', async () =>{
        const updateData = {
            email: 'chevrolet',
        }
        const res = await request(app).put(`/api/user/${fakeUserId}`)
            .send(updateData)
            .set({ authorization: token })
            .expect(404)

            expect(res.status).toEqual(new UserNotFoundError().statusCode)
            expect(JSON.parse(res.error.text).error).toEqual(new UserNotFoundError().message)
    })

    test('Delete a user', async () =>{
        const insertData = {
            name: 'chevrolet',
            email: 'cruze',
            password: 'grey'
        }
        const insertedData = await request(app).post('/api/user')
            .send(insertData)
            .set({ authorization: token })
            .expect(200)

        const newId = insertedData.body.id

        await request(app).delete(`/api/user/${newId}`)
            .set({ authorization: token })
            .expect(200)

        const fetchData = await request(app).get('/api/user')
            .expect(200)

        const deletedData = await request(app).get(`/api/user/${newId}`)
            .set({ authorization: token })
            .expect(404)

        expect(fetchData.body).toHaveLength(1)
        expect(deletedData.status).toEqual(new UserNotFoundError().statusCode)
        expect(JSON.parse(deletedData.error.text).error).toEqual(new UserNotFoundError().message)
    })

    test('Shouldn\'t Delete new user by id not found', async () =>{
        const res = await request(app).delete(`/api/user/${fakeUserId}`)
            .set({ authorization: token })
            .expect(404)

        expect(res.status).toEqual(new UserNotFoundError().statusCode)
        expect(JSON.parse(res.error.text).error).toEqual(new UserNotFoundError().message)
    })
})