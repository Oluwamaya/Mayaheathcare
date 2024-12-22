import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-doctordisplayinformation',
  standalone: true,
  imports: [HttpClientModule, CommonModule ,RouterModule,MatTabsModule, MatIconModule],
  providers: [DatePipe],
  templateUrl: './doctordisplayinformation.component.html',
  styleUrl: './doctordisplayinformation.component.css'
})
export class DoctordisplayinformationComponent {
  constructor(private actRoute: ActivatedRoute , private http : HttpClient , private router : Router , 
    private datePipe : DatePipe
  ){}
  public docInfo : any = {}
  public formattedDate : any = ""

  ngOnInit(){ 
    this.formatDate()
    this.fetchDocInfo()
  }

  formatDate() {
    const date = new Date();
    this.formattedDate = this.datePipe.transform(date, 'd MMM yyyy');
    // this.formattedDate = `Today ${day}`;
    console.log(this.formattedDate); // Output: Today 5 Nov 2019
  }

 
  
  
  fetchDocInfo(){
    console.log(this.actRoute);
    const id = this.actRoute.snapshot.params['id']
    console.log(id)
    const baseUrl = "http://localhost/healthbackend/doctorProfile/displayDocInfo.php"; 
    const url = `${baseUrl}?id=${id}`;
    this.http.get<any>(url).subscribe((response)=>{
     console.log(response);
     this.docInfo = response
     console.log(this.docInfo);
     
    },((error)=>{
         console.log(error);    
    }))
  }
}
