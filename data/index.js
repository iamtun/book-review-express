import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileBookPath = join(__dirname, "books.json");
const fileUserPath = join(__dirname, "users.json");

export { fileBookPath, fileUserPath };
