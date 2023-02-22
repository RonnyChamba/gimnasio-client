import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormCustomersComponent } from 'src/app/modules/customer/components/form-customers/form-customers.component';
import { FormUserComponent } from '../../components/form-user/form-user.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{

  flagClose = true;
 
  constructor(private modalService: NgbModal){}
  ngOnInit(): void {
    
  }
  
  
  onClickMenu(value:boolean){  

    this.flagClose = value;
  }


  openModal(){

    console.log("Abrir modal");

    this.modalService.open(FormUserComponent, {
      size: "lg"
    });
  }

}