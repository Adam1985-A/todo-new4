import express from "express";
import { TodoController } from "../controllers/todo.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const routes = express.Router();
routes.use(authMiddleware);

const controller = new TodoController();

routes.get("/", authMiddleware, controller.getAllTodos);
routes.get("/:id", authMiddleware, controller.getTodoById);
routes.post("/", authMiddleware, controller.createTodo);
routes.put("/:id", authMiddleware, controller.updateTodo);
routes.delete("/:id", authMiddleware, controller.deleteTodo);

export default routes;



