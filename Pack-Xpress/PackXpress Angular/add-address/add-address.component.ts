import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  role: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  officerLayout: boolean = false;
  userName: string;
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

  ngOnInit() {
  }

  addAddress(form: NgForm) {
    this._userService.addAddress(this.userName, form.value.buildingNumber, form.value.streetNumber, form.value.locality,
      form.value.city, parseInt(form.value.pincode)).subscribe(
      x => {
        if (x) {
          alert("Address added successfully");
          var accept = confirm("Add another address?")
          if (accept)
            this._router.navigate(['/editProfile']);
          else
            this._router.navigate(['/home']);
        } else {
          alert("Address not Added");
         
        };
      },
      y => { console.log(y);alert("Some error occured");},
      () => { console.log("Completed");}
      );
  }

}
