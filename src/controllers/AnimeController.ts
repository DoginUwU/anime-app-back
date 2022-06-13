import { Request, Response } from "express";
import { Readable } from "stream";
import { getEngine } from "../utils/engine";

class AnimeController {
    public async news(req: Request, res: Response): Promise<Response> {
        const { site } = req.query as any;
        const engine = getEngine(site);

        const result = await engine.news();
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

        const result = await engine.watch(url) as Readable;
        res.writeHead(200, {
            "Content-Type": "video/mp4",
        });
        result.pipe(res);
        return res.status(200);
    }
}

export { AnimeController };