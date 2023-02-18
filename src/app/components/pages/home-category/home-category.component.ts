import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-category',
  templateUrl: './home-category.component.html',
  styleUrls: ['./home-category.component.scss']
})
export class HomeCategoryComponent implements OnInit {
 
  flagClose = true;
 
  constructor(){}

  ngOnInit(): void {
   
  }
    
  onClickMenu(){  

    this.flagClose = !this.flagClose;
  }

  
}
