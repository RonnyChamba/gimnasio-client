import { InscriptionAttributes } from "./inscription-model";
import { Person } from "./person-model";
import { Transaction } from "./transaction-model";

export class Customer extends Person{

    codInterno: string;
    genero: string;

    inscriptions: InscriptionAttributes[];

}

export interface PersonAttributes {

    ide: number;

    email?: string;
  
    address?: string;
  
    dni: string;
  
    name: string;
  
    profile?: string;
  
    dateRegister?: string | null
  
    phone?: string;
  
    born?: string;
  
    status?: boolean;
  
    statusDelete?: boolean;

}

export interface CustomerAttributes extends PersonAttributes{

    codInterno: string;
    genero: string;
}

export interface CustomerList  extends  PersonAttributes {
 
    dateBegin: string;
    dateEndInscription: string;
    dateExpired?: boolean;
    transaction?: Transaction;
    statusInscription?: string;
}