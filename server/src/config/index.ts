import dotenv from "dotenv";

dotenv.config();

export const { MONGO_DB_URI, PORT, SALT_ROUNDS, PEPPER, JWT_SEC } = process.env;
