import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nab-side-bar',
  templateUrl: './nab-side-bar.component.html',
  styleUrls: ['./nab-side-bar.component.scss'],
})
export class NabSideBarComponent implements OnInit {

  // Recibimos la variable open desde el padre pero le damos un alias flagClose
  @Input('open') flagClose: boolean;
  

  menuOptions = new Map<string, any>;

  constructor(private renderer: Renderer2) {}
  ngOnInit(): void {

    this.initMenuOptiosn();
  }

  private initMenuOptiosn (){

    this.menuOptions.set("HOME", "Home");
    this.menuOptions.set("CUSTOMERS", "Clientes");
    this.menuOptions.set("EXPENSES", "Gastos");
    this.menuOptions.set("DAILIES", "Diarios");
    this.menuOptions.set("SPORTS",  
    {title: "Deportiva", 
    options:[ 
      {name: 'Ejercicios', url:'/exercise'},
      {name: 'Rutina', url:'/routine'},
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
