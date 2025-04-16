const mongoose = require('mongoose');
const request = require('supertest');
const userService = require('../services/user.services')

const authService = require('../services/auth.service');
const app = require('../app');

// require('dotenv').config();

// Connecting to MongoDB before each test
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  .then(
    () => {console.log("Connection to MongoDB established for Jest")},
    err => { console.log("Failed to connect to MongoDB for Jest"), err}
  );
});

// Close connection to MongoDB
afterEach(async () => {
  await mongoose.connection.close();
})

describe("Requests for /api/users", () => {
  let token;

  beforeAll(() => {
    user = {
      username: "admin",
      email: "admin@aueb.gr",
      roles: ["EDITOR", "READER", "ADMIN"]
    };
    token = authService.generateAccessToken(user);
  });

  it("GET Returns all users", async () => {
    const res = await request(app)
    .get('/api/users')
    .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThan(0);
  }, 50000);

  it("POST creates a user", async () => {
    const res = await request(app)
    .post('/api/users')
    .set('Authorization', `Bearer ${token}`)
    .send({
      "username": "test5",
      "password": "12345",
      "name": "test5 name",
      "surname": "test5 surname",
      "email": "test5@aueb.gr",
      "address": {
        "area": "area1",
        "road": "road1"
      }
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
  }, 50000)

  it("POST creates a user that exists", async () => {
    const res = await request(app)
    .post('/api/users')
    .set('Authorization', `Bearer ${token}`)
    send({
      "username": "test5",
      "password": "12345",
      "name": "new name",
      "surname": "new surname",
      "email": "new@aueb.gr",
      "adress": {
        "area": "area1",
        "road": "road2"
      }
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.status).not.toBeTruthy();
  }, 50000);

  it("Post creates a user with same email", async () => {
    const res = await request(app)
    .post('/api/users')
    .set('Authorization', `Bearer ${token}`)
    .send({
      'username': "test6",
      "password": "12345",
      "name": "test6",
      "surname": "surname6",
      'email': "test5@aueb.gr",
      "address": {
        "road": "road1",
        "area": "area1"
      }
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.status).not.toBeTruthy();
  }, 50000);

  it('POST creates a user with empty name, surname, password', async () => {
    const res = await request(app)
    .post('/api/users')
    .set('Authorization', `Bearer ${token}`)
    .send({
      "username": "",
      "password": "",
      "name": "",
      "surname": "lalala",
      "email": "testempty@aueb.gr",
      "address": {
        "area": "area1",
        "road": "road2"
      }
    });

    expect(res.statusCode).toBe(400)
    expect(res.body.status).not.toBeTruthy();
  }, 50000)
});

describe("Requests for /api/users/:username", () => {
  let token;

  beforeAll(() => {
    user = {
      username: "admin",
      email: "admin@aueb.gr",
      roles: ["EDITOR", "READER", "ADMIN"]
    };
    token = authService.generateAccessToken(user);
  });

  it('GET returns specific user', async () => {

    const result = await userService.findLastInsertedUser();

    const res = await request(app)
    .get('/api/users/' + result.username)
    .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.data.username).toBe('user1');
    expect(res.data.email).toBe('user1@aueb.gr');
  })

  it('Update a user', async () => {
    const result = await userService.findLastInsertedUser();

    const res = await request(app)
    .patch('/api/users/' + result.username)
    .set('Authorization', `Bearer ${token}`)
    .send({
      username: result.username,
      name: "new updated name",
      surname: "new updated surname",
      email: "new@aueb.gr",
      address: {
        area: "area2",
        road: result.address.road
      }
    })

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
  })

  it('DELETE delete a user', async () => {
    const result = await userService.findLastInsertedUser();

    const res = await request(app)
    .delete('/api/users/' + result.username)
    .set('Authorization', `Bearer ${token}`)
    
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
  })
})