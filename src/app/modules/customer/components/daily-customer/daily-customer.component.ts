import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Attendance } from 'src/app/core/models/attendance.model';
import { PageRender, PaginatorAttendance } from 'src/app/core/models/page-render.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-daily-customer',
  templateUrl: './daily-customer.component.html',
  styleUrls: ['./daily-customer.component.scss']
})
export class DailyCustomerComponent implements OnInit, OnDestroy {

  @Input() idCustomer: number;

  listData : Attendance[];
  pageRender: PageRender;
  sumaTotalElements = 0;
  paramPaginator: PaginatorAttendance =  { page: 0, size: 5, typeUser: "all"};
  formData: FormGroup;

    // here add suscriptiones
    private subscription: Subscription = new Subscription();

  constructor( private customerService: CustomerService) {}

  ngOnInit(): void {
    this.createForm();
    this.findAll();
    this.onChangeFilter(); 
    
    this.addSucriptions();
  }

  ngOnDestroy(): void {
    
    this.subscription.unsubscribe();
  }

  private addSucriptions(){

    this.subscription.add(

      this.customerService.getRefreshUpdateTableAttendanceObservable()
      .subscribe(resp=>{

        
        this.findAll();
      })
    )

  }

  private onChangeFilter(){
    this.formData.valueChanges.subscribe(resp =>{

      // let paginCurrent = this.paramPaginator.page;

      this.paramPaginator = resp as PaginatorAttendance;

      // Cuando cambia algun filtro, siempre que empieza por la pgina 0
      this.paramPaginator.page= 0;

      this.findAll();
    })

  }
  private findAll(){


    this.customerService.findAllAttendanceByCustomer(this.idCustomer, this.paramPaginator).subscribe(resp =>{
      
      console.log(resp)
      this.listData = resp.data;
      this.pageRender = resp.page;
      this.calculSumaRegister();
    })
  }

  private createForm() {
    
    this.formData = new FormGroup(
      {
        size: new FormControl(5, []),
        dateBegin: new FormControl(null, []),
        dateEnd: new FormControl(null, []),
        typeUser: new FormControl("all", []),
      });
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
  
  changePage(numberPage?: number) {

     // console.log("Number  of  page" +  numberPage)
     this.paramPaginator.page = numberPage || numberPage==0? numberPage: this.paramPaginator.page;
    this.findAll();
   }

   delete (ide: number){


    this.customerService.deleteAttendance(ide).subscribe(resp=>{
      console.log(resp)
    })

   }

}
