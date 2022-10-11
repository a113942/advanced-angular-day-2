import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataStuffComponent } from './data-stuff.component';
import { RouterModule, Routes } from '@angular/router';
import { CrmComponent } from './components/crm/crm.component';
import { StoreModule } from '@ngrx/store';
import { featureName, reducers } from './state';
import { HttpClientModule } from '@angular/common/http';
import { CustomerEffects } from './state/effects/customer.effects';
import { EffectsModule } from '@ngrx/effects';
import { CustomersComponent } from './containers/customers/customers.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { AlertComponent, CoreUiModule } from '@ht/core-ui';
import { ModesComponent } from './containers/modes/modes.component';
import { SharedModule } from '@ht/shared';
import { DataStuffEffects } from './state/effects/data-stuff.effects';
const routes: Routes = [
  {
    // /data (this is because of the routing set up in app module)
    path: '',
    component: DataStuffComponent,
    children: [
      {
        path: 'modes',
        component: ModesComponent,
      },
      {
        // /data/crm
        path: 'crm',
        component: CustomersComponent,
        children: [
          {
            path: 'list',
            component: CustomerListComponent,
          },
          {
            path: 'details/:id',
            component: CustomerDetailsComponent,
          },
          {
            path: '**', // IF they dont specify, this is a cathall
            redirectTo: 'list',
          },
        ],
      },
    ],
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([
      CustomerEffects,
      DataStuffEffects,
    ]),
    AlertComponent,
    HttpClientModule,
    SharedModule,
    CoreUiModule,
  ],
  declarations: [
    DataStuffComponent,
    CrmComponent,
    CustomersComponent,
    CustomerListComponent,
    CustomerDetailsComponent,
    ModesComponent,
  ],
})
export class DataStuffModule {}
