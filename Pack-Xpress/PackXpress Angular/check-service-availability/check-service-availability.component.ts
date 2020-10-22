import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-check-service-availability',
  templateUrl: './check-service-availability.component.html',
  styleUrls: ['./check-service-availability.component.css']
})
export class CheckServiceAvailabilityComponent implements OnInit {
  role: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  officerLayout: boolean = false;
  flag: boolean = false;
  constructor(private _userService: UserServiceService) {
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
    this._userService.checkAvailability(parseInt(form.value.sourcePinCode), parseInt(form.value.destinationPinCode)).subscribe(
      x => { this.flag = x; if (x) alert("Service is Available"); else alert("Service unavailable"); },
      y => { console.log(y); alert("Some error occured"); },
      () => { console.log("Completed");}
    );
  }

  ngOnInit() {
  }

}
