import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { catchError, of, tap } from 'rxjs';
import { TokenService } from 'src/app/modules/auth/service/token.service';
import { URL_ADMINISTRACION, URL_ASISTENCIA, URL_CLIENTES, URL_DIARIOS, URL_GASTOS, URL_INSCRIPCION } from 'src/app/utils/constants-url-path';
import { MenuService } from 'src/app/modules/configuracion/services/menu.service';
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
  imgBackground ='';
  private titlesModels = this.creatTitleModel();

  constructor(
    private homeService: HomeService,
    private tokenService: TokenService,
    private menuService: MenuService
    ){
      this.isAdmin = this.tokenService.isAdmin();
      this.flagClose = this.tokenService.getFlagClose();
    }
  
  
  ngOnInit(): void {
  
    this.countRegister();
    this.getDataForLogin();
  }

  onClickMenu(value:boolean){  
    this.flagClose = value;
    this.tokenService.setFlagClose(this.flagClose);
  }

  countRegister(){

    this.homeService.countRegister().pipe(
      tap((res:any) => {
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
        url: URL_CLIENTES,
      },
      {
        ide:'expense',
        title: 'Gastos',
        url: URL_GASTOS,
      },
      {
        ide:'daily',
        title: 'Diarios',
        url: URL_DIARIOS,
      },
      {
        ide:'user',
        title: 'Usuarios',
        url: URL_ADMINISTRACION,
      },
      {
        ide : 'inscription',
        title: 'Membresías',
        url: URL_INSCRIPCION,
      },
      {
        ide: 'modality',
        title: 'Modalidades',
        url: URL_ADMINISTRACION,
      },
      {
        ide: 'attendance',
        title: 'Asistencias',
        url: URL_ASISTENCIA,
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

  private getDataForLogin() {


    this.menuService.getDataForLogin().pipe(
      tap((resp: any) => {
        this.imgBackground = resp?.data?.pathImgBackground;
       
        // this.tokenService.setParamSystem(resp?.data);
      })
    ).subscribe();
  
  }
}
