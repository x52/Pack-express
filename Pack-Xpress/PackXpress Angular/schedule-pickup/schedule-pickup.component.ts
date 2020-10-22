import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { IAddress } from '../Interfaces/Address';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-pickup',
  templateUrl: './schedule-pickup.component.html',
  styleUrls: ['./schedule-pickup.component.css']
})
export class SchedulePickupComponent implements OnInit {
  flag: boolean = false;
  showMsg: boolean = false;
  message: string;
  role: string;
  userName: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  officerLayout: boolean = false;
  deliveryCharge: number;
  addressList: IAddress[];
  packing: number = 0;
  saveForLater: number = 0;
  distance: number;
  srcPincode: number;
  weightApplicable: number = 0;
  volumeApplicable: number = 0;

  constructor(private _userService: UserServiceService, private _router: Router) {
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
    this.getAddress();
    this._userService.checkAvailability(parseInt(form.value.sourcePinCode), parseInt(form.value.destinationPinCode)).subscribe(
      x => { this.flag = x; if (x) this.message = "Service is available"; else this.message = "Service unavailable"; },
      y => { console.log(y); alert("Some error occured"); },
      () => { console.log("Completed"); }
    );
  }

  calculateApproximateCost(srcAddId: number, desPincode: string, weight: number, length: number, breadth: number, height: number, packingSerice: boolean) {
    if (packingSerice)
      this.packing = 1;
    if (weight > 5)
      this.weightApplicable = 1;
    if ((length * breadth * height) > 100)
      this.volumeApplicable = 1;
    for (var address of this.addressList) {
      if (address.addressId == srcAddId)
        this.srcPincode = address.pincode;
    }
    this.getDistance(parseInt(desPincode));
    this.deliveryCharge = 200 + (this.distance * 7) + (500 * this.packing) + (50 * weight * this.weightApplicable) + (50 * length * breadth * height * this.volumeApplicable)
  }

  getDistance(desPincode) {
    this._userService.getDistance(this.srcPincode, desPincode).subscribe(
      x => { this.distance = x; if (this.distance == null) console.log("Dsitance not assigned with x"); },
      y => { console.log(y); alert("Some error occured in getting distance"); },
      () => { console.log("Completed");}
    );
  }

  SchedulePickup(form: NgForm) {
    if (form.value.packing)
      this.packing = 1;
    else
      this.packing = 0;
    if (form.value.saveForLater)
      this.saveForLater = 1;
    console.log("length is : ",form.value.length);
    
    this._userService.schedulePickup(this.userName, form.value.ShipmentType, form.value.length, form.value.breadth, form.value.height,
      form.value.weight, form.value.Deliverytype,form.value.date, form.value.TimeSlot, form.value.pickupAddress, form.value.buildingNumber, form.value.streetNumber,
      form.value.locality, form.value.city, parseInt(form.value.pincode), form.value.contactNumber, this.packing, form.value.itemCost, this.saveForLater).subscribe(
      x => {
        if (x) { alert("Pickup Scheduled successfully"); this._router.navigate(['/home']); }  else alert("Pickup not scheduled"); },
      y => { console.log(y);},
      () => { console.log("Completed");}
      );
  }

  getAddress() {
    this._userService.getAddresses(this.userName).subscribe(
      x => { this.addressList = x; },
      y => { console.log(y); },
      () => { console.log("Completed"); }
    );
  }

  ngOnInit() {
    
  }

}
