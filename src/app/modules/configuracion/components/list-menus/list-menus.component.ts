import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/services/message.service';
import { Subscription, catchError, of, tap } from 'rxjs';
import { FormMenuComponent } from '../form-menu/form-menu.component';
import { UtilAdminService } from 'src/app/modules/admin/services/util-admin.service';

@Component({
  selector: 'app-list-menus',
  templateUrl: './list-menus.component.html',
  styleUrls: ['./list-menus.component.scss']
})
export class ListMenusComponent implements OnInit, OnDestroy {

  listData: any[] = [];

  private subscription = new Subscription();
  constructor(
    private menuService: MenuService,
    private toater: ToastrService,
    private modalService: NgbModal,
    private messageService: MessageService,
    private admiUtil: UtilAdminService
  ) { }


  ngOnInit(): void {
    this.messageService.loading(true);
    this.findAll();
    this.addSubscription();
  }

  private addSubscription(): void {
    this.subscription.add(
      this.admiUtil.getSubjectReloadTableMenu.asObservable().subscribe((data) => {
        this.findAll();
      })
    );
  }

  findAll() {
    this.menuService.getAll()
    .pipe(
      tap((data: any) => {
        this.listData = data.data;
        console.log(data);
        this.messageService.loading(false);
      }),
      catchError((err: any) => {

        console.log(err);
        this.messageService.loading(false);
        return of(null);

      }),
    ).subscribe();
  }

  edit(ide: any) {
    const ref = this.modalService.open(FormMenuComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });

    ref.componentInstance.ideMenu = ide;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
