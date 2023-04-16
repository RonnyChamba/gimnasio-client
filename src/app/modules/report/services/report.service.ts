import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService  implements OnInit{

  pathApi = environment._APIUrl;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  
  }

  getFilterInscriptions(){
    return this.httpClient.get(`${this.pathApi}/reports/filters`);
  }

  generateReportInscriptions(){
    return  this.httpClient.get(`${this.pathApi}/reports/inscriptions`, { responseType: 'blob' })
  }


}
