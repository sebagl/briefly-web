export const required = (value) => {
  return value ? undefined : 'Campo requerido';
};
  
export const minLength = (min) => (value) => {
  return value && value.length >= min ? undefined : `Debe tener al menos ${min} caracteres`;
};

  