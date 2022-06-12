interface IAnime {
    title: string;
    image: string;
    tags: string[];
    description: string;
    seasons: ISeason[];
}

interface ISeason {
    title: string;
    episodes: IEpisode[];
}

interface IEpisode {
    title: string;
    url: string;
    image?: string;
}

export type { IAnime, ISeason, IEpisode };