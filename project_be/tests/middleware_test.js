const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../API");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("../middleware/customMiddleware");
const requireAuth = require("../middleware/requireAuth");
const User = require("../models/userModel");

describe("Middleware Tests", () => {
  describe("customMiddleware", () => {
    test("requestLogger logs request details", () => {
      const req = { method: "GET", path: "/test", body: {} };
      const res = {};
      const next = jest.fn();
      const consoleSpy = jest.spyOn(console, "log");

      requestLogger(req, res, next);

      expect(consoleSpy).toHaveBeenCalledWith("Method:", "GET");
      expect(consoleSpy).toHaveBeenCalledWith("Path:  ", "/test");
      expect(consoleSpy).toHaveBeenCalledWith("Body:  ", {});
      expect(next).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    test("unknownEndpoint returns 404 with correct message", async () => {
      const res = await request(app).get("/nonexistent-route");
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: "unknown endpoint" });
    });

    test("errorHandler handles errors correctly", async () => {
      const mockError = new Error("Test error");
      app.get("/test-error", (req, res, next) => next(mockError));

      const res = await request(app).get("/test-error");
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", "Test error");
    });
  });

  describe("requireAuth", () => {
    let token;
    let userId;

    beforeAll(async () => {
      const user = new User({
        email: "test@example.com",
        password: "password123",
      });
      await user.save();
      userId = user._id;
      token = jwt.sign({ _id: userId }, process.env.SECRET);
    });

    test("returns 401 if no authorization header", async () => {
      const res = await request(app).get("/protected-route");
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ error: "Authorization token required" });
    });

    test("returns 401 for invalid token", async () => {
      const res = await request(app)
        .get("/protected-route")
        .set("Authorization", "Bearer invalidtoken");
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ error: "Request is not authorized" });
    });

    test("sets user on request object for valid token", async () => {
      app.get("/protected-route", requireAuth, (req, res) => {
        res.json({ user: req.user });
      });

      const res = await request(app)
        .get("/protected-route")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.user).toHaveProperty("_id", userId.toString());
    });
  });
});