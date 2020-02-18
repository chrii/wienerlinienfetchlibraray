interface IStationObject {}

export class BuildScaffold {
  constructor(public haltestellen: any, public linien: any, steige: any) {}
  scaffold(): any {
    return this.haltestellen;
  }
}
