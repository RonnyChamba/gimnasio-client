export class PageRender {
  url: string;

  totalPages: number;

  numElementsByPage: number;

  currentPage: number;

  totalElements: number;

  pagesItem: PageItem[];

  hasPrevious: boolean;

  hasNext: boolean;

  first: boolean;

  last: boolean;

}


export class PageItem {

    number: number;
    current: boolean;
}

export interface paramsPaginator {
    page: number ;
    size: number;
    order?: string;
    asc?: boolean;
    valueSearch?: string; 
    typeFilter: boolean;
}