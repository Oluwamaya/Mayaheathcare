import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-schedule-timing',
  standalone: true,
  imports: [ CommonModule , FormsModule , RouterModule, ],
  templateUrl: './schedule-timing.component.html',
  styleUrl: './schedule-timing.component.css'
})
export class ScheduleTimingComponent {
  activeDay: string = 'monday'; // Default active day
  isViSun : boolean = false
  isViMon : boolean = false
  isViTues : boolean = false
  isViWed : boolean = false
  isViThurs : boolean = false
  isViFri : boolean = false
  isViSat : boolean = false

  public slow : any = [];
 public flow : any = {};

 
 
 submtiMe(){
   const tryflow  = {...this.flow};
    this.slow.push(tryflow);
    alert("maya")
    console.log(this.slow  );
    
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
  }toggleViSun(): void {
    this.isViSun = !this.isViSun;
  }
  hideMoSun(): void {
    this.isViSun = false;
  }
}
