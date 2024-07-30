import React from "react";
import { Form, Input } from "antd";

const LoginInput = ({
  name,
  value,
  placeholder,
  type,
  onChange,
  onFocus,
  validateStatus,
  help,
}) => (
  <Form.Item name={name} validateStatus={validateStatus} help={help}>
    <Input
      className="form-input"
      onChange={onChange}
      autoComplete={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onFocus={onFocus}
    />
  </Form.Item>
);

export default LoginInput;
