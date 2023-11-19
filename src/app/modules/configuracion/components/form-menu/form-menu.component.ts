import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { validMessagesError } from 'src/app/utils/MessagesValidation';
import { MenuService } from '../../services/menu.service';
import { catchError, of, tap } from 'rxjs';
import { UtilAdminService } from 'src/app/modules/admin/services/util-admin.service';
import { MessageService } from 'src/app/services/message.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-menu',
  templateUrl: './form-menu.component.html',
  styleUrls: ['./form-menu.component.scss']
})
export class FormMenuComponent implements OnInit {

  @Input() ideMenu: any;

  formData: FormGroup;
  validMessage = validMessagesError;

  constructor(
    public modal: NgbActiveModal,
    private menuService: MenuService,
    private admiUtil: UtilAdminService,
    private toaster: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.formatoInput();

    if (this.ideMenu) {
      this.editForm();
    }
  }

  
  private createForm() {

    this.formData = new FormGroup({
      ide: new FormControl(null),
      icon: new FormControl('', [
        Validators.required,
      ]),
      nemonico: new FormControl('', [
        Validators.required,
      ]),

      nemonicoPadre: new FormControl('', [
        Validators.required,
      ]),
      position: new FormControl(0, [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ]),
      status: new FormControl("", [
        Validators.required,
      ]),
      visible: new FormControl("", [
        Validators.required,
      ]),
      title: new FormControl("", [
        Validators.required,
      ]),
      url: new FormControl("", [
        Validators.required,
      ]),
    });
  }

  fnSubmit() {
    // console.log("Submit");

    if (this.formData.valid) {

      // console.log(this.formData.value);
    
    this.menuService.save(this.formData.value, this.ideMenu)
    .pipe(
      tap((value: any) => {
       
        let message  = value.data ? "Menu actualizado" : "Menu guardado";
        this.modal.close(message);
        this.toaster.success(message);
        this.admiUtil.getSubjectReloadTableMenu.next(true);
        
      }),
      catchError((error) => {
        this.messageService.mensajeError(error?.error?.message);
        console.log(error);
        return of(null)
      }
      )).subscribe();
    }else alert("Formulario invalido");

  }

  editForm() {
    
    this.menuService.getById(this.ideMenu)
    .pipe(
      tap((value: any) => {
        console.log(value);
        this.formData.patchValue(value.data);
      }),
      catchError((error) => {
       
        this.messageService.mensajeError(error?.error?.message);
        return of(null)
      }
      )).subscribe();
  }


  formatoInput() {
  
    // no permite espacios en blanco en nemónico, url y nemónico padre
    this.formData.get('nemonico')?.valueChanges.subscribe((value: any) => {
      this.formData.get('nemonico')?.setValue(value?.replace(/ /g, ''), { emitEvent: false });
    }
    );

    this.formData.get('url')?.valueChanges.subscribe((value: any) => {
      this.formData.get('url')?.setValue(value?.replace(/ /g, ''), { emitEvent: false });
    }
    );

    this.formData.get('nemonicoPadre')?.valueChanges.subscribe((value: any) => {
      this.formData.get('nemonicoPadre')?.setValue(value?.replace(/ /g, ''), { emitEvent: false });
    }
    );
  }
}
