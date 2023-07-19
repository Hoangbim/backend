import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import adminRouter from "./routes/admin.js";
import e from "express";
import auth from "./middleware/auth.js";
import notFound from "./middleware/notFound.js";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/", auth);
app.use(adminRouter);
app.use(notFound);
app.listen(5000);
