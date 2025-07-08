import app from "./app";
import { env } from "./config/envConfig";


// Handle uncaught exceptions (before anything else)
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION Shutting down sever...');
  console.error(err.name, err.message);
  process.exit(1);
});


// Load environment variables from .env file
const PORT = env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// 2️⃣ Handle unhandled promise rejections (graceful shutdown)
process.on('unhandledRejection', (reason: any) => {
  console.error('UNHANDLED REJECTION Shutting down server...');
  console.error(reason);
  server.close(() => {
    process.exit(1);
  });
});
