import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent  implements OnInit{
  
  flagClose = true;
  formData: FormGroup;
  constructor(
    private attendanceService: AttendanceService
  ) { }
  
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
  }

}
