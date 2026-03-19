import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "../database/data-source.js";
import { UserEntity } from "../entities/user.entity.js";

export class AuthService{
  private userRepository = AppDataSource.getRepository(UserEntity);

  async register(email: string, password: string){
    const existingUser = await this.userRepository.findOne({
      where: {email}
    });
    if(existingUser){
     throw new Error("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = this.userRepository.create({email, password: hashedPassword});
    
    return await this.userRepository.save(newUser);

  }

  async login(email: string, password: string){
    const user = await this.userRepository.findOne({
      where: {email}
    });
    if(!user){
      throw new Error("invalid email or password");

    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
      throw new Error("invalid credential");
    }

    const token = jwt.sign({userId: user.id},
      process.env.JWT_SECRET as string,
      { expiresIn: "1d"}
    );
    return {token};
  }
};