import { Component, OnInit } from '@angular/core';
import { ModalityService } from '../../services/modality.service';
import { Modality } from 'src/app/core/models/modality-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalityComponent } from '../form-modality/form-modality.component';
import Swal from 'sweetalert2';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-list-modality',
  templateUrl: './list-modality.component.html',
  styleUrls: ['./list-modality.component.scss']
})
export class ListModalityComponent  implements OnInit{

  listData: Modality[] = [];

  constructor(
    private modalityService: ModalityService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {

    this.findAll();
  }

  findAll() {
    
    this.modalityService.getModalities().subscribe((data: any) => {
      this.listData = data.data;
      console.log(data);
    });
  }

  edit(ide: any){

   const ref =    this.modalService.open(FormModalityComponent, {
      size: "md"
    })

    ref.componentInstance.ideModality = ide;
  }

  delete(ide: any) {


    Swal.fire({
      title:  `¿Eliminar Modalidad?` ,
      text: 'Esta seguro de eliminar la modalidad seleccionada, esta acción no se puede deshacer',
      icon: 'question',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
       
        this.modalityService.deleteModality(ide).pipe(

          tap((data) => {
            console.log(data);

            alert("Registro eliminado correctamente");
            // this.findall();
          }),
          catchError((err) => {
            Swal.fire({
              title: 'Error',
              text: err.error.message,
              icon: 'error',
            });
            return of(null);
          })
  
        ).subscribe();
      }
    });



  }
}
