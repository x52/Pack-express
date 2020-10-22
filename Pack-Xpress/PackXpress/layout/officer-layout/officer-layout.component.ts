import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-officer-layout',
  templateUrl: './officer-layout.component.html',
  styleUrls: ['./officer-layout.component.css']
})
export class OfficerLayoutComponent implements OnInit {

  constructor(private _router: Router) {
    console.log(sessionStorage.getItem('userRole'));
  }

  logout() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userRole');
    this._router.navigate(['']);
  }

  ngOnInit() {
  }

}
