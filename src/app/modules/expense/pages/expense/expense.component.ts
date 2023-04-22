import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormExpensesComponent } from '../../components/form-expenses/form-expenses.component';
import { ExpenseService } from '../../services/expense.service';
import { typeModel } from 'src/app/utils/types';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit{
 
  flagClose = true;
  typeModel: typeModel= "EXPENSE";

  sumTotalPrice = 0
  sumTotalPriceByPage = 0


  constructor(
    private modalService: NgbModal,
    private expenseService: ExpenseService) {}

  ngOnInit(): void {
    
    this.expenseService.sumTotalPrice().subscribe(total =>{
      console.log("Total: ", total);
      this.sumTotalPrice = total;
    })

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
