import f from "./ogd-data/linien.json";
import d from "./ogd-data/steig-daten-mock.json";
import {
  WienerLinienFetchScaffold,
  IStationObject,
  ITrackObject,
  ILineObject
} from "./classes/WienerLinienFetchScaffold";
import g from "./ogd-data/haltestellen.json";

const wl = new WienerLinienFetchScaffold(
  g as IStationObject[],
  d as ITrackObject[],
  f as ILineObject[]
);

console.log(wl.getDataByStationName("vanswietenkaserne"));
