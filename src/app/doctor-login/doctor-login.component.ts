import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-login',
  standalone: true,
  imports: [RouterModule ,FormsModule, CommonModule, HttpClientModule ,ReactiveFormsModule],
  templateUrl: './doctor-login.component.html',
  styleUrl: './doctor-login.component.css'
})
export class DoctorLoginComponent {
  loginForm : FormGroup
  constructor(private http: HttpClient , private router :Router , private formBuilder : FormBuilder){
    this.loginForm = formBuilder.group({
       number : ["" , Validators.required],
       password : ["" , Validators.required]
    });
  }

  docLogin(){
    if (this.loginForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      this.loginForm.markAllAsTouched();
      return;
    }
    console.log('Form submitted successfully', this.loginForm.value);
    const formData = new FormData()
    const number = this.loginForm.get('number')?.value;
    const password = this.loginForm.get('password')?.value;
    
    if (number !== undefined) {
      formData.append('number', number);
    }
    if (password !== undefined) {
      formData.append('password', password);
    }
    this.http.post<any>("http://localhost/healthbackend/Authentication/docLogin.php", formData).subscribe((response)=>{
      console.log(response);
      alert("Welcome " +  response.user.username)
      localStorage.setItem("docToken" , response.user.token)
      this.router.navigate(["/doctorProfile"])
    }, (error)=>{
      console.log(error);
      alert(error.error.message)
      
    })
  }

}
