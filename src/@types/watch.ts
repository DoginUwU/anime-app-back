import { AxiosResponseHeaders } from "axios";
import { Readable } from "stream";

interface IWatch {
    headers: AxiosResponseHeaders;
    stream: Readable | null;
}

export type { IWatch };