import { Image } from "antd";
import logo from "../../../assets/images/logo.png";
export const ImageLogo = () => {
  return (
    <div>
      <Image src={logo} preview={false} />
    </div>
  );
};
