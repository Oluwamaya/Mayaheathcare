import { CommonModule, JsonPipe, formatDate } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
interface Slot {
  startTime: string;
  endTime: string;
  flow: {
    startTime: string;
    endTime: string;
  };
}

@Component({
  selector: 'app-schedule-timing',
  standalone: true,
  imports: [ CommonModule , FormsModule , RouterModule, HttpClientModule ],
  templateUrl: './schedule-timing.component.html',
  styleUrl: './schedule-timing.component.css'
})
export class ScheduleTimingComponent {
  constructor(public http: HttpClient){}
  public userInfo : any = {}
  public fetchSchedule : any = []
  isSundayAvailable(): boolean {
    return this.fetchSchedule.some((sche : any) => sche.dow === 'Sunday');
}
isMondayAvailable(): boolean {
  return this.fetchSchedule.some((sche : any) => sche.dow === 'Monday');
}
isTuesdayAvailable(): boolean {
  return this.fetchSchedule.some((sche : any) => sche.dow === 'Tuesday');
}
isWednesdayAvailable(): boolean {
  return this.fetchSchedule.some((sche : any) => sche.dow === 'Wednesday');
}
isThursdayAvailable(): boolean {
  return this.fetchSchedule.some((sche : any) => sche.dow === 'Thursday');
}
isFridayAvailable(): boolean {
  return this.fetchSchedule.some((sche : any) => sche.dow === 'Friday');
}
isSaturdayAvailable(): boolean {
  return this.fetchSchedule.some((sche : any) => sche.dow === 'Saturday');
}


  ngOnInit() {
    this.getUserInfo();
    this.fetchScheduleData()
  }


  getUserInfo() {
    this.userInfo = JSON.parse(localStorage.getItem("docInfo")!) || {};
    console.log(this.userInfo);   
  }
  fetchScheduleData(): void {
    const doctorId =  this.userInfo.id;
    // Make a GET request to fetch schedule timing data
    this.http.get<any>(`http://localhost/healthbackend/doctorprofile/scheuleTime.php?doctorId=${doctorId}`)
    .subscribe(
      (response) => {
        // console.log('Schedule timing data:', response);
        this.fetchSchedule = response
        console.log(this.fetchSchedule);
        
        // Handle the received data as needed
      },
      (error) => {
        console.error('Error fetching schedule timing data:', error);
        // Handle errors
      }
    );
  }
  activeDay: string = 'monday'; // Default active day
  isViSun: boolean = false;
  isViMon: boolean = false;
  isViTues: boolean = false;
  isViWed: boolean = false;
  isViThurs: boolean = false;
  isViFri: boolean = false;
  isViSat: boolean = false;

  public sunslow: Slot[] = [];
  public monSlow: Slot[] = [];
  public TuesSlow: Slot[] = [];
  public wedSlow: Slot[] = [];
  public ThursSlow: Slot[] = [];
  public FriSlow: Slot[] = [];
  public satSlow: Slot[] = [];

  public flow: { startTime: string; endTime: string } = { startTime: '', endTime: '' };
  public mon: { startTime: string; endTime: string } = { startTime: '', endTime: '' };
  public tue: { startTime: string; endTime: string } = { startTime: '', endTime: '' };
  public wed: { startTime: string; endTime: string } = { startTime: '', endTime: '' };
  public thurs: { startTime: string; endTime: string } = { startTime: '', endTime: '' };
  public fri: { startTime: string; endTime: string } = { startTime: '', endTime: '' };
  public sat: { startTime: string; endTime: string } = { startTime: '', endTime: '' };


  subSun() {
    this.sunslow.forEach((slot) => {
      slot.flow = { ...this.flow };
    });

    const requestData = {
      day: 'Sunday', // or any identifier for the day
      slots: this.sunslow,
      id: this.userInfo.id
    };

    this.sendDataToBackend(requestData);
    this.hideMoSun()
  }

  subMon() {
    this.monSlow.forEach((slot) => {
    });

    const requestData = {
      day: 'Monday', // or any identifier for the day
      slots: this.monSlow,
      id: this.userInfo.id
    };

    this.sendDataToBackend(requestData);
    this.hideMoMon()
  }

  subTues() {
    this.TuesSlow.forEach((slot) => {
      slot.flow = { ...this.flow };
    });

    const requestData = {
      day: 'Tuesday', // or any identifier for the day
      slots: this.TuesSlow,
      id: this.userInfo.id
    };

    this.sendDataToBackend(requestData);
    this.hideMoTues()
  }

  subWed() {
    this.wedSlow.forEach((slot) => {
      slot.flow = { ...this.flow };
    });

    const requestData = {
      day: 'Wednesday', // or any identifier for the day
      slots: this.wedSlow,
      id: this.userInfo.id
    };

    this.sendDataToBackend(requestData);
    this.hideMoWed();
  }

  subThurs() {
    this.ThursSlow.forEach((slot) => {
      slot.flow = { ...this.flow };
    });

    const requestData = {
      day: 'Thursday', // or any identifier for the day
      slots: this.ThursSlow,
      id: this.userInfo.id
    };

    this.sendDataToBackend(requestData);
    this.hideMoThurs();
  }

  subFri() {
    this.FriSlow.forEach((slot) => {
      slot.flow = { ...this.flow };
    });

    const requestData = {
      day: 'Friday', // or any identifier for the day
      slots: this.FriSlow,
      id: this.userInfo.id
    };

    this.sendDataToBackend(requestData);
    this.hideMoFri()
  }
  

  subSat() {
    this.satSlow.forEach((slot) => {
      slot.flow = { ...this.flow };
    });

    const requestData = {
      day: 'Saturday', // or any identifier for the day
      slots: this.satSlow,
      id: this.userInfo.id
    };

    this.sendDataToBackend(requestData);
    this.hideMoSat()
  }

  del(id : number){
    const doctorId =  this.userInfo.id;
    console.log(id);
    
    const formData = new FormData() ; 
    formData.append("docId", doctorId);
    formData.append("id", id.toString()); 
    this.http.post<any>("http://localhost/healthbackend/doctorprofile/deleteTiming.php",formData).subscribe((response)=>{
  console.log(response);
  alert(response.message)
  window.location.reload()
  
    } , (error)=>{
      console.log(error);
      
    })
  }

  private sendDataToBackend(requestData: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<any>("http://localhost/healthbackend/doctorprofile/scheuleTime.php", requestData, { headers: headers })
      .subscribe(
        (response) => {
          console.log('Response from backend:', response);
          localStorage.setItem("days" , JSON.stringify(response.data))
          alert(response.message);
          window.location.reload()
        },
        (error) => {
          console.error('Error occurred:', error);
          alert('Error occurred while saving.');
        }
      );
  }

 

  setActiveDay(day: string) {
    this.activeDay = day;
  }

  toggleViMon(): void {
    this.isViMon = !this.isViMon;
  }

  hideMoMon(): void {
    this.isViMon = false;
  }

  toggleViTues(): void {
    this.isViTues = !this.isViTues;
  }

  hideMoTues(): void {
    this.isViTues = false;
  }

  toggleViWed(): void {
    this.isViWed = !this.isViWed;
  }

  hideMoWed(): void {
    this.isViWed = false;
  }

  toggleViThurs(): void {
    this.isViThurs = !this.isViThurs;
  }

  hideMoThurs(): void {
    this.isViThurs = false;
  }

  toggleViFri(): void {
    this.isViFri = !this.isViFri;
  }

  hideMoFri(): void {
    this.isViFri = false;
  }

  toggleViSat(): void {
    this.isViSat = !this.isViSat;
  }

  hideMoSat(): void {
    this.isViSat = false;
  }

  toggleViSun(): void {
    this.isViSun = !this.isViSun;
  }

  hideMoSun(): void {
    this.isViSun = false;
  }

  addMoreSun() {
    const lastSlot = this.sunslow[this.sunslow.length - 1];
    const newSlot: Slot = {
      startTime: lastSlot ? lastSlot.startTime : '',
      endTime: lastSlot ? lastSlot.endTime : '',
      flow: { ...this.flow }
    };
    this.sunslow.push(newSlot);
    

   
  
  }

addMoreMon() {
    const lastSlot = this.monSlow[this.monSlow.length - 1];
    const newSlot: Slot = {
      startTime: lastSlot ? lastSlot.startTime : '',
      endTime: lastSlot ? lastSlot.endTime : '',
      flow: { ...this.mon }
    };
    this.monSlow.push(newSlot);
}

addMoreTues() {
    const lastSlot = this.TuesSlow[this.TuesSlow.length - 1];
    const newSlot: Slot = {
      startTime: lastSlot ? lastSlot.startTime : '',
      endTime: lastSlot ? lastSlot.endTime : '',
      flow: { ...this.tue }
    };
    this.TuesSlow.push(newSlot);
}

addMoreWed() {
    const lastSlot = this.wedSlow[this.wedSlow.length - 1];
    const newSlot: Slot = {
      startTime: lastSlot ? lastSlot.startTime : '',
      endTime: lastSlot ? lastSlot.endTime : '',
      flow: { ...this.wed }
    };
    this.wedSlow.push(newSlot);
}

addMoreThurs() {
    const lastSlot = this.ThursSlow[this.ThursSlow.length - 1];
    const newSlot: Slot = {
      startTime: lastSlot ? lastSlot.startTime : '',
      endTime: lastSlot ? lastSlot.endTime : '',
      flow: { ...this.thurs }
    };
    this.ThursSlow.push(newSlot);
}

addMoreFri() {
    const lastSlot = this.FriSlow[this.FriSlow.length - 1];
    const newSlot: Slot = {
      startTime: lastSlot ? lastSlot.startTime : '',
      endTime: lastSlot ? lastSlot.endTime : '',
      flow: { ...this.fri }
    };
    this.FriSlow.push(newSlot);
}

addMoreSat() {
    const lastSlot = this.satSlow[this.satSlow.length - 1];
    const newSlot: Slot = {
      startTime: lastSlot ? lastSlot.startTime : '',
      endTime: lastSlot ? lastSlot.endTime : '',
      flow: { ...this.sat }
    };
    this.satSlow.push(newSlot);
}


}

