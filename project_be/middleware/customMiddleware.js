// Middleware to log details of each incoming request
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method); // Log the HTTP method of the request
  console.log("Path:  ", request.path); // Log the path of the request
  console.log("Body:  ", request.body); // Log the body of the request
  console.log("---"); // Separator for readability
  next(); // Pass control to the next middleware
};

// Middleware to handle unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// Middleware to handle errors
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  response.status(500);
  response.json({
    message: error.message,
  });
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};