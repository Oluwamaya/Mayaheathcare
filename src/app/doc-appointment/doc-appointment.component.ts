import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doc-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doc-appointment.component.html',
  styleUrls: ['./doc-appointment.component.css'],
})
export class DocAppointmentComponent {
  activeDay: string = ''; // Default active day
  daysOfWeek: string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  appointments: { [key: string]: { startTime: string; endTime: string }[] } = {};

  constructor() {
    // Initialize appointments object for each day of the week
    this.daysOfWeek.forEach((day) => {
      const savedAppointments = JSON.parse(localStorage.getItem(day) || '[]');
      this.appointments[day] = savedAppointments;
    });
  }

  submitAppointment(day: string): void {
    // Save to localStorage
    localStorage.setItem(day, JSON.stringify(this.appointments[day]));
    alert(`Appointments for ${day} saved successfully!`);
  }

  setActiveDay(day: string): void {
    this.activeDay = day;
    console.log(this.activeDay);
    
  }

  addTimeSlot(day: string): void {
    const newTimeSlot = {
      startTime: '',
      endTime: '',
    };
    this.appointments[day].push(newTimeSlot);
    localStorage.setItem(day, JSON.stringify(this.appointments[day]));
  }

  deleteTimeSlot(day: string, index: number): void {
    this.appointments[day].splice(index, 1);
    localStorage.setItem(day, JSON.stringify(this.appointments[day]));
  }
}
