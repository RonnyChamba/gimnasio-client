import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { TokenService } from 'src/app/modules/auth/service/token.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  // Recibimos la variable open desde el padre pero le damos un alias flagClose
  @Input('open') flagClose: boolean;
  
  isAdmin = false;

  menuOptions = new Map<string, any>;

  constructor(
    private renderer: Renderer2,
    private tokenService: TokenService,
    
    ) {

      this.isAdmin = this.tokenService.isAdmin();
    }
  ngOnInit(): void {

    this.initMenuOptiosn();
  }

  private initMenuOptiosn (){

    this.menuOptions.set("HOME", "Inicio");
    this.menuOptions.set("ATTENDANCE", "Asistencia");
    this.menuOptions.set("ADMIN", "Usuarios");
    this.menuOptions.set("INSCRIPTION", "Membresias");
    this.menuOptions.set("CUSTOMERS", "Clientes");
    this.menuOptions.set("EXPENSES", "Gastos");
    this.menuOptions.set("DAILIES", "Diarios");
    this.menuOptions.set("REPORTS", "Reportes");
    this.menuOptions.set("SPORTS",  
    {title: "Deportiva", 
    options:[ 
      {name: 'Ejercicios', url:'/exercise'},
      // {name: 'Rutina', url:'/routine'},
      {name: 'Categorias', url:'/category'}]});
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
  }
