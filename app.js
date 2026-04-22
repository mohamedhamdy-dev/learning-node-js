import express from "express";
import bodyParser from "body-parser";
import adminRoutes from "./routes/adminRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

////////////////////
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
////////////////////

const app = express();
app.use(bodyParser.urlencoded());

// Routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// 404 Fallback
app.use((req, res, next) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "views", "page-not-found.html"));
});

// Server Listen to requests on port 3001
app.listen(3001);
