import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

export function createToken(email: string, name?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data: email, name },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token as string);
      }
    );
  });
}

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const payload = req.headers.authorization;
  const token = payload?.split(" ");
  if (token) {
    jwt.verify(token[1], process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: err });
      } else {
        //@ts-ignore
        req.token = decoded;
        next();
      }
    });
  }
}
