import { Spin } from "antd";

const LoadingError = ({ loading, error }) => {
  return (
    <p className="loading-register">
      {loading ? <Spin /> : error ? <>{error.errorB}</> : null}
    </p>
  );
};

export default LoadingError;
