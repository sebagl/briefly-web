// TextAreaInput.js
import { useForm } from "../../../context_providers"
import styles from './forms.module.css';


const TextAreaInput = ({ name, label, validators, ...props }) => {
  const { values, errors, handleChange, submitAttempted } = useForm();

  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        id={name}
        value={values[name] || ''}
        onChange={(e) => handleChange(name, e.target.value, validators)}
        {...props}
      ></textarea>
      {submitAttempted && errors[name] && <p className="error">{errors[name]}</p>}

    </div>
  );
};

export default TextAreaInput;
