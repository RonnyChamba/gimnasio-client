import { InscriptionAttributes } from "./inscription-model";
import { Person } from "./person-model";

export class Customer extends Person{

    codInterno: string;
    genero: string;

    inscriptions: InscriptionAttributes[];

}