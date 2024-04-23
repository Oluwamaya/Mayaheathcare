import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-register',
  standalone: true,
  imports: [RouterModule,CommonModule,HttpClientModule,FormsModule ,ReactiveFormsModule],
  templateUrl: './doctor-register.component.html',
  styleUrl: './doctor-register.component.css'
})
export class DoctorRegisterComponent {
   signupForm : FormGroup;
  constructor(private http:HttpClient , private formBuilder: FormBuilder, public router: Router){
 
  this.signupForm = this.formBuilder.group({ 
      username: ['', Validators.required],
      number: ['', Validators.required],
      password: ['', Validators.required]
    });
  
  }
  registerF (){
    if (this.signupForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      this.signupForm.markAllAsTouched();
      return;
    }
    console.log(this.signupForm.value);
    
    const formData = new FormData()

    const username = this.signupForm.get('username')?.value;
    const number = this.signupForm.get('number')?.value;
    const password = this.signupForm.get('password')?.value;

    if (username !== undefined) {
      formData.append('username', username);
    }
    if (number !== undefined) {
      formData.append('number', number);
    }
    if (password !== undefined) {
      formData.append('password', password);
    }
    console.log('FormData:', formData);

    this.http.post<any>("", {formData}).subscribe((response)=>{
   console.log(response);
   
    },(error)=>{
      console.log(error);  
    })
  }

}
