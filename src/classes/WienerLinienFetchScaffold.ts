import { Eventing } from "./Eventing";
import axios, { AxiosPromise, AxiosResponse } from "axios";

import {
  IStationObject,
  ITrackObject,
  ILineObject,
  IMasterDataObject
} from "./Interfaces";

export abstract class WienerLinienFetchScaffold {
  private rblData = {};
  private getInfoChannel = {};

  public events: Eventing = new Eventing();
  private wlApiUrl: string = "https://www.wienerlinien.at/ogd_realtime";
  protected abstract masterData: IMasterDataObject[] = [];
  protected abstract haltestellen: IStationObject[] = [];
  protected abstract steige: ITrackObject[] = [];
  protected abstract linien: ILineObject[] = [];
  //This method must be executed in the constructor
  abstract createScaffold(): IMasterDataObject[];

  get getAllData(): IMasterDataObject[] {
    return this.masterData;
  }

  get realTimeData() {
    return this.rblData;
  }
  get infoChannel() {
    return this.getInfoChannel;
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

  get trigger() {
    return this.events.trigger;
  }

  get on() {
    return this.events.on;
  }
  getRealTimeDataByRbl = (rblData: number[]) => {
    let url = this.wlApiUrl + "/monitor?rbl=";
    rblData.forEach((item: number, index: number): void => {
      rblData.length !== index + 1
        ? (url += `${item.toString()},`)
        : (url += `${item.toString()}`);
    });
    return axios.get(url).then(response => {
      if (response.status === 200) {
        Object.assign(this.rblData, response.data.data.monitors);
        this.trigger("change");
      }
    });
  };
  getLiveInfo = async () => {
    const url = this.wlApiUrl + "/newsList";
    const response = await axios.get(url);
    if (response.status === 200) {
      this.getInfoChannel = response.data.data;
      this.trigger("change");
    }
  };
}
