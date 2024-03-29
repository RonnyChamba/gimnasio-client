import { TypePayEnum } from "../enum/pay-enum";
import { typeActionReport, typeModel, typeUser } from "../../utils/types";

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

export interface ParamsFilter {

  page: number;
  size: number;
  order?: string;
  asc?: boolean;
}

export interface PaginatorAttendanceAndMembresias extends ParamsFilter {
  dateBegin?: string;
  dateEnd?: string;
  // Para saber si lista de todos los usuarios o solo lo que un usuario ha registrado
  typeUser: typeUser;
  typePay?: TypePayEnum;
  typeData: typeModel;

}

export interface PaginatorCustomer extends ParamsFilter {

  valueSearch?: string | null;
  dateBegin?: string;
  dateEnd?: string;
}


// Tambne lo utilizado para   listar las categorias
export interface PaginatorDiary extends   PaginatorAttendanceAndMembresias{
  
  valueSearch?: string | null;
  type?: string;
}

export interface ReportParams {
  dateBegin?: string;
  dateEnd?: string;
  typeUser: string;
  customer?: string;
  typePay?: string;
  modality: string;
  typeExpense?: string;
  typeReport: typeModel;
  typeAction: typeActionReport;
}