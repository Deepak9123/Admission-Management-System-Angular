import { Routes } from '@angular/router';
import { EnquiryFormComponent } from './enquiry-form/enquiry-form.component';

export const routes: Routes = [
  {
    path: 'AMS/enquiryForm',
    component: EnquiryFormComponent,
  },
  {
    path: '',
    redirectTo: 'AMS/enquiryForm',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'AMS/enquiryForm',
    pathMatch: 'full',
  },
];
