import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormCategoryComponent } from '../../components/form-category/form-category.component';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilCategoryService } from '../../services/util-category.service';
import { PaginatorDiary } from 'src/app/core/models/page-render.model';
import { typeModel } from 'src/app/utils/types';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
 
  flagClose = true;
  formData: FormGroup;
  typeModel: typeModel = "CATEGORY"
 
  constructor(
    private modalService: NgbModal, 
    private utilCateService: UtilCategoryService){}

  ngOnInit(): void {
    this.createForm();
    this.onChangeListeners();
   
  }
  private createForm() {
    
    this.formData = new FormGroup(
      {
        size: new FormControl(5, []),
        valueSearch: new FormControl(null, []),
      });
  }
  private onChangeListeners() {
    
    this.formData.valueChanges.subscribe (data =>{
      // this.paramPaginator = data;

      this.utilCateService.getRefreshFilterTable.next(data as PaginatorDiary);

    })

    
  }

    
  onClickMenu(value: boolean){  

    this.flagClose = value;

  }

  openModal(){

    this.modalService.open(FormCategoryComponent, {
      size: "md"
    });
    
  }

  
}