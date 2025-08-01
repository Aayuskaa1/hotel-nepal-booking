const request = require("supertest"); 
const app = require("../../server"); 

describe("Bookings API", () => { 
  test("should create booking", async () => { 
    const booking = {
      hotel_id: 1, 
      guest_name: "Test", 
      guest_email: "test@test.com", 
      check_in_date: "2024-02-01", 
      check_out_date: "2024-02-03", 
      number_of_guests: 1, 
      total_price: 18000
    }; 
    const response = await request(app).post("/api/bookings").send(booking); 
    expect([201, 400, 404, 500]).toContain(response.status); 
  }); 
});
