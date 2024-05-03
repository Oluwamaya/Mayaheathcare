import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, public router: Router) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {
    if (this.signupForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      this.signupForm.markAllAsTouched();
      return;
    }

    console.log('Form submitted successfully', this.signupForm.value);

    // Create a new FormData object
    const formData = new FormData();

    // Extract form values safely using the safe navigation operator
    const firstName = this.signupForm.get('firstName')?.value;
    const lastName = this.signupForm.get('lastName')?.value;
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;

    // Append form values to FormData if they are not undefined
    if (firstName !== undefined) {
      formData.append('firstName', firstName);
    }
    if (lastName !== undefined) {
      formData.append('lastName', lastName);
    }
    if (email !== undefined) {
      formData.append('email', email);
    }
    if (password !== undefined) {
      formData.append('password', password);
    }

    console.log('FormData:', formData);

    this.http.post<any>("http://localhost/healthbackend/Authentication/patientsignup.php", formData).subscribe((res)=>{
    console.log(res);
    this.router.navigate(['/patient-login'])
  },(error)=>{
    console.log(error);
    
  })
  }
}

