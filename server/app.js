const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./docs/swagger");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const aiRoutes = require("./routes/aiRoutes");
const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Resume Builder API is running"
  });
});

app.use("/api/ai", aiRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);

// Swagger API Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(errorMiddleware);

module.exports = app;