const { validateRegistration } = require("../../middleware/validation"); describe("Validation", () => { test("should validate registration", () => { const mockReq = {body: {name: "Test", email: "test@test.com", password: "Test123"}}; const mockRes = {status: jest.fn().mockReturnThis(), json: jest.fn()}; const mockNext = jest.fn(); validateRegistration(mockReq, mockRes, mockNext); expect(mockNext).toHaveBeenCalled(); }); });
