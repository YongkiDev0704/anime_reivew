import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../../../.env"),
});

export const MONGO_URI = process.env.MONGO_URI! || "mongodb://127.0.0.1:27017/anireivew";
export const MONGO_USER = undefined;
export const MONGO_PASS = undefined;
export const MONGO_DB_NAME = "anireview_db";

export const SALT_ROUND = 10;

export const PORT = 4000;

export const TMDB_API_KEY = process.env.TMDB_API_KEY!;