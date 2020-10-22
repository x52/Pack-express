import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IAddress } from '../Interfaces/Address';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-track-shipment',
  templateUrl: './track-shipment.component.html',
  styleUrls: ['./track-shipment.component.css']
})
export class TrackShipmentComponent implements OnInit {
  role: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  officerLayout: boolean = false;
  userName: string;
  flag: boolean = false;
  showMsg: boolean = false;
  address: IAddress;
  airwayBillNumber: number;

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

  TrackShipment(form: NgForm) {
    this.airwayBillNumber = form.value.airwayBillNumber;
    this._userService.getTrack(form.value.airwayBillNumber).subscribe(
      x => { this.address = x; this.flag = true; if (x == null) this.showMsg = true; },
      y => { console.log(y); alert("Some error occured");},
      () => { console.log("Completed");}
    );
  }

  ngOnInit() {
  }

}
