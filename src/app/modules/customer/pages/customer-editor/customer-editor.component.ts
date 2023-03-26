import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-customer-editor',
  templateUrl: './customer-editor.component.html',
  styleUrls: ['./customer-editor.component.scss']
})
export class CustomerEditorComponent implements OnInit{

  flagClose = true;
  ideCustomer: number;
  nombre: string;
  constructor(private activePath: ActivatedRoute){}
  
  ngOnInit(): void {
    
    this.ideCustomer =  this.activePath.snapshot.params['ideCustomer'];
    // console.log(`Id Customer get : ${this.ideCustomer}`);

    this.activePath.params.subscribe(
      (params: Params) => {
        this.ideCustomer =  params['ideCustomer'];
      }
    );
  }
  
 
  
  onClickMenu(value:boolean){  

    this.flagClose = value;
  }

}
