import { Any } from "typeorm";
import { TodoService } from "../services/todo.service.js";
export class TodoController {
    service;
    constructor() {
        this.service = new TodoService();
        this.getAllTodos = this.getAllTodos.bind(this);
        this.getTodoById = this.getTodoById.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }
    async getAllTodos(req, res) {
        try {
            const userId = req.userId;
            const todos = await this.service.getTodos(userId);
            return res.status(200).json(todos);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "An unknown erreo occured";
            return res.status(500).json({ message });
        }
    }
    async getTodoById(req, res) {
        try {
            const id = Number(req.params.id);
            const todo = await this.service.getTodoById(id);
            if (todo) {
                return res.status(200).json(todo);
            }
            else {
                return res.status(404).json({ message: "Todo not found" });
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occured";
            return res.status(500).json({ message });
        }
    }
    async createTodo(req, res) {
        try {
            const payload = req.body;
            const userId = req.userId;
            const newTodo = await this.service.createTodo(payload, userId);
            return res.status(201).json(newTodo);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occured";
            return res.status(500).json({ message });
        }
    }
    async updateTodo(req, res) {
        try {
            const id = Number(req.params.id);
            const payload = req.body;
            const updatedTodo = await this.service.updateTodo(id, payload);
            if (updatedTodo) {
                res.status(200).json(updatedTodo);
            }
            else {
                res.status(404).json({ message: "Todo not found" });
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occured";
            return res.status(500).json({ message });
        }
    }
    async deleteTodo(req, res) {
        try {
            const id = Number(req.params.id);
            const deleteTodo = await this.service.deleteTodo(id);
            if (deleteTodo) {
                return res.status(200).json(deleteTodo);
            }
            else {
                return res.status(404).json({ message: "Todo not found" });
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occured";
            return res.status(500).json({ message });
        }
    }
}
//# sourceMappingURL=todo.controller.js.map