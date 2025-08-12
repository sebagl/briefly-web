// RadioInput.js
import { useForm } from "../../../context_providers" 
import styles from './forms.module.css';

const RadioInput = ({ name, label, options, validators }) => {
  const { values, errors, handleChange, submitAttempted } = useForm();

  return (
    <div className={styles.formGroup}>
      <p>{label}</p>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            name={name}
            id={`${name}-${option.value}`}
            value={option.value}
            checked={values[name] === option.value}
            onChange={(e) => handleChange(name, e.target.value, validators)}
          />
          <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
        </div>
      ))}
      {submitAttempted && errors[name] && <p className="error">{errors[name]}</p>}

    </div>
  );
};

export default RadioInput;
