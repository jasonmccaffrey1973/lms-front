import Input from '../../../../../../sharedComponents/input/Input';
import Select from '../../../../../../sharedComponents/select/Select';
import type { FormElementProps } from './aiForm.types';
import type { Option } from '../../../../../../sharedComponents/select/Select.types';

const FormElement = ({ field }: FormElementProps) => {
  const { name, type, label, placeholder, value = '', onChange, options, required, disabled } = field;

  if (type === 'select') {
    if (!options || options.length === 0) {
      console.warn(`Select field "${name}" has no options`);
      return null;
    }

    const selectOptions: Option[] = options.map((opt) => ({
      value: opt.value,
      label: opt.label,
    }));

    return (
      <div className="form-group">
        <Select
          label={label}
          value={value}
          options={selectOptions}
          onChange={onChange || (() => {})}
          disabled={disabled}
        />
      </div>
    );
  }

  return (
    <div className="form-group">
      <Input
        type={type}
        label={label}
        placeholder={placeholder}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange || (() => {})}
      />
   </div>
  );
};

export default FormElement;

