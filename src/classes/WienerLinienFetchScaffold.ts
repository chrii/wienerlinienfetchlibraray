import {
  IStationObject,
  ITrackObject,
  ILineObject,
  IMasterDataObject
} from "./Interfaces";

export abstract class WienerLinienFetchScaffold {
  protected abstract masterData: IMasterDataObject[] = [];
  protected abstract haltestellen: IStationObject[] = [];
  protected abstract steige: ITrackObject[] = [];
  protected abstract linien: ILineObject[] = [];
  abstract createScaffold(): IMasterDataObject[];

  constructor() {
    //this.masterData = this.createScaffold();
  }

  get getAllData(): IMasterDataObject[] {
    return this.masterData;
  }

  protected sanitizeString = (str: string): string =>
    str.replace(/\s|\,|\-|\.|\//g, "").toLowerCase();

  getDataByStationName(stationName: string): IMasterDataObject[] {
    const formattedStationName = this.sanitizeString(stationName);
    const filterStations = this.masterData.filter(
      (item: IMasterDataObject): any => {
        return this.sanitizeString(item.NAME) === formattedStationName;
      }
    );
    if (filterStations.length === 0) {
      throw new Error("Nothing found");
    }
    return filterStations;
  }

  removeWienSurroundings(): void {
    this.masterData.filter((item: IMasterDataObject) => {
      return item.GEMEINDE === "Wien";
    });
  }

  getMetroData(line: string, direction: string): IMasterDataObject[] {
    const newMasterData = this.masterData.filter((item: IMasterDataObject) => {
      const unclampDirection = item.STEIG.toString().split("-");
      //console.log(unclampDirection[0] === "U6");
      if (direction !== "both") {
        return (
          unclampDirection[1] === direction && unclampDirection[0] === line
        );
      } else {
        return unclampDirection[0] === line;
      }
    });
    if (newMasterData.length === 0) {
      throw new Error("There are no entries found");
    } else {
      return newMasterData;
    }
  }
  getRbl(input: IMasterDataObject[]): number[] {
    const filtered = input.map(
      (item: IMasterDataObject): number => item.RBL_NUMMER || 0
    );
    return filtered;
  }
}
