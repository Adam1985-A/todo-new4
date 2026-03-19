import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/user.entity.js";
import { TodoEntity } from "../entities/todo.entity.js";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "postgres",
  port: 5432,
  database: "todo-new4",
  password: "saidat1985",
  logging: false,
  synchronize: true,
  entities: [UserEntity, TodoEntity],
  migrations: [],
  subscribers: []
});

export default AppDataSource;