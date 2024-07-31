import { promises as fs } from "fs";

export const getJsonData = async (filePath) => {
  const data = await fs.readFile(filePath, "utf8");
  const jsonData = JSON.parse(data);
  return jsonData;
};
