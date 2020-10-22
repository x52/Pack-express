import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IRegisterUser } from '../Interfaces/RegisterUser';
import { IUser } from '../Interfaces/User';
import { catchError } from 'rxjs/operators';
import { IAddress } from '../Interfaces/Address';
import { ICustomerDetails } from '../Interfaces/CustomerDetails';
import { IUsers } from '../Interfaces/Users';
import { ICustomer } from '../Interfaces/Customer';
import { ICheckAvailability } from '../Interfaces/checkAvailability';
import { IComment } from '../Interfaces/Comment';
import { ISchedulePickup } from '../Interfaces/SchedulePackage';
import { IPackageHistory } from '../Interfaces/PackageHistory';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private _http: HttpClient) { }

  addUser(name: string, emailId: string, password: string, contactNo: number,
    buildingNo: string, streetNo: string, locality: string, city: string, pincode: number): Observable<boolean> {
    let userObj: IRegisterUser;
    userObj = {
      name: name, emailId: emailId, password: password, contactNo: contactNo, buildingNo: buildingNo, streetNo: streetNo, locality: locality,
      city: city, pincode: pincode
    }
    let tempvar = this._http.post<boolean>('https://localhost:44346/api/User/RegisterUser', userObj).pipe(catchError(this.errorHandler));
    return tempvar;
  }

  userLogin(emailId: string, password: string): Observable<string> {
    let userObj: IUser;
    userObj = { emailId: emailId, password: password };
    console.log(emailId); console.log(password);
    let tempVar = this._http.post<string>('https://localhost:44346/api/User/ValidateUserCredentials',userObj).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  getAddresses(emailId: string): Observable<IAddress[]> {
    let params = "?emailId=" + emailId;
    let tempVar = this._http.get<IAddress[]>('https://localhost:44346/api/User/GetAddress' + params).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  getUserDetails(emailId: string): Observable<IUsers> {
    let params = "?emailId=" + emailId;
    let tempVar = this._http.get<IUsers>('https://localhost:44346/api/User/GetUser' + params).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  getCustomerDetails(emailId: string): Observable<ICustomer> {
    let params = "?emailId=" + emailId;
    let tempVar = this._http.get<ICustomer>('https://localhost:44346/api/User/GetCustomer' + params).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  updateAddress(addressId: number, buildingNo: string, streetNo: string, locality: string, city: string, pincode: number): Observable<boolean> {
    let addressObj: IAddress;
    addressObj = { addressId: addressId, buildingNo: buildingNo, streetNo: streetNo, locality: locality, city: city, pincode: pincode };
    let tempVar = this._http.put<boolean>('https://localhost:44346/api/User/UpdateAddress', addressObj).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  editProfile(name: string, emailId: string, password: string, contactNo: number): Observable<boolean> {
    let userObj: IRegisterUser;
    userObj = { name: name, emailId: emailId, password: password, contactNo: contactNo, buildingNo: null, streetNo: null, locality: null, city: null, pincode: 0 };
    let tempVar = this._http.put<boolean>('https://localhost:44346/api/User/UpdateProfile', userObj).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  addAddress(emailId: string, buildingNo: string, streetNo: string, locality: string, city: string, pincode: number): Observable<boolean> {
    let addressObj: IRegisterUser;
    addressObj = {
      emailId: emailId, buildingNo: buildingNo, streetNo: streetNo, locality: locality, city: city, pincode: pincode, password: null,
      name: null, contactNo:0
    }
    let tempVar = this._http.post<boolean>('https://localhost:44346/api/User/AddNewAddress', addressObj).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  deleteAddress(addressId: number): Observable<boolean> {
    let param = "?addressId=" + addressId.toString();
    let tempVar = this._http.delete<boolean>('https://localhost:44346/api/User/DeleteAddress' + param).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  checkAvailability(sourcePincode: number, destinationPincode: number): Observable<boolean> {
    let availability: ICheckAvailability;
    availability = { orderId: 0, pickUpPincode: sourcePincode, deliveryPincode: destinationPincode, distanceInKm: 0 };
    let tempVar = this._http.post<boolean>('https://localhost:44346/api/User/CheckServiceAvailability', availability).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  submitFeedback(emailId: string, commentType: string, comment: string): Observable<boolean> {  
    let commentObj: IComment;
    commentObj = { emailId: emailId, type: commentType, comment: comment, response: null, applicationNo: 0, email: null };
    let tempVar = this._http.post<boolean>('https://localhost:44346/api/User/CustomerCare', commentObj).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  schedulePickup(emailId: string, shipmentType: string, length: number, breadth: number, height: number, weight: number, deliveryType: string, date: Date,
    timeSlot: number, pickupAddressId: number, buildingNumber: string, streetNumber: string, locality: string, city: string, pincode: number,
    contactNumber: number, packing: number, itemCost: number, saveForLater: number): Observable<boolean> {
    

    let scheduleObj: ISchedulePickup;
    scheduleObj = {
      emailId: emailId, category: shipmentType, length: length, breadth: breadth, height: height, weight: weight,
      deliveryOption: deliveryType, date: date, timeSlot: timeSlot, pid: pickupAddressId, buildingNo: buildingNumber, streetNo: streetNumber,
      locality: locality, city: city, pincode: pincode, contactNo: contactNumber, packagingRequired: packing, packageCost: itemCost, scheduleState: saveForLater,
       status:null
    }
    let tempVar = this._http.post<boolean>('https://localhost:44346/api/User/SchedulePickUp', scheduleObj).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  getTrack(airwayBillNumber: number): Observable<IAddress> {
    let param = "?airwayBillNumber=" + airwayBillNumber.toString();
    let tempvar = this._http.get<IAddress>('https://localhost:44346/api/User/' + param).pipe(catchError(this.errorHandler));
    return tempvar;
  }

  getPackageHistory(emailId: string): Observable<IPackageHistory[]> {
    let param = "?emailId=" + emailId;
    console.log(emailId);
    let tempvar = this._http.get<IPackageHistory[]>('https://localhost:44346/api/User/PackageHistory' + param).pipe(catchError(this.errorHandler));
    return tempvar;
  }

  getDistance(sourcePincode: number, destinationPincode: number): Observable<number> {
    let param = "?pickUp=" + sourcePincode.toString() + "&delivery=" + destinationPincode.toString();
    return this._http.get<number>('https://localhost:44346/api/User/GetDistance' + param).pipe(catchError(this.errorHandler));
  }

  getUserName(emailId: string): Observable<string> {
    let param = "?emailId=" + emailId;
    return this._http.get<string>('https://localhost:44346/api/User/GetCustomerName' + param).pipe(catchError(this.errorHandler));
  }
  

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
