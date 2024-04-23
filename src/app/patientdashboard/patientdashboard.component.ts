import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-patientdashboard',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './patientdashboard.component.html',
  styleUrl: './patientdashboard.component.css'
})
export class PatientdashboardComponent {
  public token: string | null;
  public userInfo : any = {} ;
  constructor(private http: HttpClient, private router: Router){

    this.token = localStorage.getItem("userToken");
    console.log(this.token);
    this.getUserInfo();
  }
  getUserInfo() {
    if (!this.token) {
      console.error("Token is missing.");
      alert("Token expire please login again to continue")
      this.router.navigate(["/patient-login"])
      return;
    }

    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  console.log(headers);
  
    this.http.post<any>("http://localhost/healthbackend/Dashboard/pDashboard.php", {}, { headers }).subscribe(
      (response) => {
        console.log("User information:", response);
        localStorage.setItem("allInfo",JSON.stringify(response.user))
        this.userInfo = response.user
        console.log(this.userInfo.dob);
        
      },
      (error) => {
        console.error("Error fetching user information:", error);
        // Handle errors here
      }
    );
  }


}
