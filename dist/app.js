import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express from "express";
import AppDataSource from "./database/data-source.js";
import authRoutes from "./routes/auth.route.js";
import todoRoutes from "./routes/todo.route.js";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/todos", todoRoutes);
app.use("/auth", authRoutes);
await AppDataSource.initialize()
    .then(() => {
    console.log("Database connected succesfully");
})
    .catch((error) => {
    console.error("Database conection error:", error);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map