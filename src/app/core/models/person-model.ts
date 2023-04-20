export class Person {
  ide: number;

  email: string;

  address: string;

  dni: string;

  name: string;

  // profile: string;

  dateRegister: string | null

  phone: string;

  born: string;

  status: boolean;

  statusDelete: boolean;
}


export class UserModel extends Person {

  password?: string;
  roles?: string[];
}