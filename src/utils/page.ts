import { AxiosRequestHeaders } from "axios";
import { CheerioAPI, load } from "cheerio";
import { api } from "../libs/axios";

const getPage = async (
  url: string,
  params: string,
  headers?: AxiosRequestHeaders
): Promise<CheerioAPI> => {
  return api
    .get(`${url}/${params}`, {
      headers,
    })
    .then((response) => {
      return load(response.data);
    });
};

export { getPage };