import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AttendanceService } from '../../services/attendance.service';
import { typeModel } from 'src/app/utils/types';
import { TokenService } from 'src/app/modules/auth/service/token.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent  implements OnInit{
  

  typeModel: typeModel = "ATTENDANCE";
  flagClose = true;
  formData: FormGroup;
  constructor(
    private attendanceService: AttendanceService,
    private tokenService: TokenService
    ){
      this.flagClose = this.tokenService.getFlagClose();
    }
  
  
  ngOnInit(): void {
    this.createForm();

    this.formData.valueChanges.subscribe(resp => {
      console.log("datos change")
      console.log( resp)
      this.attendanceService.refresFilterTable.next(resp);
    }
    )

    
  }

  private createForm() {
    
    this.formData = new FormGroup(
      {
        size: new FormControl(5, []),
        dateBegin: new FormControl(null, []),
        typeUser: new FormControl("all", []),
        dateEnd: new FormControl(null, []),
        // valueSearch: new FormControl(null, []),
      });
  }


  onClickMenu(value:boolean){  

    this.flagClose = value;

    this.tokenService.setFlagClose(this.flagClose);
  }

}
