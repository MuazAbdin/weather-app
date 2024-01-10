import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import { connect } from "mongoose";
import cityRouter from "./routes/cityRouter.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/public", express.static(path.resolve(__dirname, "./client")));
app.use("/public", express.static(path.resolve(__dirname, "./node_modules")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/weather/v1/cities", cityRouter);

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const msg = err.message || "something went wrong, try again later";
  res.status(statusCode).send({ msg });
});

const PORT = process.env.PORT || 3000;
try {
  await connect(`${process.env.MONGO_URL}`);
  console.log("connected to DB successfully ...");
  app.listen(PORT, () => {
    console.log(
      `server running on PORT ${PORT} ... <http://localhost:${PORT}/public>`
    );
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
