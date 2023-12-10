import { User } from "./types/user";

export {};

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
