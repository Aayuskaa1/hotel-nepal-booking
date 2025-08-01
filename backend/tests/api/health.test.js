const request = require("supertest");
const app = require("../../server");

describe("Health API", () => {
  test("should return health status", async () => {
    const response = await request(app).get("/api/health").expect(200);
    expect(response.body.status).toBe("OK");
    expect(response.body.message).toBe("Hotel Nepal API is running");
  });
});
