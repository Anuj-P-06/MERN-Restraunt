import request from "supertest";
import app from "../index.js";

describe("Health Check", () => {
  it("should return server running message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});
