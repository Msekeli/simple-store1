import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import productRoutes from "./interfaces/http/routes/productRoutes.js";
import cartRoutes from "./interfaces/http/routes/cartRoutes.js";
import { swaggerSpec } from "./swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// Health check
app.get("/", (req, res) =>
  res.json({
    status: "ok",
    message: "simple-store backend",
  }),
);

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, () => {
  console.log(`simple-store backend listening on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
