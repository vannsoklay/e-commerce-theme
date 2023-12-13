import { createResource } from "solid-js";
import { readFile } from "../../theme";

const theme = async (name: string) => {
  const theme = await readFile();
  return theme(name);
};

export const read = (name: string) => {
  const [data] = createResource(name, theme);
  return data;
};
