import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenService } from 'src/app/modules/auth/service/token.service';
import { UtilService } from 'src/app/services/util-service.service';
import { UtilFiltersService } from 'src/app/shared/services/util-filters.service';
import { typeModel } from 'src/app/utils/types';

@Component({
  selector: 'app-filter-attendance',
  templateUrl: './filter-attendance.component.html',
  styleUrls: ['./filter-attendance.component.scss']
})
export class FilterAttendanceComponent implements OnInit {

  // Determinar el tipo de modelo  donde se va a utilizar el filtro y segun el tipo de modelo mostrar mas o  menos filtros
   @Input() typeModel: typeModel;;
  formData: FormGroup;
  typeExpenses:any = [];
  showFilters: boolean = false;

  constructor(
    private utilFiltersService: UtilFiltersService,
    private utilService: UtilService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.createForm();

    this.formData.valueChanges.subscribe(value => {
  
      this.utilFiltersService.eventFiltersEmit(value);

    }
    );



    // Add filter type expense
    this.typeExpenses = this.utilService.typeExpenses;
    
  }
  
  private createForm() {

    this.formData = new FormGroup(
      {
        size: new FormControl(5, []),
        dateBegin: new FormControl(null, []),
        dateEnd: new FormControl(null, []),
        typeUser: new FormControl("", []),
        typePay: new FormControl("", []),
        type: new FormControl("", []), // para listar en expense
        valueSearch: new FormControl("", []), // para listar en expense
      });
  }

  get isCliente(){
    return this.tokenService.isCliente();
  }

}
