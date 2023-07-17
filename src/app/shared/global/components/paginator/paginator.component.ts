import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageRender } from 'src/app/core/models/page-render.model';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements PaginatorComponent {


 @Output() eventNumberPage = new EventEmitter<number>();

  // todos estos variable son pasadas por el componente padre que lo agrega
  @Input() listData: any[];
  @Input()  pageRender: PageRender;
  @Input()  sumaTotalElements = 0;

  constructor() { }

  ngOnInit(): void {    
  }
 

  changePage(numberPage: number) {
    console.log('changePage', numberPage);
    // aqui vamos a emitir el evento para que el padre lo escuche y pueda hacer lo que quiera cuando cambie de pagina
    this.eventNumberPage.emit(numberPage);

}
}