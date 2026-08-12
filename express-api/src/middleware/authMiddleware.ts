import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  user_id: number;
  email: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Get the secret key from the .env file
const SECRET = process.env.JWT_SECRET as string;

export function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Get the Authorization header
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists
  if (!authHeader) {
    return res.status(401).json({
      message: "Access denied. No token provided."
    });
  }

  try {
    // Authorization should look like:
    // Bearer eyJhbGci...
    const parts = authHeader.split(" ");

    // Get the actual token after "Bearer"
    const token = parts[1];

    // Check if a token was found
    if (!token) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }

    // Verify that the token is valid and store decoded data
    const decoded = jwt.verify(token, SECRET) as JwtPayload;

    if (!decoded || !decoded.user_id) {
      return res.status(401).json({
        message: "Invalid token payload"
      });
    }

    req.user = decoded;

    // Token is valid, so continue to the route
    next();

  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}