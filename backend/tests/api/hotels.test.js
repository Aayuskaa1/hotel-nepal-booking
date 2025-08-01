const request = require("supertest"); 
const app = require("../../server"); describe("Hotels API", () => { test("should return all hotels", async () => { const response = await request(app).get("/api/hotels").expect(200); expect(Array.isArray(response.body)).toBe(true); }); });
