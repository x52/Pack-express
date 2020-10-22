import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.css']
})
export class CustomerLayoutComponent implements OnInit {

  constructor(private _router: Router) { }

  logout() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userRole');
    this._router.navigate(['']);
  }

  ngOnInit() {
  }

}
