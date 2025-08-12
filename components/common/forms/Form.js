import { useForm } from '../../../context_providers';

const Form = ({ children, onSubmit }) => {
  const { values, errors, setSubmitAttempted, isValid } = useForm();

  const handleSubmit = (e, onSubmitFn) => {
    setSubmitAttempted(true);
    if (!isValid) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    onSubmitFn();
  };


  return (
    <form onSubmit={(e) => handleSubmit(e, () => onSubmit(values))}>
      {children}
    </form>
  );
};

export default Form;
