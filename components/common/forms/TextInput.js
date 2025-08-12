import { useForm } from '../../../context_providers';
import styles from './forms.module.css';

const TextInput = ({ name, label, validators, ...props }) => {
  const { values, errors, handleChange, submitAttempted } = useForm();

  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        id={name}
        value={values[name] || ''}
        onChange={(e) => handleChange(name, e.target.value, validators)}
        {...props}
      />
      {submitAttempted && errors[name] && <p className="error">{errors[name]}</p>}
    </div>
  );
};

export default TextInput;
