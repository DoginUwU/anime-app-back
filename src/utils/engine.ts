import { Engine, engines } from "../libs/engine";

const getEngine = (site: string): Engine => {
    const engine = engines.get(site);
    if (!engine) throw new Error(`Engine not found`);

    return engine;
}

export { getEngine };