const request = require('supertest');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require('../../src/db');
const app = require('../../src/app');
const consoleData = require('../../src/data/console');

const getData = () =>
  consoleData.map((data) => {
    return { ...data };
  });

describe('routes', () => {
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

  describe('console', () => {
    it('should be able to get all routes ', async () => {
      const collection = db.collection('consoles');
      await collection.insertMany(getData());
      const response = await request(app).get('/consoles');
      expect(response.body).toMatchObject(consoleData);
    });

    it('should be able to find one and update', async () => {
      const collection = db.collection('consoles');
      await collection.insertMany(getData());
      const updatedFields = {
        title: 'Switch',
        quantity: 2
      };

      await request(app)
        .put('/consoles/update')
        .send(updatedFields)
        .set('Content-Type', 'application/json');

      const updated = await collection.findOne({ title: 'Switch' });
      expect(updated.quantity).toBe(48);
    });

    it('should be able to update mutiple console items', async () => {
      const collection = db.collection('consoles');
      await collection.insertMany(getData());

      const itemsToUpdate = [
        {
          title: 'Switch',
          quantity: 2
        },
        {
          title: 'Xbox One',
          quantity: 3
        }
      ];

      for (let item of itemsToUpdate) {
        const response = await request(app)
          .put('/consoles/update')
          .send(item)
          .set('Content-Type', 'application/json');

        expect(response.status).toBe(200);
      }
    });
  });
});
