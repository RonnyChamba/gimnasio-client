import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';
import { TransactionSrService } from 'src/app/services/transaction-sr.service';
import { validMessagesError } from 'src/app/utils/MessagesValidation';

@Component({
  selector: 'app-information-company',
  templateUrl: './information-company.component.html',
  styleUrls: ['./information-company.component.scss']
})
export class InformationCompanyComponent  implements OnInit {
  
  constructor(
    private transaction: TransactionSrService,
    private toaster: ToastrService
  ) { }

  formData: FormGroup;
  validMessage = validMessagesError;
  title = 'Información del establecimiento';
  
  ngOnInit(): void {
    this.createForm();
    this.getInformationCompany();
  }
  private createForm() {

    this.formData = new FormGroup({
      ide: new FormControl(null),
      fullName: new FormControl('', [
        Validators.maxLength(250),
      ]),
      shortName: new FormControl('', [
        Validators.maxLength(250),
      ]),

      ruc: new FormControl('', [
        Validators.maxLength(20),
      ]),
      email: new FormControl(0, [
        Validators.maxLength(250),
      ]),
      address: new FormControl("", [
        Validators.maxLength(250),
      ]),
      phoneOne: new FormControl("", [
        Validators.maxLength(15),
      ]),
      phoneTwo: new FormControl("", [
        Validators.maxLength(15),
      ]),
      phoneConventional: new FormControl("", [
        Validators.maxLength(15),
      ]),
      logo: new FormControl("", [
        // Validators.required,
      ]),
      slogan: new FormControl("", [
        Validators.maxLength(250),
      ]),
      webSite: new FormControl("", [
        Validators.maxLength(250),
      ]),
      facebook: new FormControl("", [
        Validators.maxLength(250),
      ]),
      instagram: new FormControl("", [
        Validators.maxLength(250),
      ]),
      twitter: new FormControl("", [
        Validators.maxLength(250),
      ]),
      youtube: new FormControl("", [
        Validators.maxLength(250),
      ]),
      tiktok: new FormControl("", [
        Validators.maxLength(250),
      ]),
    });
  }

  fnSubmit() {
 
    if (this.formData.valid) {
      this.transaction.updateBusinessInformation(this.formData.value)
      .pipe(
        tap((response: any) => {

          this.toaster.success("Datos actualizados correctamente");
          if (response) {
            this.formData.patchValue(response?.data, { emitEvent: false });
          }
        }),
        catchError((err: any) => {
          this.toaster.error("Ocurrio un error al actualizar los datos");
          return of(null);
        })
      )
      .subscribe();
    }
  }

  cancel(){
    this.getInformationCompany();
  }

  private getInformationCompany() {
    this.transaction.getBusinessInformation()
      .pipe(
        tap((response: any) => {
          if (response) {
            this.formData.patchValue(response?.data, { emitEvent: false });
          }
        }),
        catchError((err: any) => {
          this.toaster.error("Ocurrio al obtener los datos del establecimiento");
          console.log(err);
          return of(null);
        })
      )
      .subscribe();
  }

}
