import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DailyService } from '../../services/daily.service';
import { typeModel } from 'src/app/utils/types';
import { FormDailiesComponent } from '../../components/form-dailies/form-dailies.component';
import { TokenService } from 'src/app/modules/auth/service/token.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit{
 
  flagClose = true;
  typeModel: typeModel= "DAILY";

  sumTotalPrice = 0
  sumTotalPriceByPage = 0
  
  constructor(
    private modalService: NgbModal,
    private dailyService: DailyService,
    private tokenService: TokenService
    ){
      this.flagClose = this.tokenService.getFlagClose();
    }
  
  ngOnInit(): void {

    
    this.getSumaTotal();
  }

  /**
   * Obtiene la suma total de todos los registros
   */
  private getSumaTotal(){
    this.dailyService.sumTotalPrice().subscribe(total =>{
      this.sumTotalPrice = total;
    })
  }

  onClickMenu(value:boolean){  

    this.flagClose = value;
    this.tokenService.setFlagClose(this.flagClose);
  }

  openModal(){
    this.modalService.open(FormDailiesComponent, {
      size: "md"
    });
  }

  /**
   * Cuando se elimina, actualiza o agrega un nuevo registro se actualiza el total de la pagina,
   * y ademas se actualiza la suma total de todos los registros
   * @param totalPrice 
   */
  updatesumaTotalByPage(value:number){
    this.sumTotalPriceByPage = value;

    this.getSumaTotal();
  }


}
