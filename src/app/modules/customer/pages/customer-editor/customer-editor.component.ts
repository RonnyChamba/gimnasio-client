import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TokenService } from 'src/app/modules/auth/service/token.service';
import { URL_CLIENTES, URL_INICIO } from 'src/app/utils/constants-url-path';
import { typeModel } from 'src/app/utils/types';

@Component({
  selector: 'app-customer-editor',
  templateUrl: './customer-editor.component.html',
  styleUrls: ['./customer-editor.component.scss']
})
export class CustomerEditorComponent implements OnInit{

  flagClose = true;
  ideCustomer: number;
  nombre: string;
  typePanel: typeModel = 'DATA';
  constructor(
    private activePath: ActivatedRoute,
    private tokenService: TokenService
    ){
      this.flagClose = this.tokenService.getFlagClose();
    }
  
  
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

    this.tokenService.setFlagClose(this.flagClose);
  }

  get getUrlClientes(){
    return URL_CLIENTES;
  }
  get getUrlInicio(){
    return URL_INICIO;
  }

  get isCliente(){
    return this.tokenService.isCliente();
  }

}
