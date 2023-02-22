import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupDailyComponent } from '../../components/group-daily/group-daily.component';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit{
 
  flagClose = true;
  
  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {

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
