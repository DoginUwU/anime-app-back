import { Request, Response } from "express";
import { BaseService } from "../services/BaseService";

class BaseController {
    public get(_: Request, response: Response): Response {
        return response.status(200).json(new BaseService().get());
    }
}

export { BaseController };