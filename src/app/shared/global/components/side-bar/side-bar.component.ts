import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { TokenService } from 'src/app/modules/auth/service/token.service';
import { URL_ADMINISTRACION, URL_ASISTENCIA, URL_CLIENTES, URL_DEPORTE, URL_DIARIOS, URL_GASTOS, URL_INICIO, URL_INSCRIPCION, URL_REPORTE } from 'src/app/utils/constants-url-path';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  // Recibimos la variable open desde el padre pero le damos un alias flagClose
  @Input('open') flagClose: boolean;
  
  isAdmin = false;
  menuOptions:any[]= [];
  systemName = "GymApp";

  constructor(
    private renderer: Renderer2,
    private tokenService: TokenService,
    
    ) {

      this.isAdmin = this.tokenService.isAdmin();
      this.systemName = this.tokenService.getSystemName() || 'GymApp';
    }
  ngOnInit(): void {

    this.initMenuOptiosn();
  }

  private initMenuOptiosn (){

    if (!this.tokenService.isCliente()){

      
      const itemsMenu = this.tokenService.getMenuItems() || [];

      if (itemsMenu.length == 0) return;

      // ordernar por el campo position de menor a mayor
      itemsMenu.sort((a, b) => a.position - b.position);


      itemsMenu.forEach((item:any) => {
        this.menuOptions.push({
          title: item?.title,
          isAdmin: this.isAdmin,
          icon: item?.icon,
          url: item?.url,
          view: item?.visible,
        });
      });


      // this.menuOptions.push({
      //   title:'Inicio',
      //   isAdmin: this.isAdmin,
      //   icon:'fa-solid fa-house',
      //   url:URL_INICIO,
      //   view: true
      // });
      // this.menuOptions.push({
      //   title:'Administración',
      //   isAdmin: this.isAdmin? this.isAdmin: !this.isAdmin,
      //   icon: 'fa-solid fa-people-roof',
      //   url:URL_ADMINISTRACION,
      //   view: true
      // });
      // this.menuOptions.push({
      //   title:  "Clientes",
      //   isAdmin: this.isAdmin,
      //   icon:'fa-solid fa-users',
      //   url:URL_CLIENTES,
      //   view: true
      // });
      // this.menuOptions.push({
      //   title: "Membresías",
      //   isAdmin: this.isAdmin,
      //   icon:'bx bx-pie-chart-alt-2',
      //   url:URL_INSCRIPCION,
      //   view: true
      // });
      // this.menuOptions.push({
      //   title:'Asistencias',
      //   isAdmin: this.isAdmin,
      //   icon:'fa-solid fa-clipboard-user',
      //   url:URL_ASISTENCIA,
      //   view: true
  
      // });
      // this.menuOptions.push( {
      //   title: "Diarios",
      //   isAdmin: this.isAdmin,
      //   icon:'bx bx-compass',
      //   url:URL_DIARIOS,
      //   view: true
      // });
      // this.menuOptions.push({
      //   title: "Gastos",
      //   isAdmin: this.isAdmin,
      //   icon:'fa-solid fa-hand-holding-dollar',
      //   url:URL_GASTOS,
      //   view: true
      // });
    
      // this.menuOptions.push({
      //   title:"Reportes",
      //   isAdmin: this.isAdmin,
      //   icon:'fa-sharp fa-solid fa-file-export',
      //   url:URL_REPORTE,
      //   view: true
      // });
      // this.menuOptions.push(  
      // {title: "Deportiva",
      // isAdmin: this.isAdmin,
      // url:URL_DEPORTE,
      // icon:'fa-solid fa-dumbbell',
      // view: false,
      // options:[ 
      //   {name: 'Ejercicios', url:'/exercise'},
      //   // {name: 'Rutina', url:'/routine'},
      //   {name: 'Categorías', url:'/category'}]});
    }


  }

  showSubmenu(event: any){
  
    // Obtener el padre del padre del evento (Li es punto final)
    let liParent = event.target.parentElement.parentElement;
    
    // Obtener clases
    let listClass = [...liParent.classList];

    if (listClass.includes("showMenu")) {

      this.renderer.removeClass(liParent, "showMenu");

    }else  this.renderer.addClass(liParent, "showMenu");
  }

  get isCliente(){
    return this.tokenService.isCliente();
  }

  logout(){
    this.tokenService.logOut();
  }
  }
