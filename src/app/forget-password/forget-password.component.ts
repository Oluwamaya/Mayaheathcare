import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  forgetPass : FormGroup
constructor(public formBuilder: FormBuilder, public http: HttpClient){
  this.forgetPass = this.formBuilder.group({
    number : [" ", Validators.required]
  }) 
}
 forgetPassword(){
  alert("baddest")
  if (this.forgetPass.invalid) {
    // Mark all fields as touched to trigger validation messages
    this.forgetPass.markAllAsTouched();
    return;
  }

  console.log('Form submitted successfully', this.forgetPass.value);
 }
}
