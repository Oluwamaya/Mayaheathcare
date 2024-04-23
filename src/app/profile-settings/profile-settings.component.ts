import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})
export class ProfileSettingsComponent {
  public userInfo: any = {}
  public lastname: string = "";
  public newInfo: any = {}

  constructor(public http: HttpClient) {
    //  this.newInfo = { ...this.userInfo } || {};

  }
  ngOnInit() {
    this.getUserInfo();
  }
  getUserInfo() {
    this.userInfo = JSON.parse(localStorage.getItem("allInfo")!)
    console.log(this.userInfo);
    this.newInfo = {...this.userInfo } 
    
  }
  saveall() {
    console.log(this.newInfo);
  
    const formData = new FormData();
  
    // Append all input values to the formData
    formData.append("firstname", this.newInfo.firstname);
    formData.append("lastname", this.newInfo.lastname);
    formData.append("email", this.newInfo.email);
    formData.append("dob", this.newInfo.dob);
    formData.append("address", this.newInfo.address);
    formData.append("city", this.newInfo.city);
    formData.append("state", this.newInfo.state);
    formData.append("country", this.newInfo.country);
    formData.append("zipcode", this.newInfo.zipcode);
    formData.append("number", this.newInfo.number);
    formData.append("bloodgroup", this.newInfo.bloodgroup);
    formData.append("id", this.newInfo.id);

  
    
  
    // Send formData to the backend
    this.http.post<any>('http://localhost/healthbackend/Dashboard/phpSettings.php', formData)
      .subscribe(
        response => {
          console.log("Profile updated successfully:", response);
          // Optionally, update userInfo with newInfo
          // and update localStorage with the updated userInfo
          this.userInfo = { ...this.newInfo };
          localStorage.setItem("allInfo", JSON.stringify(this.userInfo));
        },
        error => {
          console.error("Error updating profile:", error);
          // Handle error response here
        }
      );
  }
  
  // logVal() {
  //   console.log(this.userInfo.lastname);
  //   this.userInfo.lastname = this.lastname;
  //   console.log(this.userInfo.lastname);
    
  // }
}
