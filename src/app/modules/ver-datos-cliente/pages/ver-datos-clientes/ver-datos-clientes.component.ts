import { Component, OnInit } from '@angular/core';
import { typeModel } from 'src/app/utils/types';

@Component({
  selector: 'app-ver-datos-clientes',
  templateUrl: './ver-datos-clientes.component.html',
  styleUrls: ['./ver-datos-clientes.component.scss']
})
export class VerDatosClientesComponent implements OnInit {

  flagClose = true;
  ideCustomer: number;
  nombre: string;
  typePanel: typeModel = 'DATA';

  ngOnInit(): void {
    
  }

  onClickMenu(value:boolean){  

    this.flagClose = value;

    // this.tokenService.setFlagClose(this.flagClose);
  }

}
