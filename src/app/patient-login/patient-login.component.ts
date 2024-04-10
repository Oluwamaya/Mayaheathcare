import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-login',
  standalone: true,
  imports: [RouterModule, FormsModule,CommonModule, ReactiveFormsModule ,HttpClientModule],
  templateUrl: './patient-login.component.html',
  styleUrl: './patient-login.component.css'
})
export class PatientLoginComponent {
  loginForm : FormGroup;
  constructor(public formBuilder: FormBuilder, private http: HttpClient){
    this.loginForm = this.formBuilder.group({
      number: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  login(){
    if (this.loginForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log('Form submitted successfully', this.loginForm.value);

    const formData = new FormData();
    const number = this.loginForm.get('number')?.value;
    const password = this.loginForm.get('password')?.value;

    if (number !== undefined) {
      formData.append('number', number);
    }
    if (password !== undefined) {
      formData.append('password', password);
    }

    console.log('FormData:', formData);
    this.http.post<any>("http://localhost/healthbackend/login.php", formData).subscribe((res)=>{
      console.log(res);
      },(error)=>{
        console.log(error);
        
      })
  }
}
