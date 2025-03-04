import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { serialize } from "../../../src";
import { cacheDirectory, download } from "./download";

type Version = `v${number}.${string}.${string}`;

export async function getVersions(array: Version[]): Promise<
  Array<{
    name: string;
    serialize: (input: any, options?: Record<string, any>) => string;
  }>
> {
  const imports = await Promise.all(array.map((v) => getVersion(v)));
  const versions = array.map((version, i) => ({
    name: `ohash ${version}`,
    serialize: (input: any, options?: Record<string, any>) =>
      version.startsWith("v2")
        ? imports[i].serialize(input)
        : imports[i].objectHash(input, options),
  }));

  versions.push({
    name: "ohash (current)",
    serialize: (input) => serialize(input),
  });

  return versions;
}

async function getVersion(version: Version) {
  const cacheDir = cacheDirectory();

  if (!existsSync(cacheDir)) {
    await mkdir(cacheDir, { recursive: true });
  }

  const name = version.startsWith("v2") ? "serialize" : "object-hash";
  const filePath = resolve(cacheDirectory(), `${name}-${version}.ts`);

  await download(
    `https://raw.githubusercontent.com/unjs/ohash/refs/tags/${version}/src/${name}.ts`,
    filePath,
  );

  return import(filePath);
}
