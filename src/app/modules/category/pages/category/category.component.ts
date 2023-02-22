import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
 
  flagClose = true;
 
  constructor(){}

  ngOnInit(): void {
   
  }
    
  onClickMenu(value: boolean){  

    this.flagClose = value;

  }

  
}