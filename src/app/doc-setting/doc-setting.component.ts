import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-doc-setting',
  standalone: true,
  imports: [CommonModule , FormsModule, ReactiveFormsModule ,HttpClientModule, RouterModule , MatExpansionModule , MatFormFieldModule ,MatSelectModule],
  templateUrl: './doc-setting.component.html',
  styleUrl: './doc-setting.component.css'
})
export class DocSettingComponent {
  panelOpenState = false;
  
  public userInfo: any = {};
  public newInfo: any = {};
  public selectedFile: File | null = null;

  constructor(public http: HttpClient , private router : Router) {}

  ngOnInit() {
    this.getUserInfo();
  }


  getUserInfo() {
    this.userInfo = JSON.parse(localStorage.getItem("docInfo")!) || {};
    console.log(this.userInfo);
    this.newInfo = { ...this.userInfo };      
  }



  onFileChange(event: any) {
    const files = event.target.files;
    console.log(files);
    
    if (files.length > 0) {
      this.selectedFile = files[0];
      console.log(this.selectedFile);
      
    }
  }

  saveall() {
    console.log(this.newInfo);

    const formData = new FormData();

    // Append all input values to the formData
    formData.append("username", this.newInfo.username);
    formData.append("firstname", this.newInfo.firstname);
    formData.append("lastname", this.newInfo.lastname);
    formData.append("email", this.newInfo.email);
    formData.append("services", this.newInfo.services);
    formData.append("specialization", this.newInfo.specialization);
    formData.append("gender", this.newInfo.gender);
    formData.append("price", this.newInfo.price);
    formData.append("dob", this.newInfo.dob);
    formData.append("address", this.newInfo.address);
    formData.append("city", this.newInfo.city);
    formData.append("state", this.newInfo.state);
    formData.append("country", this.newInfo.country);
    formData.append("zipcode", this.newInfo.zipcode);
    formData.append("number", this.newInfo.number);
    formData.append("bio", this.newInfo.bio);
    formData.append("id", this.newInfo.id);

    // Append image file to the formData
    if (this.selectedFile) {
      formData.append("profilePic", this.selectedFile);
    }

    // Send formData to the backend
    this.http.post<any>('http://localhost/healthbackend/Dashboard/docSettings.php', formData)
      .subscribe(
        response => {
          console.log("Profile updated successfully:", response);
          // Optionally, update userInfo with newInfo
          // and update localStorage with the updated userInfo
          this.userInfo = { ...this.newInfo };
          localStorage.setItem("allInfo", JSON.stringify(this.userInfo));
          this.router.navigate(['/doctorProfile'])
        },
        error => {
          console.error("Error updating profile:", error.error);
          // Handle error response here
        }
      );
  }
}
