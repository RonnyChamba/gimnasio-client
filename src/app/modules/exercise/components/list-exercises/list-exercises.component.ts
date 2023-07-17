import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { ExerciseAttributes } from 'src/app/core/models/exercise.model';
import { PageRender } from 'src/app/core/models/page-render.model';
import { UtilExerciseService } from '../../services/util-exercise.service';
import { Subscription, catchError, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormExercisesComponent } from '../form-exercises/form-exercises.component';
import Swal from 'sweetalert2';
import { TokenService } from 'src/app/modules/auth/service/token.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-list-exercises',
  templateUrl: './list-exercises.component.html',
  styleUrls: ['./list-exercises.component.scss']
})
export class ListExercisesComponent implements OnInit, OnDestroy {

  isAdmin = false;

  urlImgDefault = "../../../../../assets//img//Default_pfp.svg.png";
  textAccordion = "más";
  listData: ExerciseAttributes[] = [];

  // este se pinta en el html
  listDataFilter: ExerciseAttributes[] = [];

  searchText = '';

  // this variable don't use by now
  page: PageRender;
  paramsFilter = { page: 0, size: 5 }

  private Subscripcion = new Subscription();

  constructor(
    private exerciseService: ExerciseService,
    private exerciseUtil: UtilExerciseService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private messageService: MessageService
  ) {
    this.isAdmin = this.tokenService.isAdmin();
  }

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

    this.messageService.loading(true);


    setTimeout(() => {

      this.exerciseService.findAll(this.paramsFilter.page,
        this.paramsFilter.size).pipe(

          tap((response: any) => {
            this.page = response.page;
            this.listData = response.data;
            console.log(this.listData);
            this.listDataFilter = this.listData;

            // this.toastr.success('Datos actualizados correctamente', 'Correcto');

            this.messageService.loading(false);

          }),
          catchError((error) => {
            console.log(error);

            this.messageService.loading(false);
            this.toastr.error('Error al cargar los datos', 'Error');


            return of(null);
          })

        ).subscribe();
    }, 200);


  }

  edit(ide: any) {


    // const target = event.target as HTMLElement;

    // El accordeon es un button por eso se valida que no sea un button para que no se abra el modal
    // if (target.tagName != 'BUTTON') {
    const ref = this.modalService.open(FormExercisesComponent, { size: "md", backdrop: 'static', keyboard: false});
    ref.componentInstance.idExercise = ide;

    // }



  }

  onSearchChange(event: Event) {

    if (this.searchText === '') {
      // Se hizo clic en la "x"  o el texto quedo vacio

      console.log('Se hizo clic en la "x"');
      this.listDataFilter = this.listData;
    } else {
      // El valor del input cambió
      console.log('El valor del input cambió');
      this.listDataFilter = this.listData.filter(item => item.name.includes(this.searchText));
    }


  }

  calcularIde(item: ExerciseAttributes): string {
    return `acordeon${item.ide}`;
  }

  delete(ide: any) {

    // el nombre ya existe en la bd, se pregunta si desea guardar de todos modos
    Swal.fire({
      title: '¿Eliminar Ejercicio?',
      text: ``,
      icon: 'question',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {


        this.exerciseService.delete(ide).pipe(

          tap((response: any) => {

            this.toastr.info('Ejercicio eliminado correctamente');
            this.findAll();
          }),
          catchError((error) => {
            console.log(error);

            this.toastr.error('Error al eliminar el ejercicio', 'Error');

            return of(null);
          })).subscribe();


      }
    });
  }

  openModal() {

    // console.log("Abrir modal");

    this.modalService.open(FormExercisesComponent, {
      size: "md"
    });
  }
}


