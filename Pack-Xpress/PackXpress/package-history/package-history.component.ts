import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { IPackageHistory } from '../Interfaces/PackageHistory';

@Component({
  selector: 'app-package-history',
  templateUrl: './package-history.component.html',
  styleUrls: ['./package-history.component.css']
})
export class PackageHistoryComponent implements OnInit {
  role: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  officerLayout: boolean = false;
  userName: string;
  packages: IPackageHistory[];

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
    this._userService.getPackageHistory(this.userName).subscribe(
      x => { this.packages = x; console.log(x); },
      y => { console.log(y); alert("Some error occured") },
      () => { console.log("Completed");}
    );
  }

}
