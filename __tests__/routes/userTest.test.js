const request = require('supertest');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require('../../src/db');
const app = require('../../src/app');
const userData = require('../../src/data/userData');

describe('Users', () => {
  let connection;
  let db;

  beforeAll(async () => {
    const dbParams = global.__MONGO_URI__.split('/');
    const dbName = dbParams[dbParams.length - 1];
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true
    });
    db = await connection.db(dbName);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await connection.close();
    await db.close();
  });

  beforeEach(async () => {
    await db.dropDatabase();
  });

  describe('creation of users using /register', () => {
    it('/register should create a user ', async () => {
      const users = db.collection('users');
      const mock = userData[0];

      const response = await request(app)
        .post('/users/register')
        .send(mock);

      const foundData = await users.findOne({ email: 'johnwee35@gmail.com' });
      expect(foundData.email).toEqual(mock.email);
      expect(response.status).toBe(201);
    });

    it('/register should handle email validation ', async () => {
      const users = db.collection('users');
      const mock = {
        email: 'rubbish',
        password: '12345678',
        name: 'john'
      };

      const response = await request(app)
        .post('/users/register')
        .send(mock);

      expect(response.text).toEqual(
        expect.stringMatching(/\"email\" must be a valid email/)
      );
      expect(response.status).toBe(400);
    });

    it('/register should handle password validation', async () => {
      const users = db.collection('users');
      const mock = {
        email: 'name@gmail.com',
        password: '1234',
        name: 'john'
      };
      const response = await request(app)
        .post('/users/register')
        .send(mock);

      expect(response.text).toEqual(
        expect.stringMatching(
          /\"password\" length must be at least 8 characters long/
        )
      );
      expect(response.status).toBe(400);
    });

    it('should check for email that are already used', async () => {
      const users = db.collection('users');
      const mock = userData[0];
      users.insertOne(mock);
      const newMock = {
        email: 'johnwee35@gmail.com',
        password: 'doesnotmatter',
        name: 'john'
      };
      const response = await request(app)
        .post('/users/register')
        .send(newMock);

      expect(response.text).toEqual(
        expect.stringMatching(/This Email Already Exist/)
      );
      expect(response.status).toEqual(400);
    });

    it.only('should be able to authenticate login', async () => {
      const users = db.collection('users');
      const mockData = {
        email: 'johnwee35@gmail.com',
        name: 'john',
        password: '12345678'
      };
      const mockAuth = {
        email: 'johnwee35@gmail.com',
        password: '12345678'
      };
      await request(app)
        .post('/users/register')
        .send(mockData);

      const response = await request(app)
        .post('/users/login')
        .send(mockAuth)
        .set('Content-Type', 'application/json');
      expect(response.status).toBe(200);
    });
  });
});
