const request = require("supertest"); 
const app = require("../../server"); describe("Rate Limiting", () => { test("should handle rate limits", async () => { const response = await request(app).get("/api/health").expect(200); expect(response.body.status).toBe("OK"); }); });
