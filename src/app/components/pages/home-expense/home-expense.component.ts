import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormExpenseComponent } from '../../forms/form-expense/form-expense.component';

@Component({
  selector: 'app-home-expense',
  templateUrl: './home-expense.component.html',
  styleUrls: ['./home-expense.component.scss']
})
export class HomeExpenseComponent implements OnInit{
 
  flagClose = true;
  
  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {

  }

  onClickMenu(value:boolean){  

    this.flagClose = value;
  }

  openModal(){

    // console.log("Abrir modal");

    this.modalService.open(FormExpenseComponent, {
      size: "lg"
    });
  }

}
