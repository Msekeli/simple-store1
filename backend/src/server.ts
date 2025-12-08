import express from "express";
import cors from "cors";
import productRoutes from "./interfaces/http/routes/productRoutes.js";
import cartRoutes from "./interfaces/http/routes/cartRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// health
app.get("/", (req, res) => res.json({ status: "ok", message: "simple-store backend" }));

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, () => {
  // small poetic log
  console.log(`simple-store backend listening on http://localhost:${PORT}`);
});
