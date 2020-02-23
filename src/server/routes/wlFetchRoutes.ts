import { Router, Response, Request } from "express";
import { FetchFromJson } from "../../classes/FetchFromJson";
import lineJson from "../../ogd-data/linien.json";
import trackJson from "../../ogd-data/steig-daten-mock.json";
import stopJson from "../../ogd-data/haltestellen.json";

import {
  IStationObject,
  ITrackObject,
  ILineObject
} from "../../classes/Interfaces";

const router = Router();
const master = new FetchFromJson(
  stopJson as IStationObject[],
  trackJson as ITrackObject[],
  lineJson as ILineObject[]
);

/* router.get("/", (req: Request, res: Response) => {
  res.send(`
    <div>
    <h1>Sending RBLs</h1>
      <button id="button" onClick="${sendPostRbl}">Send RBL Data</button>
    </div>
    `);
}); */

router.get("/masterdata", (req: Request, res: Response) => {
  res.json(master.masterData);
});

const sendPostRbl = router.post("/rbl-data", (req: Request, res: Response) => {
  console.log("test");
});

export { router };
