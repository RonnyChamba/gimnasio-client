import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DailyService } from '../../services/daily.service';
import { typeModel } from 'src/app/utils/types';
import { FormDailiesComponent } from '../../components/form-dailies/form-dailies.component';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit{
 
  flagClose = true;
  typeModel: typeModel= "DAILY";

  sumTotalPrice = 0
  sumTotalPriceByPage = 0
  
  constructor(
    private modalService: NgbModal,
    private dailyService: DailyService,) {}
  ngOnInit(): void {

    this.dailyService.sumTotalPrice().subscribe(total =>{
      this.sumTotalPrice = total;
    })


  }


  
  onClickMenu(value:boolean){  

    this.flagClose = value;
  }

  openModal(){
    this.modalService.open(FormDailiesComponent, {
      size: "md"
    });
  }


}
