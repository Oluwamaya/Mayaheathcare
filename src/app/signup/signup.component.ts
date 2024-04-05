import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule , FormsModule, HttpClientModule ,CommonModule , ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      number: ['', Validators.required],
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
    // const formData = new FormData()

// formData.append("firstName", this.firstName)
// formData.append("lastName", this.lastName)
// formData.append("number", this.number)
// formData.append("password", this.password)

// console.log(formData);
// }
    // Proceed with form submission logic
  }




//   constructor(private http:HttpClient ,private formBuilder: FormBuilder){}
//   public firstName = ""
//   public lastName = ""
//   public  number = ""
//   public password = ""

  


// register(){
//   if (this.firstName == "" || this.lastName == "" || this.number == "" || this.password) {
//     alert("Input field cannot be empty");
    
//   }else{
//   console.log(this.firstName,this.lastName,this.number, this.password);
  
// const formData = new FormData()

// formData.append("firstName", this.firstName)
// formData.append("lastName", this.lastName)
// formData.append("number", this.number)
// formData.append("password", this.password)

// console.log(formData);
// }
// }
}
