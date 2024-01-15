const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");
const bcrypt = require("bcryptjs");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});

describe("[POST] /login", () => {
  const Person = { username: "Captain Marvel", password: "foobar" };
  test("successful login with 200 ok", async () => {
    const res = await request(server).post("/api/auth/login").send(Person);
    expect(res.status).toBe(200);
    token = res.body.token;
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

describe("[POST] /register", () => {
  const newUser = { username: "dougy", password: "testpassword" };

  test("adds a user to the database", async () => {
    await request(server).post("/api/auth/register").send(newUser);
    const users = await db("users");
    expect(users).toHaveLength(2);
  });

  test("responds with the new user and matches hashed password", async () => {
    const { body } = await request(server)
      .post("/api/auth/register")
      .send({
        ...newUser,
        password: bcrypt.hashSync(newUser.password, 8),
      });

    const userInDatabase = await db("users")
      .where({ username: newUser.username })
      .first();

    expect(body).toMatchObject({
      username: newUser.username,
      password: userInDatabase.password,
    });
  });
});

describe("[GET] /jokes", () => {
  test("responds with 200 ok", async () => {
    const res = await request(server)
      .get("/api/jokes")
      .set("Authorization", `${token}`);

    expect(res.status).toBe(200);
  });
   test("checks for the jokes", async () => {
     const res = await request(server)
       .get("/api/jokes")
       .set("Authorization", `${token}`);

     const jokesArray = res.body
     expect(jokesArray).toHaveLength(3);
   });
});

// use mod4 guided for ref
// write two tests for login, register and jokes
// login test for 200// and token?
// register test for 201/ and match object
// jokes test for 200/ and have length
