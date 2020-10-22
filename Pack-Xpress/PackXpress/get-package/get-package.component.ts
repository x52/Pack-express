import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BranchOfficerserviceService } from '../services/branch-officerservice.service';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-package',
  templateUrl: './get-package.component.html',
  styleUrls: ['./get-package.component.css']
})
export class GetPackageComponent implements OnInit {
  role: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  officerLayout: boolean = false;
  userName: string;
  packing: number;
  weightApplicable: number = 0;
  volumeApplicable: number = 0;
  deliveryCharge: number;
  distance: number;
  flager: boolean = false;
  showMsg: boolean = false;
  flag: boolean = false;
  message: string;

  constructor(private _branchOfficerService: BranchOfficerserviceService, private _userService: UserServiceService, private _router: Router) {
    this.userName = sessionStorage.getItem('userName');
    this.role = sessionStorage.getItem('userRole');
    if (this.role == 'Customer')
      this.customerLayout = true;
    else {
      if (this.role == 'Branch Officer')
        this.officerLayout = true;
      else
        this.commonLayout = true;
    }
  }

  checkAvailability(form: NgForm) {
    this.showMsg = true;
    this._userService.checkAvailability(parseInt(form.value.sourcePinCode), parseInt(form.value.destinationPinCode)).subscribe(
      x => { this.flag = x; if (x) this.message = "Service is available"; else this.message = "Service unavailable"; },
      y => { console.log(y); alert("Some error occured"); },
      () => { console.log("Completed"); }
    );
  }

  calculateApproximateCost(srcPincode: string, desPincode: string, weight: number, length: number, breadth: number, height: number, packingSerice: boolean) {
    this.flager = true;
    if (packingSerice)
      this.packing = 1;
    if (weight > 5)
      this.weightApplicable = 1;
    if ((length * breadth * height) > 100)
      this.volumeApplicable = 1;
    
    this.getDistance(parseInt(srcPincode),parseInt(desPincode));
    this.deliveryCharge = 200 + (this.distance * 7) + (500 * this.packing) + (50 * weight * this.weightApplicable) + (50 * length * breadth * height * this.volumeApplicable)
  }

  getDistance(srcPincode,desPincode) {
    this._userService.getDistance(srcPincode, desPincode).subscribe(
      x => { this.distance = x; if (this.distance == null) console.log("Ditance not assigned with x"); },
      y => { console.log(y); alert("Some error occured in getting distance"); },
      () => { console.log("Completed"); }
    );
  }

  GetParcel(form: NgForm) {
    if (form.value.packing)
      this.packing = 1;
    else
      this.packing = 0;
    this._branchOfficerService.getParcel(form.value.ShipmentType, form.value.length, form.value.breadth, form.value.height,
      form.value.weight, form.value.Deliverytype,  form.value.fromBuildingNumber, form.value.fromStreetNumber,
      form.value.fromLocality, form.value.fromCity, parseInt(form.value.fromPincode), parseInt(form.value.fromContactNumber),
      form.value.toBuildingNumber, form.value.toStreetNumber,
      form.value.toLocality, form.value.toCity, parseInt(form.value.toPincode), parseInt(form.value.toContactNumber),
      this.packing, form.value.itemCost).subscribe(
      x => {
        if (x) { alert("Get Parcel Successfull"); this._router.navigate(['/home']); } else alert("Get Parcel Unuccessfull"); },
        y => { console.log(y); },
        () => { console.log("Completed"); }
    );
 
  }

  ngOnInit() {
  }

}
