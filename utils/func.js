import { promises as fs } from "fs";

export const getJsonData = async (filePath) => {
  const data = await fs.readFile(filePath, "utf8");
  const jsonData = JSON.parse(data);
  return jsonData;
};

export const writeJsonFile = async (filePath, data) => {
  try {
    const jsonString = JSON.stringify(data, null, 2); // Pretty-print JSON with 2 spaces
    await fs.writeFile(filePath, jsonString, "utf8");
  } catch (err) {
    console.error("Error writing the file:", err);
  }
};
