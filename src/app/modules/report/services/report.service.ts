import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ReportParams } from 'src/app/core/models/page-render.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService implements OnInit {

  pathApi = environment._APIUrl;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

  }

  getFilterInscriptions() {
    return this.httpClient.get(`${this.pathApi}/reports/filters`);
  }

  generateReportInscriptions(params: ReportParams) {
    return this.httpClient.get(`${this.pathApi}/reports`,

      {
        params:
        {
          dateBegin: params.dateBegin || "",
          dateEnd: params.dateEnd || "",
          typeUser: params.typeUser,
          customer: params.customer || "",
          typePay: params.typePay || "",
          modality: params.modality || "",
          typeExpense: params.typeExpense || "",
          typeReport: params.typeReport || "",

        },
        responseType: 'blob'
      })
  }
}
