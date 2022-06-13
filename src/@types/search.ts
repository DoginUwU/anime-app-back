interface ISearchItem {
    title: string;
    image: string;
    url: string;
}

interface ISearch {
    items: ISearchItem[];
}

export type { ISearch, ISearchItem };