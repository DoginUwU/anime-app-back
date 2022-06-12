import { promises } from "node:fs";

const getDirectories = async (source: string) =>
  (await promises.readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

export { getDirectories };