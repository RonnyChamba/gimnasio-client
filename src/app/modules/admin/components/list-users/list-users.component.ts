import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from 'src/app/core/models/person-model';
import Swal from 'sweetalert2';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit{


  listData: UserModel[] = [];
  constructor(  private userService: UserService,) { }

  ngOnInit() {

    this.findall();
  }


  findall() {
  
    this.userService.findAll().subscribe((data) => {
      this.listData = data.data;
      console.log(this.listData);
    });
  
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
            console.log(data);

            alert("Registro actualizado correctamente");
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
