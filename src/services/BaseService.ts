import { engines } from "../libs/engine";

class BaseService {
    public get() {
        return {
            app: 'Anime-app',
            version: '1.0.0',
            availableSites: engines.getAll().map(engine => engine.name),
            hash: '852c6ee676d61d7b8ff01ff136701c10f1bdbc23ffd37b2da9ebb0c52ce3dbc2' // SHA-512
        }
    }
}

export { BaseService };