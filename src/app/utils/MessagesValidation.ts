import {
  MAX_ADDRESS,
  MAX_DESCRIPTION,
  MAX_EMAIL,
  MAX_NAME,
  MAX_PASSWORD,
  MAX_TELEPHONE,
  MIN_CEDULA,
  MIN_EMAIL,
  MIN_NAME,
  MIN_PASSWORD,
} from './Constants-Field';

/**
 * Función donde se define un objeto con los mensajes de error para las validaciones
 *
 */
export const validMessagesError = {
  

  requerid :  [
    {
      type: 'required',
      message: 'Campo obligatorio.',
    },
  ],
  
  cedula: [
    {
      type: 'required',
      message: 'Cédula es obligatoria.',
    },
    {
      type: 'pattern',
      message: `Ingrese ${MIN_CEDULA} números.`,
    },
  ],

  name: [
    {
      type: 'required',
      message: 'Nombre es obligatorio.',
    },
    {
      type: 'minlength',
      message: `Ingrese minímo ${MIN_NAME} caracteres.`,
    },
    {
      type: 'maxlength',
      message: `Solo puede ingresar hasta ${MAX_NAME} caracteres.`,
    },
  ],
  address: [
    {
      type: 'maxlength',
      message: `Solo puede ingresar hasta ${MAX_ADDRESS} caracteres.`,
    },
  ],

  password: [
    {
      type: 'pattern',
      message: 'La contraseña debe tener una letra mayúscula.',
    },
    {
      type: 'required',
      message: 'Contraseña es obligatoria.',
    },
    {
      type: 'minlength',
      message: `Ingrese minimo ${MIN_PASSWORD} caracteres.`,
    },
    {
      type: 'maxlength',
      message: `Solo puede ingresar hasta ${MAX_PASSWORD} caracteres.`,
    },
  ],

  repeatPassword: [
    {
      type: 'required',
      message: 'Campo es obligatorio.',
    },
  ],

  email: [
    {
      type: 'pattern',
      message: `Formato email es incorrecto.`,
    },
    {
      type: 'minlength',
      message: `Ingrese minimo ${MIN_EMAIL} caracteres.`,
    },
    {
      type: 'maxlength',
      message: `Solo puede ingresar hasta ${MAX_EMAIL} caracteres.`,
    },
  ],
  phone: [
    {
      type: 'pattern',
      message: `Debe ingresar ${MAX_TELEPHONE} números`,
    },
  ],
  born: [
    {
      type: 'pattern',
      message: `Formato fecha incorrecto`,
    },
  ],

  description: [
    {
      type: 'required',
      message: `Campo obligatorio`,
    },
    {
      type: 'maxlength',
      message: `Descripción puede ingresar hasta ${MAX_DESCRIPTION} caracteres.`,
    },
  ],

  // Valor de campo gastos e diarios
  price: [
    {
      type: 'pattern',
      message: `Formato incorrecto.`,
    },
    {
      type: 'required',
      message: `Campo obligatorio.`,
    },
  ],
  amount: [
    {
      type: 'pattern',
      message: `Formato incorrecto.`,
    },
    {
      type: 'required',
      message: `Campo obligatorio.`,
    },
  ],
  dateBegin: [
    {
      type: 'pattern',
      message: `Formato fecha incorrecto`,
    },
  ],

  descriptionModalidad: [
    {
      type: 'required',
      message: `Descripción obligatoria`,
    },
    
  ],
};




