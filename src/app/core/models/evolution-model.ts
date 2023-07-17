export class Evolution {
  ide: number;

  weight: number;

  height: number;

  imc: number  | null;
  
  typeWeight: string;
 
  resultImc: string  | null; 

  dateRegister: string;

  description: string;
}

export class  EvolutionList extends Evolution{

  customer: string;
  user: string;

}
