import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CommonLayoutComponent } from './layout/common-layout/common-layout.component';
import { CustomerLayoutComponent } from './layout/customer-layout/customer-layout.component';
import { OfficerLayoutComponent } from './layout/officer-layout/officer-layout.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { CheckServiceAvailabilityComponent } from './check-service-availability/check-service-availability.component';
import { CustomerFeedbackComponent } from './customer-feedback/customer-feedback.component';
import { SchedulePickupComponent } from './schedule-pickup/schedule-pickup.component';
import { TrackShipmentComponent } from './track-shipment/track-shipment.component';
import { PackageHistoryComponent } from './package-history/package-history.component';
import { GetPackageComponent } from './get-package/get-package.component';
import { RecievePackageComponent } from './recieve-package/recieve-package.component';
import { AddResponseComponent } from './add-response/add-response.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent, LoginComponent, HomeComponent, CommonLayoutComponent, CustomerLayoutComponent, OfficerLayoutComponent , EditProfileComponent, UpdateAddressComponent,
    AddAddressComponent,
    CheckServiceAvailabilityComponent,
    CustomerFeedbackComponent,
    SchedulePickupComponent,
    TrackShipmentComponent,
    PackageHistoryComponent,
    GetPackageComponent,
    RecievePackageComponent,
    AddResponseComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
