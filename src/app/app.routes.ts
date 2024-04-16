import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { SignupComponent } from './signup/signup.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';

export const routes: Routes = [
    {path:"", pathMatch: "full", redirectTo: "index"},
    {path:"index" , component: LandingComponent},
    {path:"doctorProfile" , component: DoctorProfileComponent},
    {path: "register", component:SignupComponent},
    {path: "doctor-register", component: DoctorRegisterComponent},
    {path: "patient-login", component: PatientLoginComponent},
    {path: "doctor-login", component: DoctorLoginComponent},
    {path: "forgetPassword",component: ForgetPasswordComponent},
    {path: "profileSettings", component: ProfileSettingsComponent},
    {path: "patientDashboard", component: PatientdashboardComponent}

];
