import { Component, OnInit } from '@angular/core';
import { IAddress } from '../Interfaces/Address';
import { ICustomerDetails } from '../Interfaces/CustomerDetails';
import { IUser } from '../Interfaces/User';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IUsers } from '../Interfaces/Users';
import { ICustomer } from '../Interfaces/Customer';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  addressList: IAddress[];
  customerDetails: ICustomer;
  userDetails: IUsers;
  names: string;
  passwords: string
  emailIds: string;
  contactNumbers: number;
  role: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  officerLayout: boolean = false;
  userName: string;
  constructor(private _userService: UserServiceService, private _route: Router) {
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

  ngOnInit() {
    this._userService.getUserDetails(this.userName).subscribe(
      x => { this.userDetails = x;  this.emailIds = this.userDetails.emailId; this.passwords = this.userDetails.password; },
      y => { console.log(y); alert("Some error occured"); },
      () => { console.log("completed"); }
    );

    this._userService.getCustomerDetails(this.userName).subscribe(
      x => { this.customerDetails = x;  this.names = this.customerDetails.name; this.contactNumbers = this.customerDetails.contactNumber; },
      y => { console.log(y); alert("Some error occured"); },
      () => { console.log("Completed"); }
    );

    this._userService.getAddresses(this.userName).subscribe(
      responseData => { this.addressList = responseData; },
      y => { console.log(y); alert("Some error occured"); },
      () => { console.log("Completed"); }
    );
    
  }

  editProfile(form: NgForm) {
    this._userService.editProfile(form.value.name, form.value.emailId, form.value.password, parseInt(form.value.contactNumber)).subscribe(
      x => {
        if (x) {
          alert("Profile Updated successfully");
          this._route.navigate(['/home']);
        } else {
          alert("Update unsuccessfull");
        }
      },
      y => { console.log(y); alert("Some error occured"); },
      () => { console.log("Completed"); }
    );
    console.log(form.value.contactNumber);
  }

  editAddress(address: IAddress) {
    this._route.navigate(['updateAddress', address.addressId, address.buildingNo, address.streetNo, address.locality, address.city, address.pincode]);
  }

  addAddress() {
    this._route.navigate(['/addAddress']);
  }

  confirmRemove(address: IAddress) {
    var accept = confirm("Are you sure to delete address?")
    if (accept)
      this.deleteAddress(address);
    else
      this._route.navigate(['/editProfile']);
  }

  deleteAddress(address: IAddress) {
    this._userService.deleteAddress(address.addressId).subscribe(
      x => {
        if (x) {
          alert("Address deleted Successfully");
          this.ngOnInit();
        } else { alert("Address not deleted"); }
      },
      y => { console.log(y); alert("Some error occured");},
      () => { console.log("Completed"); }
    );
  }

}
