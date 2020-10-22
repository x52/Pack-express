import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  role: string;
  userRole: string;
  errorMessage: string;
  message: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  officerLayout: boolean = false;
  showDiv: boolean = false;

  constructor(private _userService: UserServiceService, private _router: Router) {
    if (this.role == 'Customer')
      this.customerLayout = true;
    else {
      if (this.role == 'Branch Officer')
        this.officerLayout = true;
      else
        this.commonLayout = true;
    }
  }

  userLogin(form: NgForm) {
    this._userService.userLogin(form.value.emailId, form.value.password).subscribe(
      x => {
        this.userRole = x;
        if (this.userRole.toLocaleLowerCase() != "invalid credentials") {
          sessionStorage.setItem('userName', form.value.emailId);
          sessionStorage.setItem('userRole', x);
          this._router.navigate(['/home']);
        } else {
          this.message = "Try again with valid credentials";
          this.showDiv = true;
        }
      },
      y => { this.errorMessage = y; alert("Some error occured");},
      () => { console.log("Completed");}
    );
  }

  ngOnInit() {
  }

}
