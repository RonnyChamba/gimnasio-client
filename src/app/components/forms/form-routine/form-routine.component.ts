import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util-service.service';
import { MIN_NAME, MAX_NAME, MIN_CEDULA, MIN_EMAIL, MAX_EMAIL, MAX_ADDRESS, MAX_TELEPHONE } from 'src/app/utils/Constants-Field';
import { LevelEnum } from 'src/app/utils/enum/enumLevel';
import { validMessagesError } from 'src/app/utils/MessagesValidation';

@Component({
  selector: 'app-form-routine',
  templateUrl: './form-routine.component.html',
  styleUrls: ['./form-routine.component.scss']
})
export class FormRoutineComponent implements OnInit{
  
  formData: FormGroup;  
  validMessage =  validMessagesError;
  mapLevel = new Map<any, string>();

  constructor(private utilService: UtilService){}

  ngOnInit(): void {
    this.createForm();
    this.initLevel();
   
  }
  private initLevel() {
    
    this.mapLevel =  this.utilService.getMapLevel;
    // this.mapLevel.set(null, "Seleccione nivel");
 }
  private createForm() {

    this.formData = new FormGroup({
      
      
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_NAME),
        Validators.maxLength(MAX_NAME),
      ]),
      level: new FormControl(LevelEnum.PRINCIPIANTE, [
        Validators.required,
        Validators.minLength(LevelEnum.PRINCIPIANTE.length),
        Validators.maxLength(LevelEnum.PRINCIPIANTE.length),
      ]),

      description: new FormControl(null, [
      ]),
      

      

    }, this.validarFormGeneral );
  }

  validarFormGeneral (g: any){

    // if (g.get('email').value == '') g.get('email').reset();
    // if (g.get('address').value == '') g.get('address').reset();
    // if (g.get('phone').value == '') g.get('phone').reset();
    // if (g.get('born').value == '') g.get('born').reset();
    // if (g.get('cedula').value == '') g.get('cedula').reset();


    return null;

  }

  fnSubmit() {

    // Verificar si el formulario es valido
    if (this.formData.status.toUpperCase()=='VALID'){
      console.log(this.formData.value);

      // Aqui consulta backend
    }else alert("Campos incorrectos")
    
  }

}
