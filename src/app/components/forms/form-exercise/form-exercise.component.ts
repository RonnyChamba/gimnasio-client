import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  MAX_DESCRIPTION,
  MAX_LEVEL,
  MAX_NAME,
  MIN_NAME,
} from 'src/app/utils/Constants-Field';
import { LevelEnum } from 'src/app/utils/enum/enumLevel';
import { validMessagesError } from 'src/app/utils/MessagesValidation';

@Component({
  selector: 'app-form-exercise',
  templateUrl: './form-exercise.component.html',
  styleUrls: ['./form-exercise.component.scss'],
})
export class FormExerciseComponent implements OnInit {
  formData: FormGroup;
  validMessage = validMessagesError;

  flagAccordion = true;

  mapLevel = new Map<any, string>();

  constructor(public modal: NgbActiveModal) {}
  ngOnInit(): void {
    this.createForm();
    this.initLevel();
  }

  private initLevel() {
    this.mapLevel.set(LevelEnum.PRINCIPIANTE, 'Principiante');
    this.mapLevel.set(LevelEnum.INTERMEDIO, 'Intermedio');
    this.mapLevel.set(LevelEnum.SENIOR, 'Senior');
    this.mapLevel.set(null, 'Seleccionar Categoria');
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
