import { WienerLinienFetchScaffold } from "./WienerLinienFetchScaffold";
import {
  IMasterDataObject,
  ITrackObject,
  ILineObject,
  IStationObject
} from "./Interfaces";

export class FetchFromJson extends WienerLinienFetchScaffold {
  masterData: IMasterDataObject[] = [];
  constructor(
    protected haltestellen: IStationObject[],
    protected steige: ITrackObject[],
    protected linien: ILineObject[]
  ) {
    super();
    this.haltestellen = haltestellen;
    this.steige = steige;
    this.linien = linien;
    this.masterData = this.createScaffold();
  }

  createScaffold(): IMasterDataObject[] {
    const scaffold = this.steige.map(
      (item: ITrackObject): IMasterDataObject[] => {
        const lineItem = this.linien.find(
          (i: ILineObject) => item.FK_LINIEN_ID === i.LINIEN_ID
        );
        const stationItem = this.haltestellen.find(
          (i: IStationObject) => item.FK_HALTESTELLEN_ID === i.HALTESTELLEN_ID
        );
        //@ts-ignore
        return { ...item, ...lineItem, ...stationItem } as IMasterDataObject;
      }
    );
    //@ts-ignore
    return scaffold;
  }
}
