const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = require("../API"); // Adjust the path to your app file
const { connectTestDB, closeTestDB } = require("./testConfig");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

let server;
let user;
let token;
let userId;

beforeAll(async () => {
  await connectTestDB();
  server = app.listen(4001); // Start the server on a different port for testing

  // Create a test user with a unique email and hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("Pass.word1-23!", salt);

  const timestamp = Date.now();
  user = new User({
    firstName: "Jane",
    lastName: "Doe",
    email: `jane.doe.${timestamp}@example.com`, // Unique email
    password: hashedPassword,
    city: "City",
    streetName: "Street 123",
    postalCode: "12345",
    phone: "1234567890",
  });
  await user.save();
  userId = user._id.toString();

  // Generate a JWT token for the test user
  token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
});

afterAll(async () => {
  await User.deleteMany({});
  await closeTestDB();
  server.close();
});

describe("User API", () => {
  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const timestamp = Date.now();
      const res = await request(app)
        .post("/api/users")
        .send({
          firstName: "Jane",
          lastName: "Doe",
          email: `jane1.doe.${timestamp}@example.com`, // Unique email
          confirmEmail: `jane1.doe.${timestamp}@example.com`,
          password: "Pass.word1-23!",
          confirmPassword: "Pass.word1-23!",
          city: "City",
          address: "Street 123",
          postalCode: "12345",
          phone: "1234567890",
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty(
        "email",
        `jane1.doe.${timestamp}@example.com`
      );
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
        email: user.email, // Use the unique email from beforeAll
        password: "Pass.word1-23!",
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
  });

  describe("PATCH /api/users/:userId", () => {
    it("should update a user", async () => {
      const res = await request(app)
        .patch(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstName: "Jane Updated",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("firstName", "Jane Updated");
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

  describe("PATCH /api/users/:userId/change-password", () => {
    it("should change the user password", async () => {
      const res = await request(app)
        .patch(`/api/users/${userId}/change-password`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          oldPassword: "Pass.word1-23!",
          newPassword: "Pass.word1-23!@d",
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty(
        "message",
        "Password changed successfully."
      );
    });

    it("should return 400 for incorrect old password", async () => {
      const res = await request(app)
        .patch(`/api/users/${userId}/change-password`)
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          oldPassword: "WrongPassword",
          newPassword: "NewPassword123!",
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Incorrect old password");
    });
  });

  describe("DELETE /api/users/:userId", () => {
    let deleteUserId;
    let deleteUserToken;

    beforeEach(async () => {
      const timestamp = Date.now(); // Use a unique timestamp for each user
      const deleteUser = new User({
        firstName: "Delete",
        lastName: "User",
        email: `delete.user.${timestamp}@example.com`, // Unique email
        password: await bcrypt.hash("DeletePass123!", 10),
        city: "DeleteCity",
        streetName: "DeleteStreet",
        postalCode: "54321",
        phone: "9876543210",
      });
      await deleteUser.save();
      deleteUserId = deleteUser._id;

      deleteUserToken = jwt.sign(
        { userId: deleteUserId, email: deleteUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    });

    it("should delete a user", async () => {
      const res = await request(app)
        .delete(`/api/users/${deleteUserId}`)
        .set("Authorization", `Bearer ${deleteUserToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "User deleted successfully");
    });

    it("should return 400 for invalid user ID", async () => {
      const res = await request(app)
        .delete("/api/users/invalidUserId")
        .set("Authorization", `Bearer ${deleteUserToken}`);
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Invalid user ID");
    });

    it("should return 404 if user not found", async () => {
      const res = await request(app)
        .delete(`/api/users/${new mongoose.Types.ObjectId()}`)
        .set("Authorization", `Bearer ${deleteUserToken}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "User not found");
    });
  });
});
