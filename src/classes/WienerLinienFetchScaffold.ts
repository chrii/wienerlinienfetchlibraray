export interface IStationObject {
  HALTESTELLEN_ID: number;
  TYP: string;
  DIVA: number;
  NAME: string;
  GEMEINDE: string;
  GEMEINDE_ID: number;
  WGS84_LAT: number;
  WGS84_LON: number;
  STAND: string;
}

export interface ITrackObject {
  STEIG_ID: number;
  FK_LINIEN_ID: number;
  FK_HALTESTELLEN_ID: number;
  RICHTUNG: string;
  REIHENFOLGE: number;
  RBL_NUMMER: number;
  BEREICH: number;
  STEIG: string;
  STEIG_WGS84_LAT: number;
  STEIG_WGS84_LON: number;
  STAND: string;
}

export interface ILineObject {
  LINIEN_ID: number;
  BEZEICHNUNG: number;
  REIHENFOLGE: number;
  ECHTZEIT: number;
  VERKEHRSMITTEL: string;
  STAND: string;
}

export interface IMasterDataObject {
  STEIG_ID: number;
  FK_LINIEN_ID: number;
  FK_HALTESTELLEN_ID: number;
  RICHTUNG: string;
  REIHENFOLGE: number;
  RBL_NUMMER: number;
  BEREICH: number;
  STEIG: string;
  STEIG_WGS84_LAT: number;
  STEIG_WGS84_LON: number;
  HALTESTELLEN_ID: number;
  TYP: string;
  DIVA: number;
  NAME: string;
  GEMEINDE: string;
  GEMEINDE_ID: number;
  WGS84_LAT: number;
  WGS84_LON: number;
  STAND: string;
  LINIEN_ID: number;
  BEZEICHNUNG: number;
  ECHTZEIT: number;
  VERKEHRSMITTEL: string;
}

export class WienerLinienFetchScaffold {
  masterData: IMasterDataObject[] = [];

  constructor(
    protected haltestellen: IStationObject[],
    protected steige: ITrackObject[],
    protected linien: ILineObject[]
  ) {
    this.masterData = this.createScaffold();
  }

  protected sanitizeString = (str: string): string =>
    str.replace(/\s|\,|\-/g, "").toLowerCase();

  getDataByStationName(stationName: string): IMasterDataObject[] {
    const formattedStationName = this.sanitizeString(stationName);
    const filterStations = this.masterData.filter(
      (item: IMasterDataObject): any => {
        return this.sanitizeString(item.NAME) === formattedStationName;
      }
    );
    return filterStations;
  }

  private createScaffold(): IMasterDataObject[] {
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
