import { Evolution } from "./evolution-model";
import { Transaction } from "./transaction-model";

export class Inscription{

    ide: number;

    dateBegin: string;

    dateFinalize: string;

    workDay: string;

    numberMonth: number;

    typeInscription: string;

    description: string;

    modality: number | null;
    
    evolution :Evolution;

    transaction: Transaction;
    
}

export interface InscriptionRes {

    ide: number;

    dateBegin: string;

    dateFinalize: string;

    workDay: string;

    numberMonth: number;

    typeInscription: string;

    description: string;

}