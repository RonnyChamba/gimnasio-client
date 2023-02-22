import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormExpensesComponent } from '../../components/form-expenses/form-expenses.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit{
 
  flagClose = true;
  
  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {

  }

  onClickMenu(value:boolean){  

    this.flagClose = value;
  }

  openModal(){

    // console.log("Abrir modal");

    this.modalService.open(FormExpensesComponent, {
      size: "lg"
    });
  }

}
