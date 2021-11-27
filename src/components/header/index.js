import "./header.css";
import logo from "../../images/logo.png";
import back from "../../images/back.svg";
import { useHistory } from "react-router";

const CommonHeader = () => {
  const history = useHistory();

  const moveHome = () => {
    history.push("/");
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="common-header">
      <img className="back" src={back} onClick={goBack} />
      <img className="logo" src={logo} onClick={moveHome} />
    </div>
  );
};

export default CommonHeader;
