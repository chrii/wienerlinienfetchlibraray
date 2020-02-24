export interface IRblContainer {
  rbl: number[];
}

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
