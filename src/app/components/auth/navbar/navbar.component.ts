import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 

  flagClose = true;
  @Output() newItemEvent = new EventEmitter<boolean>();

  ngOnInit(): void {
    
  }


  onClickMenu(){


    this.flagClose = !this.flagClose;
    
    this.newItemEvent.emit(this.flagClose);



  }
}
