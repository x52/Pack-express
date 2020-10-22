import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
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


const routes: Routes = [
  { path: 'signUp', component: SignUpComponent }, { path: 'login', component: LoginComponent }, { path: '', component: HomeComponent },
  { path: 'editProfile', component: EditProfileComponent }, { path: 'updateAddress', component: UpdateAddressComponent },
  { path: 'updateAddress/:addressId/:buildingNo/:streetNo/:locality/:city/:pincode', component: UpdateAddressComponent },
  { path: 'addAddress', component: AddAddressComponent }, { path: 'checkServiceAvailability', component: CheckServiceAvailabilityComponent },
  { path: 'customerFeedback', component: CustomerFeedbackComponent }, { path: 'schedulePickup', component: SchedulePickupComponent },
  { path: 'trackShipment', component: TrackShipmentComponent }, { path: 'packageHistory', component: PackageHistoryComponent },
  { path: 'getPackage', component: GetPackageComponent }, { path: 'recievePackage', component: RecievePackageComponent },
  { path: 'addResponse', component: AddResponseComponent },
  { path: '**', component: HomeComponent }
 ];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
