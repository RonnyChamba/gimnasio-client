 // Para los panes de la informacionde del cliente
 export type typePanelInfo = "DATA" | "MONTH" | "DAILY";

 export type typeFilterField = "EMAIL" | "DNI" | "NAME";

 // Para determinar que atributo se cambiara de estado en el cliente
 export type typeChangeStatus = "STATUS" | "DELETE";

 // Para determinar si los registros  de los clientes se listan solo del usuario actual o de todos
 export type typeUser = "me" | "all";

 // Aplica para el form de nuevo cliente, ese formulario se abre para 3 diferentes acciones
 export type typeOpeFormCustomer= "newCliente" | "newInscription" | "updateInscription";