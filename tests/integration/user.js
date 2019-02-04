const { app } = require('../../index')
const { dbDriver } = require('../../db/index')
const { UserModel } = require('../../db/userModel')
const supertest = require('supertest')
const { expect } = require('chai')

global.baseTestURL = 'localhost:3000'

describe('/user', () => {
  let testUser = {
    email: 'test@strv.com',
    password: 'testpassword'
  }
  let accessToken = ''
  let badToken = 'badToken'

  describe('/user/signup', () => {
    it('201 for valid credentials.', async () => {
      return supertest(global.baseTestURL)
        .put('/user/signup')
        .set('Content-Type', 'application/json')
        .send(testUser)
        .expect(201)
    })

    it('422 for short password', async () => {
      return supertest(global.baseTestURL)
        .put('/user/signup')
        .set('Content-Type', 'application/json')
        .send({
          email: 'test@strv.com',
          password: 'short'
        })
        .expect(422)
    })

    it('422 for errors in number or type of fields', async () => {
      return supertest(global.baseTestURL)
        .put('/user/signup')
        .set('Content-Type', 'application/json')
        .send({
          name: 'Bob'
        })
        .expect(422)
    })

    it('409 for already registered user', async () => {
      return supertest(global.baseTestURL)
        .put('/user/signup')
        .set('Content-Type', 'application/json')
        .send(testUser)
        .expect(409)
    })
  })

  describe('/user/login', () => {
    it('200 for valid credentials.', async () => {
      return supertest(global.baseTestURL)
        .put('/user/login')
        .set('Content-Type', 'application/json')
        .send(testUser)
        .expect(200)
        .then((res) => {
          expect(res.body).to.have.property('payload').and.to.be.a('string')
          accessToken = res.body.payload;
        })
    })

    it('401 for invalid password', async () => {
      return supertest(global.baseTestURL)
        .put('/user/login')
        .set('Content-Type', 'application/json')
        .send({
          email: 'test@strv.com',
          password: 'wrongpassword'
        })
        .expect(401)
    })

    it('422 for errors in number or type of fields', async () => {
      return supertest(global.baseTestURL)
        .put('/user/login')
        .set('Content-Type', 'application/json')
        .send({
          name: 'Bob',
          password: 123
        })
        .expect(422)
    })

    it('401 for unregistered user', async () => {
      return supertest(global.baseTestURL)
        .put('/user/login')
        .set('Content-Type', 'application/json')
        .send({
          email: 'test@stranger.com',
          password: 'teastpassword'
        })
        .expect(401)
    })
  })

  describe('/user/addContact', () => {
    it('201 for valid credentials.', async () => {
      return supertest(global.baseTestURL)
        .put('/user/addContact')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Georgy Muratov',
          email: 'georgy@strv.com',
          phone: '777-777-777'
        })
        .expect(201)
    })

    it('401 for invalid password', async () => {
      return supertest(global.baseTestURL)
        .put('/user/addContact')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${badToken}`)
        .expect(401)
    })

    it('422 for errors in number or type of fields', async () => {
      return supertest(global.baseTestURL)
        .put('/user/addContact')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Bob',
          password: 123
        })
        .expect(422)
    })
  })

  after(() => {
    dbDriver.deleteInstance({model: UserModel, email: testUser.email})
    process.kill(process.pid, 'SIGINT')
  })
})
