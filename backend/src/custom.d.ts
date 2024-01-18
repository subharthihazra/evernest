import Admin from "./types/admin";
import User from "./types/user";

declare global {
  namespace Express {
    export interface Request {
      user: User;
      admin: Admin;
      files: any;
      body: any;
    }
  }
}
