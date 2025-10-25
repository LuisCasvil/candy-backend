import { Request, Response } from "express";
import userService from "../services/user.service";

const getAll = (req: Request, res: Response) => {
  const users = userService.getAllUsers();
  res.json(users);
};

export default { getAll };
