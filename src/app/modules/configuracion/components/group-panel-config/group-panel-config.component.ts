import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TokenService } from 'src/app/modules/auth/service/token.service';

@Component({
  selector: 'app-group-panel-config',
  templateUrl: './group-panel-config.component.html',
  styleUrls: ['./group-panel-config.component.scss']
})
export class GroupPanelConfigComponent implements OnInit {

  namePanelMenu = "MENUS";
  namePanelInformationCompany = "INFORMATION_COMPANY";

  typePanel = this.namePanelInformationCompany;
  @Output() typePanelChange = new EventEmitter<string>();
  isSuperAdmin = false;
  constructor(
    private tokenService: TokenService
  ) { 
    this.isSuperAdmin = this.tokenService.isSuperAdmin();

    // asignar el panel por defecto
   if (this.isSuperAdmin){
    this.typePanel = this.namePanelMenu;
   }else {
    this.typePanel = this.namePanelInformationCompany;
   }
  }
  ngOnInit(): void {
  }

  changeTypePanel(type: string) {

    if (this.typePanel != type) {
      this.typePanel = type;
      this.typePanelChange.emit(this.typePanel);
      
    } else console.log('no change');
  }

}
