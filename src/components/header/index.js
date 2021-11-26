import "./header.css";
import logo from "../../images/logo.png";
import { useHistory } from "react-router";

const CommonHeader = () => {
  const history = useHistory();

  const moveHome = () => {
    history.push("/");
  };

  return (
    <div className="common-header">
      <img className="logo" src={logo} width="130px" onClick={moveHome} />
    </div>
  );
};

export default CommonHeader;
