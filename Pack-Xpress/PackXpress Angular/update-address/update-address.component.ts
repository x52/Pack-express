import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit {

  addressId: number;
  buildingNo: string;
  streetNo: string;
  local: string;
  citi: string;
  pin: number;
  role: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  officerLayout: boolean = false;
  userName: string;

  constructor(private _route: ActivatedRoute, private _userService: UserServiceService, private _router: Router) {
    this.addressId = parseInt(this._route.snapshot.params['addressId']);
    this.buildingNo = this._route.snapshot.params['buildingNo'];
    this.streetNo =this. _route.snapshot.params['streetNo'];
    this.local = this._route.snapshot.params['locality'];
    this.citi =this. _route.snapshot.params['city'];
    this.pin = parseInt(this._route.snapshot.params['pincode']);

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

  updateAddress(form: NgForm) {
    this._userService.updateAddress(this.addressId, form.value.buildingNumber, form.value.streetNumber, form.value.locality, form.value.city, parseInt(form.value.pincode)).
      subscribe(
      x => {
        if (x) {
          alert("Address Updated Successfully");
          this._router.navigate(['/editProfile']);

        } else {
          alert("Address not Updated");
          this._router.navigate(['/editProfile']);
        }
      },
      y => { console.log(y); alert("Some error occured");},
      () => { console.log("Completed");}
    );
  }

  ngOnInit() {
  }

}
