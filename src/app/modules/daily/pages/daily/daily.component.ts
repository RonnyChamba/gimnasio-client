import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupDailyComponent } from '../../components/group-daily/group-daily.component';
import { FormControl, FormGroup } from '@angular/forms';
import { DailyUtilService } from '../../util/daily-util.service';
import { PaginatorDiary } from 'src/app/core/models/page-render.model';
import { DailyService } from '../../services/daily.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit{
 
  flagClose = true;
  formData: FormGroup;
  sumTotalPrice = 0
  sumTotalPriceByPage = 0
  
  constructor(private modalService: NgbModal,
    private dailyUtilService: DailyUtilService,
    private dailyService: DailyService,) {}
  ngOnInit(): void {
    this.createForm();
    this.onChangeListeners();

    this.dailyService.sumTotalPrice().subscribe(total =>{
      this.sumTotalPrice = total;
    })


  }

  private createForm() {
    
    this.formData = new FormGroup(
      {
        size: new FormControl(5, []),
        dateBegin: new FormControl(null, []),
        typeUser: new FormControl("all", []),
        typePay: new FormControl("", []),
        dateEnd: new FormControl(null, []),
        valueSearch: new FormControl(null, []),
      });
  }

  private onChangeListeners() {
    
    this.formData.valueChanges.subscribe (data =>{
      // this.paramPaginator = data;

      this.dailyUtilService.getRefreshFilterTable.next(data as PaginatorDiary);

    })

    
  }

  
  onClickMenu(value:boolean){  

    this.flagClose = value;
  }

  openModal(){


    this.modalService.open(GroupDailyComponent, {
      size: "lg"
    });
  }


}
