import { Routes } from '@angular/router';
import { EnquiryFormComponent } from './enquiry-form/enquiry-form.component';

export const routes: Routes = [
  {
    path: 'enquiryForm',
    component: EnquiryFormComponent,
  },
  {
    path: '',
    component: EnquiryFormComponent,
  },
  {
    path: '**',
    component: EnquiryFormComponent,
  },
];
