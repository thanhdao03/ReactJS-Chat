import { Input, Form } from "antd";

const InputField = ({
  name,
  value,
  onChange,
  placeholder,
  type,
  autoComplete,
  validateStatus,
  help,
  onFocus,
}) => {
  return (
    <Form.Item validateStatus={validateStatus} help={help}>
      <Input
        className="form-input-register"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        onFocus={onFocus}
      />
    </Form.Item>
  );
};

export default InputField;
