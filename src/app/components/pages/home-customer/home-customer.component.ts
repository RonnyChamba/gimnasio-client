import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.scss']
})
export class HomeCustomerComponent implements OnInit{


  flagClose = true;
  


  constructor(){}
  ngOnInit(): void {
    
    
  }
  
  
  onClickMenu(){  

    this.flagClose = !this.flagClose;
  }


}
