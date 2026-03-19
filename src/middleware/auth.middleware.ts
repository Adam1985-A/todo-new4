import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";


export default function authMiddleware(req: Request, res: Response, next: NextFunction){

  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({message: "Authorization header missing"});
  }

  const token = authHeader.split(" ")[1];
  if(!token){
    return res.status(401).json({message: "Token not found"});
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET as 
      string) as { userId: number };
      (req as any).userId = decoded.userId;

      next();

  }catch(error: unknown){
    return res.status(401).json({message: "Invalid token"})
  }
}

