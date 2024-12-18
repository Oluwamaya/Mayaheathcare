import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../services/user-services.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface Specialist {
  name: string;
  selected: boolean;
}

interface Doctor {
  firstname: string;
  lastname: string;
  email: string;
  specialization: string;
  profilePic: string;
  state: string;
  country: string;
  services: string;
  price: number;
  id : string;
}

@Component({
  selector: 'app-search-doc',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule ],
  templateUrl: './search-doc.component.html',
  styleUrls: ['./search-doc.component.css'] // Fixed typo from styleUrl to styleUrls
})
export class SearchDocComponent implements OnInit {
  constructor(private userService: UserServicesService, private http: HttpClient, private router: Router ) {}
  
  public doctorGender: string = "";
  public searchDoc: Doctor[] = []; 
  public searchPerformed: boolean = false;
  public noDoc: string = "";
  public userInfo: any = {};
  public showSeeAllButton: boolean = false;
  public selectedSpecialists: string[] = [];

  specialists: Specialist[] = [
    { name: 'Urology', selected: false },
    { name: 'Neurology', selected: false },
    { name: 'Dentist', selected: false },
    { name: 'Orthopedic', selected: false },
    { name: 'Cardiology', selected: false }
  ];
  
  ngOnInit() {
    this.getUserInfo();
    this.fetchAllDoctors();
    console.log(this.searchDoc);
    
  }
  
  getUserInfo() {
    this.userInfo = this.userService.getPatientInfo();
    console.log(this.userInfo);
  }

  showAllDoc() {
    this.fetchAllDoctors();
    this.showSeeAllButton = false;
    this.resetFormFields();
    this.searchPerformed = false
  }

  resetFormFields(): void {
    this.doctorGender = "";
    this.specialists.forEach(specialist => specialist.selected = false);
    this.updateSelectedSpecialists();
  }

  fetchAllDoctors(): void {
    this.http.post<Doctor[]>("http://localhost/healthbackend/patientProfile/searchDoctor.php", {}).subscribe(
      (response) => {
        console.log(response[0].profilePic);
        if (Array.isArray(response)) {
          this.searchDoc = response;
          this.noDoc = '';
        } else {
          this.noDoc = 'No doctors found';
          this.searchDoc = [];
        }
        // this.searchPerformed = false;
      },
      (error) => {
        console.log(error);
        this.noDoc = 'Failed to fetch doctors';
        // this.searchPerformed = true;
      }
    );
  }
  
  updateSelectedSpecialists() {
    this.selectedSpecialists = this.specialists
      .filter(specialist => specialist.selected)
      .map(specialist => specialist.name);
  }

  search() {
    console.log(this.selectedSpecialists);
    console.log(this.doctorGender);
    let formData = new FormData();
    formData.append("gender", this.doctorGender);
    formData.append("specialization", JSON.stringify(this.selectedSpecialists));

    this.http.post<any>("http://localhost/healthbackend/patientProfile/searchDoctor.php", formData).subscribe(
      (response) => {
        console.log(response[0].profilePic);
        if (Array.isArray(response)) {
          this.searchDoc = response;
          this.noDoc = '';
        } else if (response.message) {
          this.noDoc = response.message;
          this.searchDoc = [];
        } else {
          console.error("Unexpected response structure", response);
          this.searchDoc = [];
          this.noDoc = 'Unexpected response from the server';
        }
        this.searchPerformed = true;
        this.showSeeAllButton = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUniqueSpecializations(doctors: Doctor[]): string[] {
    const specializations = doctors.map(doc => doc.specialization);
    return Array.from(new Set(specializations));
  }
}
