import { Customer } from "./customer-model";
import { Evolution } from "./evolution-model";
import { Modality } from "./modality-model";
import { Transaction } from "./transaction-model";



export interface  InscriptionAttributes {  

    ide?: any;

    dateBegin: string;

    dateFinalize: string;

    workDay: string;

    numberMonth: number;

    typeInscription: string;

    description: string;

}

export interface InscriptionModel extends InscriptionAttributes{
    modality: number | null;
    
    evolution? :Evolution;

    transaction: Transaction;
    
}


export interface InscriptionListPage extends InscriptionAttributes  {

    user: string;
    customer: string;
    modality: Modality;
    transaction: Transaction;
    valid: boolean;


}


export interface InscriptionFetch extends InscriptionAttributes{
    customer: Customer;
    modality: Modality;
    evolutionCtm:Evolution;
    transaction: Transaction;
    
}