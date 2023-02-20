import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormDailyComponent } from '../../forms/form-daily/form-daily.component';

@Component({
  selector: 'app-home-daily',
  templateUrl: './home-daily.component.html',
  styleUrls: ['./home-daily.component.scss']
})
export class HomeDailyComponent implements OnInit{
 
  flagClose = true;
  
  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {

  }

  onClickMenu(){  

    this.flagClose = !this.flagClose;
  }

  openModal(){


    this.modalService.open(FormDailyComponent, {
      size: "lg"
    });
  }


}
