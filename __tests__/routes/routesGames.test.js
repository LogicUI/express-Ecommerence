const request = require('supertest');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require('../../src/db');
const app = require('../../src/app');
const gameData = require('../../src/data/games');

const getGameData = () => {
  return gameData.map((data) => {
    return { ...data };
  });
};

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

  describe('games', () => {
    it('should be able to get all routes ', async () => {
      const collection = db.collection('games');
      await collection.insertMany(getGameData());
      const response = await request(app).get('/games');
      expect(response.body).toMatchObject(gameData);
    });

    it('should be able to update multiple games item', async () => {
      const collection = db.collection('games');
      await collection.insertMany(getGameData());

      const itemsToUpdate = [
        {
          title: 'Gears Of War',
          quantity: 3
        },
        {
          title: 'Crackdown 3',
          quantity: 2
        }
      ];
      for (let item of itemsToUpdate) {
        const response = await request(app)
          .put('/games/update')
          .send(item)
          .set('Content-Type', 'application/json');

        expect(response.status).toBe(200);
      }
    });
  });
});
