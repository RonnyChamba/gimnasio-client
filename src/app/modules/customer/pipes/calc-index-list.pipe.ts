import { Pipe, PipeTransform } from '@angular/core';
import { PageRender } from 'src/app/core/models/page-render.model';

@Pipe({
  name: 'calcIndexList',
})
export class CalcIndexListPipe implements PipeTransform {
  transform(value: number, pageRender: PageRender): unknown {
    
    let numberElement = pageRender.numElementsByPage * (pageRender.currentPage - 1);
    
    return numberElement + (value + 1);
  }
}
