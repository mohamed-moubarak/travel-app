const request = require("supertest");
const app = require('./../server/server');

describe("Test the server can be reached", () => {
    test("It should response the GET method", () => {
      return request(app)
        .get("/testserver")
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
  });