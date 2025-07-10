import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import helmet from "helmet";
import { limiterConfig } from "./config/rateLimitConfig";
import { env } from "./config/envConfig";
import connectDB from "./config/dbConfig";
import errorHandler from "./middleware/errorHandler";
import { setupSwagger } from "./config/swaggerConfig";
// import { throttleConfig } from "./config/throttleConfig.cjs";

const app: Application = express();

// ===== Middleware =====

//rate-limit
app.use(limiterConfig);

//api thorttle
// app.use(throttleConfig);

// Security middleware to set various HTTP headers
app.use(helmet());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());


app.use('/uploads', express.static('uploads'));

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded data with extended option
app.use(express.urlencoded({ extended: true }));

// Log HTTP requests in development mode
app.use(morgan("dev"));

// ===== API Routes =====
app.use(env.BASIC_API_URL, routes);

// ===== Swagger Documentation =====
setupSwagger(app);

// Handle global error handler
app.use(errorHandler)

//connect db
connectDB();

// ===== Health Check =====
app.get("/", (req, res) => {
  res.send("API is running. Visit /api-docs for Swagger documentation");
});

export default app;
