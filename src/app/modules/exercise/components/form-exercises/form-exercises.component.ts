import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from 'src/app/services/util-service.service';
import { MIN_NAME, MAX_NAME, MAX_DESCRIPTION, MAX_LEVEL } from 'src/app/utils/Constants-Field';
import { validMessagesError } from 'src/app/utils/MessagesValidation';

@Component({
  selector: 'app-form-exercises',
  templateUrl: './form-exercises.component.html',
  styleUrls: ['./form-exercises.component.scss']
})
export class FormExercisesComponent  implements OnInit {
  formData: FormGroup;
  validMessage = validMessagesError;

  flagAccordion = true;

  mapLevel = new Map<any, string>();

  constructor( private utilService: UtilService, public modal: NgbActiveModal) {}
  ngOnInit(): void {
    this.createForm();
    this.initLevel();
  }



  private initLevel() {
    
     this.mapLevel =  this.utilService.getMapLevel;
     this.mapLevel.set(null, "Seleccione categoria");
  }
  private createForm() {
    this.formData = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(MIN_NAME),
          Validators.maxLength(MAX_NAME),
        ]),

        description: new FormControl(null, [
          Validators.maxLength(MAX_DESCRIPTION),
        ]),

        level: new FormControl('', [Validators.maxLength(MAX_LEVEL)]),
      },
      this.validarFormGeneral
    );
  }

  validarFormGeneral(g: any) {
    if (g.get('description').value == '') g.get('description').reset();

    return null;
  }

  fnSubmit() {
    // Verificar si el formulario es valido

    if (this.formData.status.toUpperCase() == 'VALID') {

  // Si level esta '' indica que no eligio ningun nivel y setear a null ese valor 

      // Aqui consulta backend
      console.log(this.formData.value);


      
    } else alert('Campos incorrectos');

  }

  onAccordion() {
    this.flagAccordion = !this.flagAccordion;
  }
}