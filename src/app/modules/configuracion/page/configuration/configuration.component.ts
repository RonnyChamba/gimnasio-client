import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/modules/auth/service/token.service';
import { FormMenuComponent } from '../../components/form-menu/form-menu.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {



   flagClose = true;

  // default users
  typePanel = "MENUS";
  isSuperAdmin = false;

  constructor(
    private modalService: NgbModal,
    private tokenService: TokenService
    ) {

      this.flagClose = this.tokenService.getFlagClose();
      this.isSuperAdmin = this.tokenService.isSuperAdmin();
     }
  ngOnInit(): void {


  }


  onClickMenu(value: boolean) {
  
    this.flagClose = value;
    this.tokenService.setFlagClose(this.flagClose);
  }


  openModal() {
    if (this.typePanel == "MENUS") {
      this.modalService.open(FormMenuComponent, {
        size: "md",
        backdrop: "static",
        keyboard: false,
      });
    } else {

      alert('no implementado');
      // this.modalService.open(FormModalityComponent, {
      //   size: "md",
      //   backdrop: "static",
      //   keyboard: false,
      // })

    }



  }



  

}
