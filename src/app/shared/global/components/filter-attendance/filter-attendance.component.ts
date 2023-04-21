import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilFiltersService } from 'src/app/shared/services/util-filters.service';

@Component({
  selector: 'app-filter-attendance',
  templateUrl: './filter-attendance.component.html',
  styleUrls: ['./filter-attendance.component.scss']
})
export class FilterAttendanceComponent implements OnInit {

  formData: FormGroup;

  
  constructor(
    private utilFiltersService: UtilFiltersService
  ) { }

  ngOnInit(): void {
    this.createForm();

    this.formData.valueChanges.subscribe(value => {
      // emitimos el evento
      this.utilFiltersService.eventFiltersEmit(value);

    }
    );
  }

  private createForm() {

    this.formData = new FormGroup(
      {
        size: new FormControl(5, []),
        dateBegin: new FormControl(null, []),
        dateEnd: new FormControl(null, []),
        typeUser: new FormControl("", []),
        typePay: new FormControl("", [])
      });
  }

}
