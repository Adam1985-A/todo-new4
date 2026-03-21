import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/user.entity.js";
import { TodoEntity } from "../entities/todo.entity.js";


const databaseUrl =  process.env.DATABASE_URL; //production Ready
if(!databaseUrl){
  throw new Error("DATABASE_URL not defined")
}

const AppDataSource = new DataSource({
  type: "postgres",
  url: databaseUrl,
  logging: false,
  synchronize: true,
  ssl: { 
    rejectUnauthorized: false, 
  },
    
  
  entities: [UserEntity, TodoEntity],
  migrations: [],
  subscribers: []
});

export default AppDataSource;