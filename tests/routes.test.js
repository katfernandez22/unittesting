const request = require('supertest')
const app = require('../app.js')
const mongoose = require('mongoose')
const dbName = 'whishlistTestDb'
const User = require('../models/user')
const faker = require('faker')

describe("User API", () => {
    it("should show all users", async(done) => {
        const res =  await request(app).get("/api/users")
        expect(res.statusCode).toEqual(200)
        expect(res.body[0]).toHaveProperty('_id')
    })
})

beforeAll(async() => {
    const MONGODB_URI = `mongodb://127.0.0.1/${dbName}`
    await mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })

    const users = [...Array(40)].map(user => (
        {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            items: [
                {
                    title: faker.lorem.sentence(),
                    link: faker.internet.url()
                },
                {
                    title: faker.lorem.sentence(),
                    link: faker.internet.url()
                },
                {
                    title: faker.lorem.sentence(),
                    link: faker.internet.url()
                },
                {
                    title: faker.lorem.sentence(),
                    link: faker.internet.url()
                },
            ]
        }
    ))

    await User.insertMany(users)
    console.log("users created")
}

)