import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  role: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  officerLayout: boolean = false;
  constructor(private _userService: UserServiceService, private _router: Router) {
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

  addUser(form: NgForm) {
    this._userService.addUser(form.value.name, form.value.emailId, form.value.password, parseInt(form.value.contactNumber), form.value.buildingNumber,
      form.value.streetNumber, form.value.locality, form.value.city, parseInt(form.value.pincode)).subscribe(
      x => {
        if (x) {
          alert("Registration successful");
          this._router.navigate(['/login']);
        } else {
          alert("Unable to register");
        }
      },
      y => { console.log(y); alert("Some error occured");},
      () => { console.log("Completed");}
        );
  }


}
