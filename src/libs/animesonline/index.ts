import { AxiosRequestHeaders, AxiosResponseHeaders } from "axios";
import { load } from "cheerio";
import { Readable } from "stream";
import { IAnime, ISeason } from "../../@types/anime";
import { ISearch, ISearchItem } from "../../@types/search";
import { IWatch } from "../../@types/watch";
import { getPage } from "../../utils/page";
import { api } from "../axios";
import { Engine } from "../engine";

class AnimesOnline extends Engine {
    headers: AxiosRequestHeaders = {
        origin: 'https://animesonline.cc',
    };

    constructor() {
        super("AnimesOnline", "https://animesonline.cc");
    }

    async latestAnimes(page?: number): Promise<ISearch> { 
        const address = `anime/page/${page ?? 1}`;
        const search = await getPage(this.url, address, this.headers);

        const items = search('article.item').toArray().map<ISearchItem>((item) => { 
            return {
                title: search(item).find('.data a').text().trim(),
                image: search(item).find('.poster img').attr('src') ?? '',
                url: search(item).find('a').attr('href')?.replace(this.url , '') ?? '',
            }
        });

        const currentPage = Number(search('.pagination .current').text().trim());
        const totalPages = Number(search('.pagination span').first().text().replace(`Pagina ${currentPage} de `, '').trim());
        const hasNext = currentPage < totalPages;

        return {
            items,
            page: currentPage,
            hasNext,
            total: totalPages

        };
    }

    async latestEpisodes(page?: number): Promise<ISearch> {
        const address = `episodio/page/${page ?? 1}`;
        const search = await getPage(this.url, address, this.headers);

        const items = search('article.item').toArray().map<ISearchItem>((item) => {
            return {
                title: search(item).find('.eptitle a').text().trim(),
                image: search(item).find('.poster img').attr('src') ?? '',
                url: search(item).find('a').attr('href')?.replace(this.url, '') ?? '',
            }
        });

        const currentPage = Number(search('.pagination .current').text().trim());
        const totalPages = Number(search('.pagination span').first().text().replace(`Pagina ${currentPage} de `, '').trim());
        const hasNext = currentPage < totalPages;

        return {
            items,
            page: currentPage,
            hasNext,
            total: totalPages

        };
    }

    async popular(): Promise<ISearch> { 
        const address = ``;
        const search = await getPage(this.url, address, this.headers);

        const items = search('#dtw_content_views-2 .w_item_b').toArray().map<ISearchItem>((item) => { 
            return {
                url: this.removeBaseUrl(search(item).find('a').attr('href')),
                title: search(item).find('.data h3').text().trim(),
                image: search(item).find('.image img').attr('src') ?? '',
            }
        });

        return {
            items,
            page: 1,
            hasNext: false,
            total: 1,
        }
    }

    async search(query: string): Promise<ISearch> {
        const address = `search/${query}`;
        const search = await getPage(this.url, address, this.headers);

        const items = search('article').toArray().map((item) => {
            return {
                title: search(item).find('h3').text().trim(),
                image: search(item).find('img').attr('src') ?? '',
                url: this.removeBaseUrl(search(item).find('a').attr('href'))
            }
        });

        return {
            items,
            page: 1,
            hasNext: false,
            total: 1
        };
    }

    async anime(address: string): Promise<IAnime> {
        const search = await getPage(this.url, address, this.headers);

        const title = search('.data h1').text().replace("Todos os Episodios Online", "").trim();
        const image = search('.poster img').attr('src') ?? '';
        const tags = search('.sgeneros a').toArray().map((tag) => search(tag).text().trim());
        const description = search('.wp-content p').text().trim();
        const year = Number(search('.sheader .date').text().trim());
        const rating = Number(search('.starstruck-wrap .dt_rating_vgs').text().trim());

        const seasons = search('#seasons .se-c').toArray().map<ISeason>((season) => { 
            const title = search(season).find('.title').text().trim();
            const episodes = search(season).find('.episodios li').toArray().map((episode) => { 
                
                const title = search(episode).find('.episodiotitle a').text().trim();
                const url = this.removeBaseUrl(search(episode).find('.episodiotitle a').attr('href'));
                const image = search(episode).find('.imagen img').attr('src') ?? '';

                return { title, url, image };
            });
        
            return {
                title,
                episodes
            }
        });

        console.log(search('').html());
        

        const related = search('.srelacionados #single_relacionados article').toArray().map((anime) => {
            const title = search(anime).find('img').attr('alt') ?? '';
            const url = this.removeBaseUrl(search(anime).find('a').attr('href'));
            const image = search(anime).find('img').attr('src') ?? '';
            return { title, url, image };
        });

        return {
            title,
            image,
            tags,
            description,
            year,
            rating,
            seasons,
            related,
        }
    }

    async watch(address: string): Promise<IWatch> {
        let stream: Readable | null = null;
        let headers: AxiosResponseHeaders = {};

        const html = (await api.get(`${this.url}${address}`)).data;

        const search = await load(html);
        const url = search('iframe').attr('src');
            
        if (!url) return {
            headers,
            stream
        };

        const text = (await api.get(url)).data;
        const start = text.indexOf(`"play_url":`);
        var tempDoc = text.substring(start);
        const end = tempDoc.indexOf('","');

        const newUrl = tempDoc.substring(0, end).replace('"play_url":"', '');
                
        await api({
            method: 'get',
            url: newUrl,
            responseType: 'stream'
        }).then(async (response) => { 
            stream = response.data;
            headers = response.headers;
        });

        return {
            stream,
            headers
        };
    }
}

export default AnimesOnline;