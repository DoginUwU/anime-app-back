import axios, { AxiosRequestHeaders } from "axios";
import { CheerioAPI, load } from "cheerio";

const getPage = async (
  url: string,
  params: string,
  headers?: AxiosRequestHeaders
): Promise<CheerioAPI> => {
  return axios
    .get(`${url}/${params}`, {
      headers,
    })
    .then((response) => {
      return load(response.data);
    });
};

export { getPage };