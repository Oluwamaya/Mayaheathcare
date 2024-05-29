import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
interface ScheduleDay {
  date: string;
  displayDate: string;
  startTime: string;
  endTime: string;
}
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule, FormsModule],
  providers: [DatePipe],

  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  constructor(private http : HttpClient , private datePipe : DatePipe ,private actRoute : ActivatedRoute){}

  public dates: any[] = [] 
  // public days: any[] = [];
  public days: ScheduleDay[] = [];
    
  ngOnInit(){
    this.generateDays();

  }
  fetchDocSchedule(){
     const id = this.actRoute.snapshot.params['id']
     console.log(id);
     
  }
 
  
  generateDays() {
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      const displayDate = this.datePipe.transform(futureDate, 'EEE, dd MMM yyyy') || '';
      this.days.push({ date: futureDate.toISOString(), displayDate, startTime: '', endTime: '' });
    }
  }
  // Method to set schedule for a specific day
  setSchedule(dayIndex: number, schedule: string) {
    // this.days[dayIndex].schedule = schedule;
  }
}



