import AppDataSource from "../database/data-source.js";
import { TodoEntity } from "../entities/todo.entity.js";

export class TodoService{
  private todoRepository = AppDataSource.getRepository(TodoEntity);
  async getTodos(userId: number){
    return await this.todoRepository.find({
      where: { user: {id: userId} as any},
    })
  }

  async getTodoById(id: number){
    const todo = await this.todoRepository.findOne({
      where: {id}
    })
    if(!todo){
     throw new Error("Todo not found");
    }
    return todo;
  }

  async createTodo(payload: any, userId: number){
    const newTodo = this.todoRepository.create({...payload, 
      user: { id: userId},
    });
    return await this.todoRepository.save(newTodo);
  }

  async updateTodo( id: number, payload: any){
    const todo = await this.getTodoById(id);

    //merge existing todo with update

    Object.assign(todo, payload);
    return await this.todoRepository.save(todo);
  }

  async deleteTodo(id: number){
    const todo = await this.getTodoById(id);
    await this.todoRepository.remove(todo);
    return { message: "Todo succcesfully deleted"}
  }

};

export default TodoEntity;