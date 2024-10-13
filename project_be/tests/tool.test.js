const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../API"); // Adjust the path to your app file
const { connectTestDB, closeTestDB } = require("./testConfig");
const Tool = require("../models/toolsModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

describe("Tool API", () => {
  let toolId;
  let userId;

  beforeAll(async () => {
    // Create a mock user
    const user = await User.create({
      firstName: "Test",
      lastName: "User",
      email: "testuser@example.com",
      streetName: "123 Test St",
      city: "Test City",
      postalCode: "12345",
      phone: "555-5555",
      password: await bcrypt.hash("Password123!", 10),
    });
    userId = user._id;

    // Create a mock tool
    const tool = new Tool({
      name: "Hammer",
      description: "A sturdy hammer",
      details: "Heavy-duty hammer",
      available: true,
      owner: userId,
      imageUrl: "/toolsImages/hammer.jpg",
    });
    await tool.save();
    toolId = tool._id;
  });

  describe("GET /api/tools", () => {
    it("should get all tools", async () => {
      const res = await request(app).get("/api/tools");
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe("POST /api/tools", () => {
    it("should create a new tool", async () => {
      const tool = {
        name: "Screwdriver",
        description: "A flat-head screwdriver",
        details: "Simple screwdriver",
        available: true,
        owner: userId.toString(),
        imageUrl: "/toolsImages/screwdriver.jpg",
      };
      const res = await request(app).post("/api/tools").send(tool);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("name", tool.name);
      toolId = res.body._id;
    });
  });

  describe("GET /api/tools/:toolId", () => {
    it("should get a tool by ID", async () => {
      const res = await request(app).get(`/api/tools/${toolId}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id", toolId.toString());
    });
  });

  describe("PATCH /api/tools/:toolId", () => {
    it("should update a tool by ID", async () => {
      const res = await request(app)
        .patch(`/api/tools/${toolId}`)
        .send({ name: "Updated Hammer" });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", "Updated Hammer");
    });
  });

  describe("PATCH /api/tools/:toolId/availability", () => {
    it("should update tool availability", async () => {
      const res = await request(app)
        .patch(`/api/tools/${toolId}/availability`)
        .send({ available: false });
      expect(res.status).toBe(200);
      expect(res.body.tool).toHaveProperty("available", false);
    });
  });

  describe("DELETE /api/tools/:toolId", () => {
    it("should delete a tool by ID", async () => {
      const res = await request(app).delete(`/api/tools/${toolId}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Tool deleted successfully");
    });
  });
});
