process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");

let firstItem = { name: "scone", price: "1.00" };

beforeEach(function () {
  items.push(firstItem);
});

afterEach(function () {
  items.length = 0;
});

describe("GET /items", function () {
  test("gets a list of items", async function () {
    const resp = await request(app).get("/items");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([firstItem]);
  });
});

describe("GET /items/:name", function () {
  test("gets an item by name", async function () {
    const resp = await request(app).get("/items/scone");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(firstItem);
  });
});

describe("POST /items", function () {
  test("creates an item", async function () {
    const resp = await request(app)
      .post("/items")
      .send({ name: "cake", price: "1.00" });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ added: { name: "cake", price: "1.00" } });
  });
});

describe("PATCH /items/:name", function () {
  test("updates an item", async function () {
    const resp = await request(app)
      .patch("/items/scone")
      .send({ name: "scone", price: "2.00" });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ updated: { name: "scone", price: "2.00" } });
  });
});

describe("DELETE /items/:name", function () {
  test("deletes an item", async function () {
    const resp = await request(app).delete("/items/scone");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "deleted" });
  });
});
