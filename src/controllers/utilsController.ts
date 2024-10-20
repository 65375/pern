import { Request, Response } from "express"
import { appDataSource } from "../data-source"
import UserRepository from "../repositories/userRepository"

export class UtilsController {
  healthCheck = async (req: Request, res: Response): Promise<void> => {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'API OK',
      timestamp: Date.now()
    };
    try {
      res.status(200).send(healthcheck);
    } catch (error: any) {
      healthcheck.message = error;
      res.status(503).send();
    }
  }
}