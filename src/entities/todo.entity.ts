import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "../entities/user.entity.js";


@Entity()
export class TodoEntity{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text", nullable: true})
  description: string;

  @Column({ type: "boolean", default: false})
  completed: boolean;

  @Column({ type: "timestamp", default:()=> "CURRENT_TIMESTAMP"})
createdAt: Date;

@Column({ type: "timestamp", default: ()=> "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
updatedAt: Date;

@ManyToOne(() => UserEntity, (user)=> user.todo, {onDelete: "CASCADE"})
user: UserEntity;
}

export default TodoEntity;

