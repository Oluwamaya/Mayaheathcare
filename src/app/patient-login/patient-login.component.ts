import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './patient-login.component.html',
  styleUrl: './patient-login.component.css'
})
export class PatientLoginComponent {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, public router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  login() {
    if (this.loginForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log('Form submitted successfully', this.loginForm.value);

    const formData = new FormData();
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (email !== undefined) {
      formData.append('email', email);
    }
    if (password !== undefined) {
      formData.append('password', password);
    }

    // console.log('FormData:', formData);
    this.http.post<any>("http://localhost/healthbackend/Authentication/patientLogin.php", formData).subscribe(
      (res) => {
        if (res.user) {
          console.log("Response from server:", res);
          alert(res.message + " " + res.user.lastname)
          localStorage.setItem("userToken", res.user.token)
          this.router.navigate(['/patientDashboard'])
        } else {
          console.log(res.message);
        }
        // Log the response
        // Handle the response here
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log("Unauthorized access. Please check your credentials.");
          alert("Unauthorized access. Please check your credentials.");
        } else {
          console.log("Error response from server:", error.error);
          alert("Error response from server: " + error.message);
        }
        // Log the error
      }
    );
  }
}
