import { AxiosRequestHeaders } from "axios";
import { CheerioAPI, load } from "cheerio";
import { api } from "../libs/axios";
import puppeteer from "puppeteer";

const getPage = async (
  url: string,
  params: string,
  headers?: AxiosRequestHeaders
): Promise<CheerioAPI> => {
  // return api
  //   .get(`${url}/${params}`, {
  //     headers,
  //   })
  //   .then((response) => {
  //     return load(response.data);
  //   });
  const browser = await puppeteer.launch({
    'args' : [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();
  await page.goto(`${url}/${params}`);

  const html = await page.content();
  return load(html);
};

export { getPage };