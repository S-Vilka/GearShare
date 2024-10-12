const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = require("../API"); // Adjust the path to your app file
const { connectTestDB, closeTestDB } = require("./testConfig");
const User = require("../models/userModel");
require("dotenv").config();

let server;

beforeAll(async () => {
  await connectTestDB();
  server = app.listen(4001); // Start the server on a different port for testing
});

afterAll(async () => {
  await closeTestDB();
  server.close();
});

describe("User API", () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Create a test user

    const user = new User({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "Password123!",
      city: "City",
      streetName: "Street 123",
      postalCode: "12345",
      phone: "1234567890",
    });
    await user.save();
    userId = user._id;

    // Generate a JWT token for the test user
    token = jwt.sign(
      { userId: user._id, email: user.email }, // Payload data
      process.env.JWT_SECRET, // Secret key from .env file
      { expiresIn: "1h" } // Token expiration (1 hour)
    );
  });

  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const res = await request(app).post("/api/users").send({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        confirmEmail: "jane.doe@example.com",
        password: "PasAswor-d123!",
        confirmPassword: "PasAswor-d123!",
        city: "City",
        address: "Street 123",
        postalCode: "12345",
        phone: "1234567890",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("email", "jane.doe@example.com");
    });

    it("should return 400 for missing fields", async () => {
      const res = await request(app).post("/api/users").send({
        firstName: "Jane",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        "Email and confirmation email are required"
      );
    });
  });

  describe("POST /api/users/login", () => {
    it("should login a user and return a token", async () => {
      const res = await request(app).post("/api/users/login").send({
        email: "jane.doe@example.com",
        password: "PasAswor-d123!",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body).toHaveProperty("userId");
      expect(res.body).toHaveProperty("email");
    });

    it("should return 400 for invalid email or password", async () => {
      const res = await request(app).post("/api/users/login").send({
        email: "invalid@example.com",
        password: "wrongpassword",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Invalid email or password");
    });
  });

  describe("GET /api/users/:userId", () => {
    it("should fetch a user by ID", async () => {
      const res = await request(app)
        .get(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("_id", userId.toString());
    });

    it("should return 400 for invalid user ID", async () => {
      const res = await request(app)
        .get("/api/users/invalidUserId")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Invalid user ID");
    });

    it("should return 404 if user not found", async () => {
      const res = await request(app)
        .get(`/api/users/${new mongoose.Types.ObjectId()}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "User not found");
    });
  });

  describe("PATCH /api/users/:userId", () => {
    it("should update a user", async () => {
      const res = await request(app)
        .patch(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstName: "Jane",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("firstName", "Jane");
    });

    it("should return 400 for invalid user ID", async () => {
      const res = await request(app)
        .patch("/api/users/invalidUserId")
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstName: "Jane",
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Invalid user ID");
    });

    it("should return 404 if user not found", async () => {
      const res = await request(app)
        .patch(`/api/users/${new mongoose.Types.ObjectId()}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstName: "Jane",
        });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "User not found");
    });
  });

  describe("DELETE /api/users/:userId", () => {
    it("should delete a user", async () => {
      const res = await request(app)
        .delete(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "User deleted successfully");
    });

    it("should return 400 for invalid user ID", async () => {
      const res = await request(app)
        .delete("/api/users/invalidUserId")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Invalid user ID");
    });

    it("should return 404 if user not found", async () => {
      const res = await request(app)
        .delete(`/api/users/${new mongoose.Types.ObjectId()}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "User not found");
    });
  });

  describe("PATCH /api/users/:userId/change-password", () => {
    it("should change the user password", async () => {
      const res = await request(app)
        .patch(`/api/users/${userId}/change-password`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          oldPassword: "Password123!",
          newPassword: "NewPassword123!",
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty(
        "message",
        "Password changed successfully"
      );
    });

    it("should return 400 for incorrect old password", async () => {
      const res = await request(app)
        .patch(`/api/users/${userId}/change-password`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          oldPassword: "WrongPassword",
          newPassword: "NewPassword123!",
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "User not found");
    });

    it("should return 400 for weak new password", async () => {
      const res = await request(app)
        .patch(`/api/users/${userId}/change-password`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          oldPassword: "Password123!",
          newPassword: "weak",
        });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty(
        "message",
        "Password is not strong enough"
      );
    });
  });

  describe("PATCH /api/users/:userId/tools", () => {
    it("should share a tool", async () => {
      const toolId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .patch(`/api/users/${userId}/tools`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          toolId,
        });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Tool shared successfully");
    });

    it("should return 400 for invalid tool ID", async () => {
      const res = await request(app)
        .patch(`/api/users/${userId}/tools`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          toolId: "invalidToolId",
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Invalid tool ID format");
    });

    it("should return 404 if user not found", async () => {
      const toolId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .patch(`/api/users/${new mongoose.Types.ObjectId()}/tools`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          toolId,
        });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "User not found");
    });
  });
});
