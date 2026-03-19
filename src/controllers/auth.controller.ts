import { AuthService } from "../services/auth.service.js";
import type { Request, Response } from "express";

export class AuthController{
  private service = new AuthService
  constructor(){
    this.service = new AuthService();

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);

  }

  async register(req: Request, res: Response){
    try{
      const{ name, email, password } = req.body;
      const newUser = await this.service.register(email, password);
      return res.status(200).json({newUser});
    }catch(error: unknown){
      const message = error instanceof Error? error.message: "An unknown error occured";
      return res.status(500).json({message});

    }

    }

  async login(req: Request, res: Response){
    try{
      const { email, password } = req.body;
      if(!email || !password){
       return res.status(400).json({message: "email and password are required"}); 
      }
      const token = await this.service.login(email, password);
      return res.status(200).json({token});
    }catch(error: unknown){
      const message = error instanceof Error? error.message: "An unknown error occured";
      return res.status(500).json({message});
    }
  }
  
};

export default AuthController;

