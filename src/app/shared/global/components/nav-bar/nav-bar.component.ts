import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarDosComponent implements OnInit {
 

  flagClose = true;
  @Output() newItemEvent = new EventEmitter<boolean>();

  ngOnInit(): void {
    
  }

  onClickMenu(){


    this.flagClose = !this.flagClose;
    
    this.newItemEvent.emit(this.flagClose);



  }

}
