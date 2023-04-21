import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { ExerciseAttributes } from 'src/app/core/models/exercise.model';
import { PageRender } from 'src/app/core/models/page-render.model';
import { UtilExerciseService } from '../../services/util-exercise.service';
import { Subscription, catchError, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormExercisesComponent } from '../form-exercises/form-exercises.component';

@Component({
  selector: 'app-list-exercises',
  templateUrl: './list-exercises.component.html',
  styleUrls: ['./list-exercises.component.scss']
})
export class ListExercisesComponent implements OnInit, OnDestroy {

  textAccordion = "más";
  listData: ExerciseAttributes[] = [];

  @Output("size") size= new EventEmitter<number>();

  // this variable don't use by now
  page: PageRender;
  paramsFilter = { page: 0, size: 5 }

  private Subscripcion = new Subscription();

  constructor(
    private exerciseService: ExerciseService,
    private exerciseUtil: UtilExerciseService,
    private modalService: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.findAll();

    this.Subscripcion = this.exerciseUtil.refreshExerciseAsObservable().subscribe(
      response => {
        // this.listData = [];
        this.findAll();
      }
    )


  }

  ngOnDestroy(): void {
    this.Subscripcion.unsubscribe();
  }


  onAccordion() {

    this.textAccordion = this.textAccordion == 'más' ? 'menos' : 'más';
  }

  findAll() {
    this.exerciseService.findAll(this.paramsFilter.page,
      this.paramsFilter.size).pipe(

        tap((response: any) => {
          this.page = response.page;
          this.listData = response.data;
          this.size.emit(this.listData.length);
            
          // this.toastr.success('Datos actualizados correctamente', 'Correcto');

        }),
        catchError((error) => {
          console.log(error);
          
          this.toastr.error('Error al cargar los datos', 'Error');

           return of(null);
        })

      ).subscribe();
  }

  edit(ide: any){



    // alert(ide);

   const ref =    this.modalService.open(FormExercisesComponent, { size: "lg" });
    ref.componentInstance.idExercise = ide;

  }

  // Aquí puedes manejar el evento de scroll
  // onScroll = (event: any): void => {


  //   // get the current viewport height
  //   const viewportHeight = window.innerHeight;

  //   // get the current vertical position
  //   const scrollY = window.scrollY;

  //   const maxHeigthByPage = 50;
  //   const maxHeigth = maxHeigthByPage * this.page.totalPages;



  //   console.log(maxHeigth);

  //   if (scrollY >= 50 && scrollY <= 60) {
  //     // Aquí puedes manejar el evento de scroll

  //     const totalPage = this.page.totalPages;
  //     const currentPage = this.page.currentPage;

  //     if (currentPage < totalPage) {
  //       this.paramsFilter.page = this.paramsFilter.page + 1;
  //       this.findAll();
  //     }


  //   }


  //   console.log(window.innerHeight);
  //   console.log(window.scrollY);

  //   console.log('Evento de scroll detectado');
  // }



}
