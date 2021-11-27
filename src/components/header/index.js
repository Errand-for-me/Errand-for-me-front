import "./header.css";
import back from "../../images/back.svg";
import Hamburger from "../../images/hamburger.png";
import { useHistory } from "react-router";

const CommonHeader = (props) => {
  const { isMainPage, toggle } = props;
  const history = useHistory();

  const moveHome = () => {
    history.push("/");
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="common-header">
      {isMainPage ? <img className="back" src={Hamburger} onClick={toggle} /> : <img className="back" src={back} onClick={goBack} />}

      <div className="logo" onClick={moveHome} />
    </div>
  );
};

export default CommonHeader;
