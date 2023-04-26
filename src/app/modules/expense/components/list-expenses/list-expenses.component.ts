import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, catchError, of, tap } from 'rxjs';
import { ExpenseAttribute } from 'src/app/core/models/expense.model';
import { PageRender, PaginatorDiary } from 'src/app/core/models/page-render.model';
import { ExpenseService } from '../../services/expense.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormExpensesComponent } from '../form-expenses/form-expenses.component';
import Swal from 'sweetalert2';
import { UtilFiltersService } from 'src/app/shared/services/util-filters.service';
import { TransactionSrService } from 'src/app/services/transaction-sr.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.scss']
})
export class ListExpensesComponent implements OnInit, OnDestroy {


  listData: ExpenseAttribute[];
  pageRender: PageRender;
  sumaTotalElements = 0;

  @Output("sumaTotalByPage") sumaTotalByPage = new EventEmitter<number>;

  paramPaginator: PaginatorDiary = { page: 0, size: 5, typeUser: "", typeData: "EXPENSE" };

  // here add suscriptiones
  private subscription: Subscription = new Subscription();

  constructor(
    private expenseService: ExpenseService,
    private modalService: NgbModal,
    private transactionSrService: TransactionSrService,
    private toaster: ToastrService,
    private utilFiltersService: UtilFiltersService) { }

  ngOnInit(): void {

    this.findAll();
    this.addSubscription();
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

  private findAll() {

    this.paramPaginator.typeData = "EXPENSE";
    this.transactionSrService.findAll(this.paramPaginator).subscribe(resp => {

      this.listData = resp.data;
      this.pageRender = resp.page;

      this.sumaTotalByPage.next(resp.sumaTotalPageable as number);

      this.calculSumaRegister();
    })

  }
  private addSubscription() {

    this.subscription.add(

      this.utilFiltersService.eventFiltersObservable().subscribe(filtePro => {


        if (filtePro) {

          let currentPage = this.paramPaginator.page;



          this.paramPaginator = filtePro;
          this.paramPaginator.page = currentPage;
          this.changePage();

          // Cuando se actualizaa un registro o elimnar se manda a actualizar todos los registros
        } else this.findAll();
      }
      )

    );




  }
  changePage(numberPage?: number) {

    // console.log("Number  of  page" +  numberPage)
    this.paramPaginator.page = numberPage || numberPage == 0 ? numberPage : this.paramPaginator.page;


    /**
     * If there is a text input, begggin page 0
     * 
     * If sizePage is mayor que el total de elemntos, entonces que muestre los resultado en la pagina 0 
     */

    if (this.paramPaginator.valueSearch || (this.paramPaginator.size >= this.pageRender.totalElements)) this.paramPaginator.page = 0;

    this.findAll();
  }


  calculSumaRegister() {
    // console.log(this.pageRender)

    this.sumaTotalElements = 0;
    if (this.pageRender.last) {
      // Sumo el total de paginas menos 1 por el numero de elementos de cada pagina
      this.sumaTotalElements =
        (this.pageRender.currentPage - 1) * this.pageRender.numElementsByPage;

      // Le sumo el total de registros de la ultim pagina, ojo, que el ultimo registro no siempre tiene
      // La misma cantidad de registros que cada pagina
      this.sumaTotalElements += this.listData.length;
    } else {
      this.sumaTotalElements =
        this.pageRender.currentPage * this.pageRender.numElementsByPage;
    }
  }

  edit(ide: number) {
    // alert("hola " + ide)


    const references = this.modalService.open(FormExpensesComponent, {
      size: "md"
    });

    references.componentInstance.ideExpense = ide;
  }

  delete(ide: number) {

    Swal.fire({
      title: '¿Eliminar Registro?',

      text: `Seguro desea eliminar el registro`,
      icon: 'question',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',

      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {

        this.expenseService.delete(ide).pipe(
          tap(resp => {
            // console.log(resp);

            this.toaster.info("Registro eliminado exitosamente");
            this.findAll();

          }), catchError(err => {
            // console.log(err)
            this.toaster.error("Error al eliminar");
            return of(null);
          })
        ).subscribe();
      }
    });


  }

}
