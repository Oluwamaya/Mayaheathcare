import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { NextComponent } from './next/next.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , LandingComponent , NextComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'healthCare';
}
