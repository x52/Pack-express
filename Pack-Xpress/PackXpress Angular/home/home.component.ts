import { Component, OnInit } from '@angular/core';
import { IUser } from '../Interfaces/User';
import { UserServiceService } from '../services/user-service.service';
import { IAddress } from '../Interfaces/Address';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userDetails: IUser;
  address: IAddress[];
  role: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  officerLayout: boolean = false;
  userName: string;
  customerName: string;
  flag: boolean = false;
  constructor(private _userService: UserServiceService) {
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

    this._userService.getUserName(this.userName).subscribe(
      x => { this.customerName = x;  if (x != null) this.flag = true; }
    );
    
  }

}
