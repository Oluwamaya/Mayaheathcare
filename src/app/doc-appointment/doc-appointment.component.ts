import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doc-appointment',
  standalone: true,
  imports: [CommonModule , FormsModule ],
  templateUrl: './doc-appointment.component.html',
  styleUrl: './doc-appointment.component.css'
})
export class DocAppointmentComponent {
  activeDay: string = 'monday'; // Default active day
  daysOfWeek: string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  isViDays: { [key: string]: boolean } = {
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false
  };
  appointments: { [key: string]: { startTime: string, endTime: string }[] } = {};

  constructor() {
    // Initialize appointments object for each day of the week
    this.daysOfWeek.forEach(day => {
      const savedAppointments = JSON.parse(localStorage.getItem(day)!);
      this.appointments[day] = savedAppointments || [];
    });
  }

  submitAppointment(day: string) {
    alert('Appointment submitted successfully!');
    console.log(this.appointments[day]);
  }

  setActiveDay(day: string) {
    this.activeDay = day;
  }

  toggleVisibility(day: string): void {
    this.isViDays[day] = !this.isViDays[day];
  }

  hideModal(day: string): void {
    this.isViDays[day] = false;
  }

  addTimeSlot(day: string): void {
    if (!Array.isArray(this.appointments[day])) {
      this.appointments[day] = [];
    }

    const lastTimeSlot = this.appointments[day].length > 0 ? this.appointments[day][this.appointments[day].length - 1] : null;
    const newTimeSlot = {
      startTime: lastTimeSlot ? lastTimeSlot.startTime : '',
      endTime: lastTimeSlot ? lastTimeSlot.endTime : '',
      id: this.appointments[day].length + 1 
    };

    this.appointments[day].push(newTimeSlot);

    // Save the updated appointments to localStorage
    localStorage.setItem(day, JSON.stringify(this.appointments[day]));
  }
  // deleteTimeSlot(day: string, index: number): void {
  //   // Check if appointments[day] exists and index is valid
  //   if (this.appointments[day] && index >= 0 && index < this.appointments[day].length) {
  //     // Remove the time slot at the specified index
  //     this.appointments[day].splice(index, 1);
  //   }
  // }
  deleteTimeSlot(day: string, index: number): void {
    this.appointments[day].splice(index, 1);
  }
}




