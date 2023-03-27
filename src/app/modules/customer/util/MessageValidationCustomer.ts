import { MAX_ADDRESS, MAX_EMAIL, MAX_NAME, MAX_TELEPHONE, MIN_EMAIL, MIN_NAME } from "src/app/utils/Constants-Field";

export const messagesErrorCustomer = {
    
  name: [
    {
      type: 'required',
      message: 'Nombre es obligatorio.',
    },
    {
      type: 'minlength',
      message: `Nombre debe tener minímo ${MIN_NAME} caracteres.`,
    },
    {
      type: 'maxlength',
      message: `Nombre puede tener maximo ${MAX_NAME} caracteres.`,
    },
  ],

  dni: [
  
    {
      type: 'pattern',
      message: 'Cédula debe tener 10 números.',
    },
  ],

  phone: [
    {
      type: 'pattern',
      message: `Télefono debe tener ${MAX_TELEPHONE} números`,
    },
  ],

  
  email: [
    {
      type: 'pattern',
      message: `Formato email es incorrecto.`,
    },
    {
      type: 'minlength',
      message: `Email debe tener minimo ${MIN_EMAIL} caracteres.`,
    },
    {
      type: 'maxlength',
      message: `Email puede tener maximo ${MAX_EMAIL} caracteres.`,
    },
  ],
  born: [
    {
      type: 'pattern',
      message: `Formato fecha incorrecto`,
    },
  ],

  address: [
    {
      type: 'maxlength',
      message: `Dirección puede tener maximo ${MAX_ADDRESS} caracteres.`,
    },
  ],

  modality: [
    {
      type: 'required',
      message: 'Modalidad es obligatorio.',
    },
  ],
  numberMonth : [

    {
      type: 'required',
      message: 'Número de meses es obligatorio.',
    },
    {
      type: 'pattern',
      message: `Formato incorrecto.`,
    },

  ],
  typePay :  [

    {
      type: 'required',
      message: 'Tipo pago es obligatorio.',
    },
  ],
  price : [

    {
      type: 'required',
      message: 'Precio es obligatorio.',
    },
    {
      type: 'min',
      message: 'Precio minimo es 0.',
    },
  ],
  pay : [

    {
      type: 'required',
      message: 'Valor es obligatorio.',
    },
    {
      type: 'min',
      message: 'Valor minimo es 0.',
    },
  ],
  balance : [

    {
      type: 'required',
      message: 'Diferencia es obligatorio.',
    },
    {
      type: 'min',
      message: 'Valor minimo es 0.',
    },
  ],
  dateBegin: [
    {
      type: 'required',
      message: 'Fecha inicio es obligatorio.',
    },
    {
      type: 'pattern',
      message: `Formato fecha incorrecto`,
    },
    {
      type: 'validRonny',
      message: `Fecha inicial debe ser menor a fecha final`,
    },
  ],
  dateFinalize: [
    {
      type: 'required',
      message: 'Fecha final es obligatorio.',
    },
    {
      type: 'pattern',
      message: `Formato fecha incorrecto`,
    },
    {
      type: 'validRonny',
      message: `Fecha final debe ser igual o superior a fecha inicio`,
    },
  ],
  workDay : [
    {
      type: 'required',
      message: 'Jornada es obligatorio.',
    },
  ],
  weight : [
    {
      type: 'min',
      message: 'El peso minímo permitido es 1',
    },
  ]




}