import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalityService } from '../../services/modality.service';
import { Modality } from 'src/app/core/models/modality-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalityComponent } from '../form-modality/form-modality.component';
import Swal from 'sweetalert2';
import { Subscription, catchError, of, tap } from 'rxjs';
import { UtilAdminService } from '../../services/util-admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-modality',
  templateUrl: './list-modality.component.html',
  styleUrls: ['./list-modality.component.scss'],
})
export class ListModalityComponent implements OnInit, OnDestroy {
  listData: Modality[] = [];

  private subscription = new Subscription();

  constructor(
    private modalityService: ModalityService,
    private admiUtil: UtilAdminService,
    private toater: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.findAll();
    this.addSubscription();
  }

  private addSubscription(): void {
    this.subscription.add(
      this.admiUtil.refresgListModality().subscribe((data) => {
        this.findAll();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  findAll() {
    this.modalityService.getModalities().subscribe((data: any) => {
      this.listData = data.data;
      console.log(data);
    });
  }

  edit(ide: any) {
    const ref = this.modalService.open(FormModalityComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });

    ref.componentInstance.ideModality = ide;
  }

  delete(ide: any) {
    Swal.fire({
      title: `¿Eliminar Modalidad?`,
      text: 'Esta seguro de eliminar la modalidad seleccionada, esta acción no se puede deshacer',
      icon: 'question',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.modalityService
          .deleteModality(ide)
          .pipe(
            tap((data) => {
              console.log(data);

              // alert("Registro eliminado correctamente");
              this.toater.success('Registro eliminado correctamente');
              this.findAll();
            }),
            catchError((err) => {
              this.toater.error('Ocurrio un error', 'Error');
              // Swal.fire({
              //   title: 'Error',
              //   text: err.error.message,
              //   icon: 'error',
              // });
              console.log(err);
              return of(null);
            })
          )
          .subscribe();
      }
    });
  }
}
