import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-feedback',
  templateUrl: './customer-feedback.component.html',
  styleUrls: ['./customer-feedback.component.css']
})
export class CustomerFeedbackComponent implements OnInit {
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

  submitFeedback(form: NgForm) {

    this._userService.submitFeedback(this.userName, form.value.typedrop, form.value.comment).subscribe(
      x => {
        if (x) { alert("Comment added successfully"); this._router.navigate(['/home']); } else alert("Comment not added");  },
      y => { console.log(y); alert("some error Occured");},
      () => { console.log("Completed");}
    );
  }

  ngOnInit() {
  }

}
