import { Router, Response, Request } from "express";
import { FetchFromJson } from "../../classes/FetchFromJson";
import lineJson from "../../ogd-data/linien.json";
import trackJson from "../../ogd-data/steige.json";
import stopJson from "../../ogd-data/haltestellen.json";
import { sanitizeNumber } from "../utils/helper";

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

router.get("/", (req: Request, res: Response) => {
  res.send(`
    <div>
    <h1>Sending RBLs</h1>
    <form method="POST">
    <button>Send RBL Data</button>
    </form>
    </div>
    `);
});

router.get("/masterdata", (req: Request, res: Response) => {
  console.log(`Masterdata was fetched by: ${req}`);
  res.json(master.masterData);
});

///https://www.wienerlinien.at/ogd_realtime/monitor?rbl=

router.post("/realtimedata", async (req: Request, res: Response) => {
  const { rbl } = req.body;
  if (req.body) {
    console.info("[INFO]Get Body Request");
    const splitRbl: [] = rbl.split(",");
    const rblParsed = splitRbl.map((i: any): number => {
      try {
        return sanitizeNumber(i);
      } catch (e) {
        res.status(400).end();
        throw new Error(e);
      }
    });
    try {
      console.info("[INFO]Fetch realtime data");
      await master.getRealTimeDataByRbl(rblParsed);
      res.status(200).json(master.realTimeData);
    } catch (e) {
      res.status(404).end();
    }
  } else {
    res.status(404).end();
    throw new Error("No data found");
  }
});

export { router };
