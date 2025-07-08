import dotenv from "dotenv";
dotenv.config();

function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key];
  if (!value && fallback === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || fallback!;
}

export const env = {
  PORT: getEnvVar("PORT", "5000"),
  DATABASE_NAME:"",
  BASIC_API_URL: getEnvVar("BASIC_API_URL", "/api"),
  MONGO_URI: getEnvVar("MONGO_URI", "mongodb+srv://manickavasagardgl:2wN66jT88wAblwlm@cluster0.uf9xb4b.mongodb.net"),
  JWT_ACCESS: getEnvVar("JWT_ACCESS_SECRET", "supersecret"),
  EMAIL_API_KEY: getEnvVar("EMAIL_API_key","")
};
