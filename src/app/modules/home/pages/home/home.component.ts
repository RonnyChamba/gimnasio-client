import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  flagClose = true;
 
  constructor(private modalService: NgbModal){}
  ngOnInit(): void {
    
  }
  
  
  onClickMenu(value:boolean){  

    this.flagClose = value;
  }


  openModal(){

    console.log("Abrir modal");

    // this.modalService.open(FormCustomerComponent, {
    //   size: "lg"
    // });
  }
}
