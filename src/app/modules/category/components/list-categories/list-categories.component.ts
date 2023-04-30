import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryAttribute } from 'src/app/core/models/category.model';
import { PageRender, PaginatorDiary } from 'src/app/core/models/page-render.model';
import { CategoryService } from '../../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { FormCategoryComponent } from '../form-category/form-category.component';
import Swal from 'sweetalert2';
import { UtilCategoryService } from '../../services/util-category.service';
import { UtilFiltersService } from 'src/app/shared/services/util-filters.service';
import { TokenService } from 'src/app/modules/auth/service/token.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent  implements OnInit, OnDestroy {

  listData: CategoryAttribute[];
  pageRender: PageRender;
  sumaTotalElements = 0;

  isAdmin = false;

    // here add suscriptiones
    private subscription: Subscription = new Subscription();

  
  // El parametro typeUser , aqui no afwca en nada
  paramPaginator: PaginatorDiary = { page: 0, size: 5, typeUser: "all", typeData: "CATEGORY" };

  constructor(private categoryService: CategoryService,
    private modalService: NgbModal,
    private utilCateService: UtilCategoryService,
    private utilFiltersService: UtilFiltersService,
    private tokenService: TokenService
    ) { 
      this.isAdmin = this.tokenService.isAdmin();
    }
    

  ngOnInit(): void {

    this.findAll();
    this.addSubscription();
  }
  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

  
  private findAll(){

    this.categoryService.findAll( this.paramPaginator).subscribe(resp =>{
      console.log(resp)
      
      this.listData = resp.data;
      this.pageRender = resp.page;

      this.calculSumaRegister();
    })

  }

  private addSubscription() {

    this.subscription.add(
      this.utilFiltersService.eventFiltersObservable().subscribe(resp => {
        console.log(resp)
        this.paramPaginator = resp;
        this.paramPaginator.page = 0;
        this.changePage();
      })
    )
  }

  changePage(numberPage?: number) {
    
    // console.log("Number  of  page" +  numberPage)
    this.paramPaginator.page = numberPage || numberPage==0? numberPage: this.paramPaginator.page;

    
    /**
     * If there is a text input, begggin page 0
     * 
     * If sizePage is mayor que el total de elemntos, entonces que muestre los resultado en la pagina 0 
     */
    
    if (this.paramPaginator.valueSearch || (this.paramPaginator.size>= this.pageRender.totalElements)) this.paramPaginator.page =0;

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
 

    const references =   this.modalService.open(FormCategoryComponent, {
      size: "md"
    });

    references.componentInstance.ideCategory = ide;
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
      
        this.categoryService.delete(ide).subscribe(resp =>{

         alert("eliminado con eexito, falta actualiza la tabla")
        })
      }
    });
  
 
  }
}
