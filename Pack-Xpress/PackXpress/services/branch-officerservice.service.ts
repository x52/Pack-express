import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IGetParcel } from '../Interfaces/GetParcel';
import { catchError } from 'rxjs/operators';
import { IRecievePackage } from '../Interfaces/RecievePackage';
import { IUpdateStatus } from '../Interfaces/UpdateStatus';
import { IComment } from '../Interfaces/Comment';
import { IBranchComments } from '../Interfaces/BranchComments';
import { IRecieve } from '../Interfaces/Recieve';
import { IResponse } from '../Interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class BranchOfficerserviceService {

  constructor(private _http: HttpClient) { }

  getParcel(shipmentType: string, length: number, breadth: number, height: number, weight: number, deliveryType: string, fromBuildingNumber: string,
    fromStreetNumber: string, fromLocality: string, fromCity: string, fromPincode: number, fromContactNumber: number, toBuildingNumber: string,
    toStreetNumber: string, toLocality: string, toCity: string, toPincode: number, toContactNumber: number, packing: number, itemCost: number):
    Observable<boolean> {
    let getParcelObj: IGetParcel;
    getParcelObj = {
      category: shipmentType, length: length, breadth: breadth, height: height, weight: weight, deliveryOption: deliveryType,
      fromBuildingNo: fromBuildingNumber, fromStreetNo: fromStreetNumber, fromLocality: fromLocality, fromCity: fromCity, fromPincode: fromPincode,
      fromContactNo: fromContactNumber, toBuildingNo: toBuildingNumber, toStreetNo: toStreetNumber, toLocality: toLocality,
      toCity: toCity, toPincode: toPincode, toContactNo: toContactNumber, packingRequired: packing, packageCost: itemCost, awbno: 0, packageNo: 0, pid: 0,
      rid: 0, insurance: 0, status: null
    };
    console.log(shipmentType); console.log(length); console.log(breadth); console.log(height);
    console.log(weight); console.log(deliveryType); console.log(fromBuildingNumber); console.log(fromStreetNumber);
    console.log(fromLocality); console.log(fromCity); console.log(fromPincode); console.log(fromContactNumber);
    console.log(toBuildingNumber); console.log(toStreetNumber); console.log(toLocality); console.log(toCity);
    console.log(toPincode); console.log(toContactNumber); console.log(packing); console.log(itemCost);
    let tempVar = this._http.post<boolean>('https://localhost:44346/api/User/GetPackage', getParcelObj).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  recieveParcel(): Observable<IRecieve[]> {
    let tempVar = this._http.get<IRecieve[]>('https://localhost:44346/api/User/RecievePackage').pipe(catchError(this.errorHandler));
    return tempVar;
  }

  updateStatus(packageNumber: number, status: string): Observable<boolean> {
    let statusObj: IUpdateStatus;
    statusObj = { packageNo: packageNumber, status: status };
    let tempVar = this._http.put<boolean>('https://localhost:44346/api/User/UpdateStatus', statusObj).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  getComments(): Observable<IResponse[]> {
    let tempvar = this._http.get<IResponse[]>('https://localhost:44346/api/User/GetComment').pipe(catchError(this.errorHandler));
    return tempvar;
  }

  submitResponse(applicationNo: number, emailId: string, commentType: string, comment: string, response: string): Observable<boolean> {
    let responseObj: IBranchComments;
    responseObj = { applicationNo: applicationNo, emailId: emailId, commentType: commentType, comment: comment, response: response };
    let tempVar = this._http.put<boolean>('https://localhost:44346/api/User/UpdateResponse', responseObj).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  generateAWBNumber(packageNumber: number): Observable<boolean> {
    let obj: IUpdateStatus;
    obj = { packageNo: packageNumber, status: null };
    return this._http.post<boolean>('https://localhost:44346/api/User/GenerateAWBNumber', obj).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }

}
