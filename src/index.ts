import f from "./ogd-data/linien.json";
import d from "./ogd-data/steig-daten-mock.json";
import { WienerLinienFetchScaffold } from "./classes/WienerLinienFetchScaffold";
import g from "./ogd-data/haltestellen.json";
import {
  IStationObject,
  ITrackObject,
  ILineObject
} from "./classes/Interfaces";

const wl = new WienerLinienFetchScaffold(
  g as IStationObject[],
  d as ITrackObject[],
  f as ILineObject[]
);

try {
  console.log(wl.getDataByStationName("kaiserebersdorf"));
  console.log(wl.getRbl(wl.getDataByStationName("Simmering")));
} catch (e) {
  console.log(e);
}
