import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/core/models/person-model';
import Swal from 'sweetalert2';
import { Subscription, catchError, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/services/message.service';
import { UtilAdminService } from '../../services/util-admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormUserComponent } from '../form-user/form-user.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit, OnDestroy{


  listData: UserModel[] = [];

  subcriptionUser: Subscription = new Subscription();

  reduceColumns: boolean = false;
  constructor(
      private userService: UserService,
      private toaster: ToastrService,
      private utilAdminService: UtilAdminService,
      private messageService: MessageService,
      private modalService: NgbModal
      ) { }

  ngOnInit() {

    this.findAll();


    this.subcriptionUser = this.utilAdminService.getSubjectReloadTableUser.subscribe((data) => {
      if (data) {
        this.findAll();
      }
    }
    );
  }

  ngOnDestroy(): void {

    this.subcriptionUser.unsubscribe();
  }


  findAll() {
  
    this.messageService.loading(true);

    setTimeout(() => {

      this.userService.findAll().subscribe((data) => {
        this.listData = data.data;
        console.log(this.listData);
        this.messageService.loading(false);
      });
    }, 200);

    
  
  }


  edit(ide: any){

   const modalRef = this.modalService.open(FormUserComponent, {
      size: "md",
      backdrop: "static",
      keyboard: false,
    });

    modalRef.componentInstance.ideUserEdit = ide;
  }

  delete(ide: any){
    Swal.fire({
      title:  `¿Eliminar Usuario?` ,
      text: 'El usuario será eliminado permanentemente.',
      icon: 'question',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
       
        console.log("registro eliminar: " + ide)
        this.userService.updateStatusDelete(ide).pipe(

          tap((data) => {
            // console.log(data);
            this.toaster.success('Registro eliminado correctamente');
            this.findAll();
          }),
          catchError((err) => {

            this.toaster.error(`${err.error.message}`, 'Error');
            return of(null);
          })
  
        ).subscribe();
      }
    });
  }
  desactivar(ide: any, status: boolean){


    let title = status ? 'Desactivar' : 'Activar';

    let subtitle = status ? 'El usuario no podrá acceder al sistema hasta que sea activado nuevamente por un administrador'
    : 'El usuario podrá acceder al sistema nuevamente';

    console.log("registro desactivar: " + ide)

    Swal.fire({
      title:  `¿${title} Usuario?` ,
      text: subtitle,
      icon: 'question',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: title,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
       
        this.userService.updateStatus(ide).pipe(

          tap((data) => {
            // console.log(data);
            this.toaster.success('Registro actualizado correctamente');
            // alert("Registro actualizado correctamente");
            this.findAll();
          }),
          catchError((err) => {

            this.toaster.error(`${err.error.message}`, 'Error');

            // Swal.fire({
            //   title: 'Error',
            //   text: err.error.message,
            //   icon: 'error',
            // });
            return of(null);
          })
  
        ).subscribe();
      }
    });
  }

}
