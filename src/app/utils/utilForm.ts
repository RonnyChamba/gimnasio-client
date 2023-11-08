import { typeOpeFormCustomer } from "./types";


export interface TypeOperationFormInsCustomer{

    type: typeOpeFormCustomer;
    ideInscription?: number;
    write?: boolean;
    ideCustomer?: number;
    // lo utilizo desde la lista de clientes para abrir el modal de inscripcion, para saber
    // si el cliente tiene la inscripcion activa
    dateExpired?: boolean;



}