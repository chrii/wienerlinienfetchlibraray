import express, { Request, Response } from "express";
import bodyParser, { urlencoded } from "body-parser";
import { router } from "./routes/wlFetchRoutes";

const app = express();
const port = 3001;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => console.log(`Server started at Port: ${port}`));
