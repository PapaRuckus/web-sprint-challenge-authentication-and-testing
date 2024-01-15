const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");

const Person = { username: "Captain Marvel", password: "foobar" };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});

describe("[POST] /login", () => {
  test("successful login with 200 ok", async () => {
    const res = await request(server).post("/api/auth/login").send(Person);
    expect(res.status).toBe(200);
  });
  test("responds with message and token", async () => {
    const res = await request(server).post("/api/auth/login").send(Person);
    expect(res.body).toHaveProperty(
      "message",
      "Welcome back Captain Marvel..."
    );
    expect(res.body).toHaveProperty("token");
  });
});

// use mod4 guided for ref
// write two tests for login, register and jokes
// login test for 200// and token?
// register test for 201/ and match object
// jokes test for 200/ and have length
