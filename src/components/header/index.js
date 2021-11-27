import "./header.css";
import back from "../../images/back.svg";
import Hamburger from "../../images/hamburger.png";
import { useHistory } from "react-router";

const CommonHeader = (props) => {
  const { isMainPage, path, toggle } = props;
  const history = useHistory();

  const moveHome = () => {
    history.push("/");
  };

  const goBack = () => {
    switch (path) {
      case "bulletin":
        history.push("/bulletin");
        break;
      case "quest":
        history.push("/quest");
        break;
      case "chat":
        history.push("/chat-list");
        break;
      default:
        history.push("/");
    }
  };

  return (
    <div className="common-header">
      {isMainPage ? <img className="back" src={Hamburger} onClick={toggle} /> : <img className="back" src={back} onClick={goBack} />}

      <div className="logo" onClick={moveHome} />
    </div>
  );
};

export default CommonHeader;
