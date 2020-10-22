export interface IPackageHistory {
  transactionId: number;
  awbno: number;
  fromBuildingNo: string;
  fromStreetNo: string;
  fromLocality: string;
  fromCity: string;
  fromPincode: number;
  toBuildingNo: string;
  toStreetNo: string;
  toLocality: string;
  toCity: string;
  toPincode: number;
  status: string;
}
