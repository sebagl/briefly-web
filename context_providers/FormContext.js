// FormProvider.js
import { createContext, useContext, useState, useEffect } from 'react';

const FormContext = createContext();

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (name, value, validators = []) => {
    setValues({ ...values, [name]: value });
    const error = validators.map(validator => validator(value)).find(error => error !== undefined);
    setFieldError(name, error);
  };

  const setFieldError = (name, error) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors, [name]: error };
      const formIsValid = !Object.values(newErrors).some((error) => error !== undefined);
      setIsValid(formIsValid);
      return newErrors;
    });
  };

  // Run validators on initial render
  useEffect(() => {
    Object.entries(values).forEach(([name, value, validators]) => {
      const error = validators.map(validator => validator(value)).find(error => error !== undefined);
      setFieldError(name, error);
    });
  }, []);

  return (
    <FormContext.Provider
      value={{ values, errors, handleChange, setFieldError, submitAttempted, setSubmitAttempted, isValid }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
