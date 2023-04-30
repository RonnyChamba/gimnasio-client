import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { catchError, of, tap } from 'rxjs';
import { TokenService } from 'src/app/modules/auth/service/token.service';
// import { TokenService } from 'src/app/modules/auth/service/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  flagClose = true;
  listData: any[] = [];

  isAdmin = false;
  private titlesModels = this.creatTitleModel();

  constructor(
    private homeService: HomeService,
    private tokenService: TokenService
    ){
      this.isAdmin = this.tokenService.isAdmin();
      this.flagClose = this.tokenService.getFlagClose();
    }
  
  
  ngOnInit(): void {
  
    this.countRegister();
  }

  onClickMenu(value:boolean){  
    this.flagClose = value;
    this.tokenService.setFlagClose(this.flagClose);
  }

  countRegister(){

    this.homeService.countRegister().pipe(
      tap((res:any) => {
        // console.log(res);

        this.createListData(res);


      }),
      catchError((err:any) => {
        console.log(err);
        return of(null);
      })
     
    ).subscribe();
  }

  private createListData(data: any[]){

    data.forEach((item:any) => {
      
      const key = Object.keys(item)[0];
      const count = Object.values(item)[0];

      let model = this.titlesModels.find((model:any) =>model.ide === key);

      // console.log(model);
      
      if (model?.ide =="user" && !this.isAdmin) return;


      this.listData.push(
        {
          ide: model?.ide,
          title: model?.title, 
          count, 
          url: model?.url});

          // console.log(this.listData);
    });

  }

  private  creatTitleModel(){
   
    return [
      {
        ide:'customer',
        title: 'Clientes',
        url: '/customer',
      },
      {
        ide:'expense',
        title: 'Gastos',
        url: '/expense',
      },
      {
        ide:'daily',
        title: 'Diarios',
        url: '/daily',
      },
      {
        ide:'user',
        title: 'Usuarios',
        url: '/admin',
      },
      {
        ide : 'inscription',
        title: 'Membresías',
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
