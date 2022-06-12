import { AxiosRequestHeaders } from "axios";
import { load } from "cheerio";
import { Readable } from "stream";
import { IAnime, ISeason } from "../../@types/anime";
import { ISearch } from "../../@types/search";
import { getPage } from "../../utils/page";
import { api } from "../axios";
import { Engine } from "../engine";

class AnimesOnline extends Engine {
    headers: AxiosRequestHeaders = {
        'origin': 'https://animesonline.cc'
    };

    constructor() {
        super("AnimesOnline", "https://still-brushlands-24168.herokuapp.com/https://animesonline.cc");
    }

    async search(query: string): Promise<ISearch> {
        const address = `search/${query}`;
        const search = await getPage(this.url, address, this.headers);

        const items = search('article').toArray().map((item) => {
            return {
                title: search(item).find('h3').text().trim(),
                image: search(item).find('img').attr('src') ?? '',
                url: search(item).find('a').attr('href')?.replace(this.url , '') ?? ''
            }
        });

        return {
            items
        };
    }

    async anime(address: string): Promise<IAnime> {
        const search = await getPage(this.url, address, this.headers);

        const title = search('.data h1').text().replace("Todos os Episodios Online", "").trim();
        const image = search('.poster img').attr('src') ?? '';
        const tags = search('.sgeneros a').toArray().map((tag) => search(tag).text().trim());
        const description = search('.wp-content p').text().trim();

        const seasons = search('#seasons .se-c').toArray().map<ISeason>((season) => { 
            const title = search(season).find('.title').text().trim();
            const episodes = search(season).find('.episodios li').toArray().map((episode) => { 
                
                const title = search(episode).find('.episodiotitle a').text().trim();
                const url = search(episode).find('.episodiotitle a').attr('href')?.replace(this.url , '') ?? '';
                const image = search(episode).find('.imagen img').attr('src') ?? '';

                return { title, url, image };
            });
        
            return {
                title,
                episodes
            }
        });

        return {
            title,
            image,
            tags,
            description,
            seasons,
        }
    }

    async watch(address: string): Promise<Readable | null> {
        let stream: Readable | null = null;

        const html = (await api.get(`${this.url}${address}`)).data;

        const search = await load(html);
        const url = search('iframe').attr('src');
            
        if (!url) return stream;

        const text = (await api.get(url)).data;
        const start = text.indexOf(`"play_url":`);
        var tempDoc = text.substring(start);
        const end = tempDoc.indexOf('","');

        const newUrl = tempDoc.substring(0, end).replace('"play_url":"', '');
                
        await api({
            method: 'get',
            url: newUrl,
            responseType: 'stream',
        }).then(async (response) => { 
            stream = response.data;
        });

        return stream;
        // const browser = await puppeteer.launch();
        // const page = await browser.newPage();

        // await page.goto(`${this.url}${address}`);
        // await page.waitForSelector('iframe');
        // //get iframe
        // const iframe = await page.$('iframe');

        // if (!iframe) return;
        // const html = await iframe.contentFrame();

        // const url = await html?.evaluate(() => {
        //     const text = document.documentElement.innerHTML;
        //     const start = text.indexOf(`"play_url":`);
        //     var tempDoc = document.documentElement.innerHTML.substring(start);
        //     const end = tempDoc.indexOf('","');
            
        //     return tempDoc.substring(0, end).replace('"play_url":"', '');
        // });

        // if (!url) return;

        
        
        // await browser.close();
        // return {};
    }
}

export default AnimesOnline;