 // Para los panes de la informacionde del cliente
 export type typePanelInfo = "DATA" | "MONTH" | "DAILY" | "EVOLUTION";

 export type typeFilterField = "EMAIL" | "DNI" | "NAME";

 // Para determinar que atributo se cambiara de estado en el cliente
 export type typeChangeStatus = "STATUS" | "DELETE";

 // Para determinar si los registros  de los clientes se listan solo del usuario actual o de todos
 export type typeUser = "me" | "all" | "";

 // Aplica para el form de nuevo cliente, ese formulario se abre para 3 diferentes acciones
 export type typeOpeFormCustomer= "newCliente" | "newInscription" | "updateInscription";


 // EN EL BACKEND SE USA ESTE TIPO DE DATO PARA LOS REPORTES, TIENE QUE SER EL MISMO
 // Además, se la utiliza para consultar el tipo de informacion del cliente
 export type typeModel = "INSCRIPTION" | "DAILY" | "EXPENSE" | "ATTENDANCE" | "CUSTOMER" | "USER" | "CATEGORY"  | "EVOLUTION"  | "DATA" | "INSCRIPTION_BY_CUSTOMER";


 // Para determinar si se genera el reporte o se cuenta los registros
 export type typeActionReport= "REPORT" | "COUNT";

 export type typeResponseReport = "blob" | "json";

