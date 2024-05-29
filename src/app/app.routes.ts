import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { SignupComponent } from './signup/signup.component';

import { PatientLoginComponent } from './patient-login/patient-login.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { DocSettingComponent } from './doc-setting/doc-setting.component';
import { ScheduleTimingComponent } from './schedule-timing/schedule-timing.component';
import { DocAppointmentComponent } from './doc-appointment/doc-appointment.component';
import { Component } from '@angular/core';
import { SearchDocComponent } from './search-doc/search-doc.component';
import { DoctordisplayinformationComponent } from './doctordisplayinformation/doctordisplayinformation.component';
import { BookingComponent } from './booking/booking.component';
// import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';

export const routes: Routes = [
    {path:"", pathMatch: "full", redirectTo: "Home"},
    {path:"Home" , component: LandingComponent},
    {path:"doctorProfile" , component: DoctorProfileComponent},
    {path: "register", component:SignupComponent},
    {path: "doctor-register", component: DoctorRegisterComponent },
    {path: "patient-login", component: PatientLoginComponent},
    {path: "doctor-login", component: DoctorLoginComponent},
    {path: "forgetPassword",component: ForgetPasswordComponent},
    {path: "patientDashboard",children:[
        {path : "", component: PatientdashboardComponent},
        {path: "profileSettings", component: ProfileSettingsComponent},
        {path: 'booking/:id', component: BookingComponent},
    //   {path: "booking",children: [
    //     {path : "", component: BookingComponent},
    //   ] },

      {path : "search-doctor", children: [
        {path : "", component:SearchDocComponent}, 
        { path: ':id', component: DoctordisplayinformationComponent },
        // {path: "sly/:id", component: DoctordisplayinformationComponent}
    ]},
    ]},
    {path: "doctor-settings", component: DocSettingComponent},
    {path : "schedule-timing" , component: ScheduleTimingComponent},
    {path : "doctors-appointment" , component: DocAppointmentComponent},
    
];
