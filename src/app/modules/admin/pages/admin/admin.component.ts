import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormUserComponent } from '../../components/form-user/form-user.component';
import { FormModalityComponent } from '../../components/form-modality/form-modality.component';
import { TokenService } from 'src/app/modules/auth/service/token.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  flagClose = true;

  // default users
  typePanel = true;

  constructor(
    private modalService: NgbModal,
    private tokenService: TokenService
    ) {

      this.flagClose = this.tokenService.getFlagClose();
     }
  ngOnInit(): void {


  }


  onClickMenu(value: boolean) {
  
    this.flagClose = value;
    this.tokenService.setFlagClose(this.flagClose);
  }


  openModal() {

    console.log("Abrir modal");

    if (this.typePanel) {
      this.modalService.open(FormUserComponent, {
        size: "md",
        backdrop: "static",
        keyboard: false,
      });
    } else {

      this.modalService.open(FormModalityComponent, {
        size: "md",
        backdrop: "static",
        keyboard: false,
      })

    }



  }

}