import { Request, Response } from "express";
import { IWatch } from "../@types/watch";
import { getEngine } from "../utils/engine";

class AnimeController {
    public async latestAnimes(req: Request, res: Response): Promise<Response> {
        const { site, page } = req.query as any;
        const engine = getEngine(site);

        const result = await engine.latestAnimes(page);
        return res.status(200).json(result);
    }

    public async latestEpisodes(req: Request, res: Response): Promise<Response> {
        const { site, page } = req.query as any;
        const engine = getEngine(site);

        const result = await engine.latestEpisodes(page);
        return res.status(200).json(result);
    }

    public async popular(req: Request, res: Response): Promise<Response> {
        const { site, page } = req.query as any;
        const engine = getEngine(site);

        const result = await engine.popular(page);
        return res.status(200).json(result);
    }

    public async search(req: Request, res: Response): Promise<Response> {
        const { search, site } = req.query as any;
        const engine = getEngine(site);

        const result = await engine.search(search);
        return res.status(200).json(result);
    }

    public async anime(req: Request, res: Response): Promise<Response> { 
        const { url, site } = req.query as any;
        const engine = getEngine(site);

        const result = await engine.anime(url);
        return res.status(200).json(result);
    }

    public async watch(req: Request, res: Response): Promise<Response> { 
        const { url, site } = req.query as any;
        const engine = getEngine(site);

        const result = await engine.watch(url) as IWatch;
        res.writeHead(200, result.headers);
        result.stream?.pipe(res);
        return res.status(200);
    }
}

export { AnimeController };