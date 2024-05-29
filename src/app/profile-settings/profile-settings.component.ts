import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserServicesService } from '../services/user-services.service';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,RouterModule],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})
export class ProfileSettingsComponent {
  public userInfo: any = {};
  public newInfo: any = {};
  public selectedFile: File | null = null;

  constructor(public http: HttpClient , private router : Router, public userService: UserServicesService) {}

  ngOnInit() {
    this.getUserInfo();
  }
  
  getUserInfo() {
    this.userInfo = this.userService.getPatientInfo()
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

    // Append image file to the formData
    if (this.selectedFile) {
      formData.append("profilePic", this.selectedFile);
    }

    // Send formData to the backend
    this.http.post<any>('http://localhost/healthbackend/Dashboard/phpSettings.php', formData)
      .subscribe(
        response => {
          console.log("Profile updated successfully:", response);
          // Optionally, update userInfo with newInfo
          // and update localStorage with the updated userInfo
          this.userInfo = { ...this.newInfo };
          localStorage.setItem("allInfo", JSON.stringify(this.userInfo));
          this.router.navigate(['/patientDashboard'])
        },
        error => {
          console.error("Error updating profile:", error.error);
          // Handle error response here
        }
      );
  }
}
