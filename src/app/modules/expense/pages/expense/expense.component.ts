import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormExpensesComponent } from '../../components/form-expenses/form-expenses.component';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilService } from 'src/app/services/util-service.service';
import { UtilExpenseService } from '../../services/util-expense.service';
import { PaginatorExpense } from 'src/app/core/models/page-render.model';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit{
 
  flagClose = true;
  formData: FormGroup;
  sumTotalPrice = 0
  sumTotalPriceByPage = 0
  typeExpenses:any = [];

  constructor(private modalService: NgbModal,    
    private utilService: UtilService,
    private utilExpenseService: UtilExpenseService,
    private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.createForm();
    this.typeExpenses = this.utilService.typeExpenses;
    // Agregar un elemento al inicio del arreglo
    this.typeExpenses.unshift({key:   "", value: "Todos"});
    this.onChangeListeners();

    this.expenseService.sumTotalPrice().subscribe(total =>{
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
        type: new FormControl("", []),
        valueSearch: new FormControl(null, []),
      });
  }
  private onChangeListeners() {
    
    this.formData.valueChanges.subscribe (data =>{
      // this.paramPaginator = data;

      this.utilExpenseService.getRefreshFilterTable.next(data as PaginatorExpense);

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
