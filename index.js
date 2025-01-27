import "dotenv/config";
import express from "express";
import cors from "cors";
import mysql from "mysql2";
import userRouter from "./routes/user-routes.js";
import productRouter from "./routes/product-routes.js";
import reservationRouter from "./routes/reservation-routes.js";

const app = express();
let { CROSS_ORIGIN } = process.env;
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: CROSS_ORIGIN }));
app.use(express.json());

app.get("/api/data", async (req, res) => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const [rows] = await connection.execute("SELECT * FROM db_recoup");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/reservation", reservationRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
