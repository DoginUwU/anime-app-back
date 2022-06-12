import { Response } from "express";
import { Readable } from "stream";
import { IAnime } from "../@types/anime";
import { ISearch } from "../@types/search";
import { getDirectories } from "../utils/directory";

class Engines {
    engines: any[] = [];

    constructor() {
        getDirectories(__dirname).then((directories) => {
            directories.forEach(async (directory) => {
                const { default: engine } = await import(`./${directory}`);
                this.add(new engine());
            });
        })
    }

    add(engine: Engine): void {
        this.engines.push(engine);
    }

    get(name: string): Engine | undefined {
        return this.engines.find((engine) => engine.name.toLowerCase() === name.toLowerCase());
    }

    getAll(): Array<Engine> {
        return this.engines;
    }
};

abstract class Engine {
  name: string;
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
    }
    
    abstract search(query: string): Promise<ISearch>;
    abstract anime(url: string): Promise<IAnime>;
    abstract watch(url: string, response?: Response): Promise<IAnime | Readable | null>;
}

const engines = new Engines();

export { Engines, Engine, engines };