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

  beforeEach(async () => {
    // Clear the tools collection before each test
    await Tool.deleteMany({});
  });

  describe("GET /tools", () => {
    it("should get all tools", async () => {
      const res = await request(app).get("/api/tools");
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe("POST /tools", () => {
    it("should create a new tool", async () => {
      const tool = {
        name: "Hammer",
        description: "A useful tool",
        details: "Heavy-duty hammer",
        available: true,
        owner: "60d5ec49f1e4e2a5d8b5b5b5", // Replace with a valid user ID
        imageUrl: "/toolsImages/hammer.jpg",
      };
      const res = await request(app).post("/api/tools").send(tool);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("name", tool.name);
      toolId = res.body._id;
    });
  });

  describe("GET /tools/user-tools", () => {
    let user;

    beforeAll(async () => {
      // Create a mock user
      user = await User.create({
        firstName: "Test",
        lastName: "User",
        email: "testuser@example.com",
        streetName: "123 Test St", // Make sure this line is present
        city: "Test City",
        postalCode: "12345",
        phone: "555-5555",
        password: await bcrypt.hash("Password123!", 10),
      });

      // Create mock tools and assign them to the user
      const tool1 = await Tool.create({
        name: "Hammer",
        description: "A sturdy hammer",
        details: "Heavy-duty hammer",
        available: true,
        owner: user._id,
        imageUrl: "/toolsImages/hammer.jpg",
      });

      const tool2 = await Tool.create({
        name: "Screwdriver",
        description: "A flat-head screwdriver",
        details: "A simple screwdriver",
        available: false,
        owner: user._id,
        imageUrl: "/toolsImages/screwdriver.jpg",
      });

      // Add tools to user's shared tools
      user.sharedTools.push(tool1._id, tool2._id);
      await user.save();
    });

    it("should get tools for a user", async () => {
      console.log("User ID:", user._id);
      const res = await request(app)
        .get("/api/tools/user-tools")
        .query({ userId: user._id.toString() }); // Pass the userId as a query param

      if (res.status !== 200) {
        console.error("Error response:", res.body);
      }

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("availableTools");
      expect(res.body).toHaveProperty("borrowedTools");
      expect(res.body.availableTools).toBeInstanceOf(Array);
      expect(res.body.borrowedTools).toBeInstanceOf(Array);
    });
  });

  describe("PATCH /tools/:toolId/availability", () => {
    it("should update tool availability", async () => {
      // Create a mock user
      const user = new User({
        firstName: "Test",
        lastName: "User",
        email: "testuser@example.com",
        confirmEmail: "testuser@example.com",
        streetName: "123 Test St",
        city: "Testville",
        postalCode: "12345",
        phone: "123-456-7890",
        password: await bcrypt.hash("password123", 10), // Ensure the password is hashed
        imageUrl: "/userImages/testuser.jpg",
      });
      await user.save();

      // Create a tool with the user as the owner
      const tool = new Tool({
        name: "Hammer",
        description: "A useful tool",
        details: "Heavy-duty hammer",
        available: true,
        owner: user._id, // Use the created user's ID
        imageUrl: "/toolsImages/hammer.jpg",
      });
      await tool.save();

      // Update tool availability
      const res = await request(app)
        .patch(`/api/tools/${tool._id}/availability`)
        .send({ available: false });

      // Assertions
      expect(res.status).toBe(200);
      expect(res.body.tool).toHaveProperty("available", false);
    });
  });

  describe("GET /tools/:toolId", () => {
    it("should get a tool by ID", async () => {
      const tool = new Tool({
        name: "Hammer",
        description: "A useful tool",
        details: "Heavy-duty hammer",
        available: true,
        owner: "60d5ec49f1e4e2a5d8b5b5b5", // Replace with a valid user ID
        imageUrl: "/toolsImages/hammer.jpg",
      });
      await tool.save();
      const res = await request(app).get(`/api/tools/${tool._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id", tool._id.toString());
    });
  });

  describe("PATCH /tools/:toolId", () => {
    it("should update a tool by ID", async () => {
      const tool = new Tool({
        name: "Hammer",
        description: "A useful tool",
        details: "Heavy-duty hammer",
        available: true,
        owner: "60d5ec49f1e4e2a5d8b5b5b5", // Replace with a valid user ID
        imageUrl: "/toolsImages/hammer.jpg",
      });
      await tool.save();
      const res = await request(app)
        .patch(`/api/tools/${tool._id}`)
        .send({ name: "Updated Hammer" });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", "Updated Hammer");
    });
  });

  describe("DELETE /tools/:toolId", () => {
    it("should delete a tool by ID", async () => {
      const tool = new Tool({
        name: "Hammer",
        description: "A useful tool",
        details: "Heavy-duty hammer",
        available: true,
        owner: "60d5ec49f1e4e2a5d8b5b5b5", // Replace with a valid user ID
        imageUrl: "/toolsImages/hammer.jpg",
      });
      await tool.save();
      const res = await request(app).delete(`/api/tools/${tool._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Tool deleted successfully");
    });
  });
});
