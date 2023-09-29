import express, { Application } from "express";
import { connectDB } from "./utils/connectDB";
import { PORT } from "./config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes";

const app: Application = express();

const port = parseInt(PORT as string) || 8080;

// Connect To Database
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// API
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
