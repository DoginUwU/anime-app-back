import express from 'express';
import cors from 'cors';
import "express-async-errors";
import dotenv from 'dotenv';
import { routes } from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

// app.use(errorHandler);

app.listen(process.env.PORT || 3333, () => {
  console.log("🚀 Server is running");
});