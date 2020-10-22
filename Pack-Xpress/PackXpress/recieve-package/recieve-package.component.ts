import { Component, OnInit } from '@angular/core';
import { IRecievePackage } from '../Interfaces/RecievePackage';
import { BranchOfficerserviceService } from '../services/branch-officerservice.service';
import { IRecieve } from '../Interfaces/Recieve';

@Component({
  selector: 'app-recieve-package',
  templateUrl: './recieve-package.component.html',
  styleUrls: ['./recieve-package.component.css']
})
export class RecievePackageComponent implements OnInit {

  role: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  officerLayout: boolean = false;
  userName: string;
  packages: IRecieve[];

  constructor(private _branchOfficerService: BranchOfficerserviceService) {
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
    this.recievePackage();
  }

  recievePackage() {
    this._branchOfficerService.recieveParcel().subscribe(
      x => { this.packages = x; },
      y => { console.log(y); alert("some error occured in recieve Package");},
      () => { console.log("Completed");}
    );
  }

  updateStatus(packageNumber: number, status: string) {
    if (status == "Picked Up") {
      this._branchOfficerService.generateAWBNumber(packageNumber).subscribe(
        x => { if (x) alert("ABW Number Generated"); else alert("AWB Number not generated"); },
        y => { console.log(y); alert("Some error in generating AWB Number"); },
        () => { console.log("Completed"); }
      );
    }
    console.log(packageNumber); console.log(status);
    this._branchOfficerService.updateStatus(packageNumber, status).subscribe(
      x => { if (x) { alert("Status Updated"); this.ngOnInit(); } else alert("Status not Updated"); },
      y => { console.log(y); alert("Some error Occured") },
      () => { console.log("Completed");}
    );
  }

}
