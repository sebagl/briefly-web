// SelectInput.js
import { useForm } from "../../../context_providers";
import styles from './forms.module.css';

const SelectInput = ({ name, label, options, validators, ...props }) => {
  const { values, errors, handleChange, submitAttempted } = useForm();

  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        value={values[name] || ''}
        onChange={(e) => handleChange(name, e.target.value, validators)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {submitAttempted && errors[name] && <p style={{color: "red"}} className="error">{errors[name]}</p>}
    </div>
  );
};

export default SelectInput;
