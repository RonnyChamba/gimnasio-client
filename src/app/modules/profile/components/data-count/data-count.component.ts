import { Component, OnInit } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { UserService } from 'src/app/modules/admin/services/user.service';

@Component({
  selector: 'app-data-count',
  templateUrl: './data-count.component.html',
  styleUrls: ['./data-count.component.scss']
})
export class DataCountComponent implements OnInit {

  listData: any[] = [];

  private titlesModels = this.creatTitleModel();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.gettingsData();

  }

  private gettingsData() {

    this.userService.countDataByUser()
      .pipe(
        tap((data: any) => {
          console.log("Data: ", data);

          this.createListData(data);

        }),
        catchError((err) => {
          console.log("Error: ", err);
          return of(null);
        })

      ).subscribe()

  }

  private createListData(data: any) {

    console.log(Object.keys(data));
    console.log(Object.values(data));


    Object.keys(data).forEach((key: any) => {
      console.log(key);
      console.log(data[key]);

      let model = this.titlesModels.find((model: any) => model.ide === key);

      this.listData.push(
        {
          ide: model?.ide,
          title: model?.title,
          count: data[key],
          url: model?.url
        });
      });
  }


  private creatTitleModel() {

    return [
      {
        ide: 'customer',
        title: 'Clientes',
        url: '/customer',
      },
      {
        ide: 'expense',
        title: 'Gastos',
        url: '/expense',
      },
      {
        ide: 'daily',
        title: 'Diarios',
        url: '/daily',
      },
      {
        ide: 'user',
        title: 'Usuarios',
        url: '/admin',
      },
      {
        ide: 'inscription',
        title: 'Membresias',
        url: '/inscription',
      },
      {
        ide: 'modality',
        title: 'Modalidades',
        url: '/admin',
      },
      {
        ide: 'attendance',
        title: 'Asistencias',
        url: '/attendance',
      },
      {
        ide: 'exercise',
        title: 'Ejercicios',
        url: '/exercise',
      },
      {
        ide: 'category',
        title: 'Categorias',
        url: '/category',
      },
    ]
  }

}
