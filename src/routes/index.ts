import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { AnimeController } from "../controllers/AnimeController";
import { BaseController } from "../controllers/BaseController";

const routes = Router();

routes.get("/", new BaseController().get);

routes.get("/search", celebrate({
    [Segments.QUERY]: {
        search: Joi.string().required(),
        site: Joi.string().required(),
        page: Joi.number().required()
    }
}), new AnimeController().search);

routes.get("/anime", celebrate({
    [Segments.QUERY]: {
        url: Joi.string().required(),
        site: Joi.string().required()
    }
}), new AnimeController().anime);

routes.get("/watch", celebrate({
    [Segments.QUERY]: {
        url: Joi.string().required(),
        site: Joi.string().required()
    }
}), new AnimeController().watch);

export { routes };