import express, { Request, Response } from "express";
import bodyParser, { urlencoded } from "body-parser";
import { router } from "./routes/wlFetchRoutes";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => console.log(`Server started at Port: ${port}`));
