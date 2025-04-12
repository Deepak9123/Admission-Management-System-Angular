import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enquiry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './enquiry-form.component.html',
  styleUrl: './enquiry-form.component.scss',
})
export class EnquiryFormComponent {
  enquiryForm: FormGroup;
  familyPhotoFile: File | null = null;
  passportPhotoFile: File | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.enquiryForm = this.fb.group({
      studentName: ['', Validators.required],
      adharCardNo: ['', Validators.required],
      std: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pwd: [''],
      appId: [''],
      udise: [''],
      classOfStudent: ['', Validators.required],
      fatherName: ['', Validators.required],
      fatherAdharCardNo: ['', Validators.required],
      fatherMobileNo: ['', Validators.required],
      fatherEmail: ['', [Validators.required, Validators.email]],
      motherName: ['', Validators.required],
      motherAdharCardNo: ['', Validators.required],
      motherMobileNo: ['', Validators.required],
      motherEmail: ['', [Validators.required, Validators.email]],
      placeOfBirth: ['', Validators.required],
      pincode: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      religion: ['', Validators.required],
      motherTongue: ['', Validators.required],
    });
  }

  onFamilyPhotoChange(event: any) {
    this.familyPhotoFile = event.target.files[0];
  }

  onPassportPhotoChange(event: any) {
    this.passportPhotoFile = event.target.files[0];
  }

  showError(message: string) {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: ['custom-snackbar-error'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    };
    this.snackBar.open(message, 'Close', config);
  }
  showScuess(message: string) {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: ['custom-snackbar-success'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    };
    this.snackBar.open(message, 'Close', config);
  }

  get f() {
    return this.enquiryForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.enquiryForm.invalid) {
      // this.showError('Please fill all required fields correctly.');
      return;
    }

    if (!this.familyPhotoFile) {
      this.showError('Please upload family photo correctly.');
      return;
    }

    if (!this.passportPhotoFile) {
      this.showError('Please upload passport photo correctly.');
      return;
    }
    const formData = new FormData();

    // Append form values
    Object.entries(this.enquiryForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    // Append files
    if (this.familyPhotoFile) {
      formData.append('familyPhoto', this.familyPhotoFile);
    }
    if (this.passportPhotoFile) {
      formData.append('passportPhoto', this.passportPhotoFile);
    }

    this.http.post('http://localhost:6600/AMS/enquiry/v1/submitForm', formData).subscribe({
      next: (res: any) => {
        if (res.status == 201) {
          this.showScuess('Form submitted successfully!');
          // this.enquiryForm.reset();
        } else {
          this.showError(res?.message);
        }
      },
      error: (err) => {
        const errorMsg = err.error?.message || 'Something went wrong. Try again.';
        this.showError(errorMsg);
      },
    });
  }
}
