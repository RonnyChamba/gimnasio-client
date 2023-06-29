import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/core/models/person-model';
import Swal from 'sweetalert2';
import { catchError, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit{


  listData: UserModel[] = [];
    
  reduceColumns: boolean = false;
  constructor(
      private userService: UserService,
      private toaster: ToastrService,
      private messageService: MessageService
      ) { }

  ngOnInit() {

    this.findall();
  }


  findall() {
  
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

  }
  delete(ide: any, status: boolean){


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
            this.findall();
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
