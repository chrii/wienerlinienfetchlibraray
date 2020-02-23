import express, { Request, Response } from "express";
import bodyParser, { urlencoded } from "body-parser";
import { router } from "./routes/wlFetchRoutes";

const app = express();
const port = 3000;

app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Server started at Port: ${port}`));
