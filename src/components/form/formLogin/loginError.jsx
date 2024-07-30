import React from "react";
import { Spin } from "antd";

const LoginError = ({ loading, error }) => (
  <p className="login-loading">
    {loading ? <Spin /> : error ? <>{error.message}</> : null}
  </p>
);

export default LoginError;
