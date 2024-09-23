import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/user-routes.js";
import productRouter from "./routes/product-routes.js";

const app = express();
let { CROSS_ORIGIN } = process.env;
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: CROSS_ORIGIN }));
app.use(express.json());
app.use("/user", userRouter)
app.use("/product", productRouter)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});