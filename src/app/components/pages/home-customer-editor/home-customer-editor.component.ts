import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home-customer-editor',
  templateUrl: './home-customer-editor.component.html',
  styleUrls: ['./home-customer-editor.component.scss']
})
export class HomeCustomerEditorComponent implements OnInit{

  flagClose = true;
  ideCustomeer  = null;

  constructor(private rutaActiva: ActivatedRoute){}
  
  ngOnInit(): void {
    
    this.ideCustomeer =  this.rutaActiva.snapshot.params['ideCustomer'];
    console.log(`Id Customer get : ${this.ideCustomeer}`);

    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.ideCustomeer =  params['ideCustomer'];
      }
    );
  }
  
  
  onClickMenu(value:boolean){  

    this.flagClose = value;
  }


  // openModal(){

  //   console.log("Abrir modal");

  //   // this.modalService.open(FormCustomerComponent, {
  //   //   size: "lg"
  //   // });
  // }
}
