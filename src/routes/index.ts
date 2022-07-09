import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { AnimeController } from "../controllers/AnimeController";
import { BaseController } from "../controllers/BaseController";

const routes = Router();
const animeController = new AnimeController();

routes.get("/", new BaseController().get);

routes.get("/news", celebrate({
    [Segments.QUERY]: {
        site: Joi.string().required(),
        page: Joi.number().optional(),
    }
}), animeController.news);
routes.get("/popular", celebrate({
    [Segments.QUERY]: {
        site: Joi.string().required(),
        page: Joi.number().optional(),
    }
}), animeController.popular);
routes.get("/search", celebrate({
    [Segments.QUERY]: {
        search: Joi.string().required(),
        site: Joi.string().required(),
        page: Joi.number().required()
    }
}), animeController.search);

routes.get("/anime", celebrate({
    [Segments.QUERY]: {
        url: Joi.string().required(),
        site: Joi.string().required()
    }
}), animeController.anime);

routes.get("/watch", celebrate({
    [Segments.QUERY]: {
        url: Joi.string().required(),
        site: Joi.string().required()
    }
}), animeController.watch);

export { routes };