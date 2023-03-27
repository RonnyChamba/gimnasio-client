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

export interface ParamsFilter{

  page: number ;
    size: number;
    order?: string;
    asc?: boolean;
}

export interface paramsPaginator extends ParamsFilter {
    valueSearch?: string | null;
    dateFilter?: string | null; 
}


type typeUser = "all" | "me";
export interface PaginatorAttendance extends ParamsFilter {
  dateBegin?: string;
  dateEnd?: string;
  // Para saber si lista de todos los usuarios o solo lo que un usuario ha registrado
  typeUser: typeUser;
}