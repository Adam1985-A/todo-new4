import express from "express";
import AuthController from "../controllers/auth.controller.js";

const routes = express.Router();
const controller = new AuthController();

routes.post("/register", controller.register.bind(controller));
routes.post("/login", controller.login.bind(controller));

export default routes;


