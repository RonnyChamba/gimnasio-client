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
  systemName = "GymControl";
  companyName = "SoftFusion";
  companyLeyend = "Software Administrativo";

  constructor(
    private renderer: Renderer2,
    private tokenService: TokenService,
    
    ) {

      this.isAdmin = this.tokenService.isAdmin();
      this.systemName = this.tokenService.getSystemName() || 'GymControl';
      this.companyName = this.tokenService.getCompanyName() || 'SoftFusion';
      this.companyLeyend = this.tokenService.getCompanyLeyend() || 'Software Administrativo';
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
