import f from "./ogd-data/linien.json";
import d from "./ogd-data/steig-daten-mock.json";
import { FetchFromJson } from "./classes/FetchFromJson";
import g from "./ogd-data/haltestellen.json";
import {
  IStationObject,
  ITrackObject,
  ILineObject
} from "./classes/Interfaces";

const wl = new FetchFromJson(
  g as IStationObject[],
  d as ITrackObject[],
  f as ILineObject[]
);

try {
  const RBL = wl.getRbl(wl.getDataByStationName("alser straße"));

  wl.getRealTimeDataByRbl(RBL);
  wl.on("change", () => {
    console.log(wl.realTimeData);
  });
} catch (e) {
  console.log(e);
}
