import { useNavigate, useLocation } from "react-router-dom";
import { BsFillHouseDoorFill } from "react-icons/bs";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button
        className="dash-footer__button icon-button text-white"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <BsFillHouseDoorFill />
      </button>
    );
  }

  const content = (
    <footer className="dash-footer text-white">
      {goHomeButton}
      <p>Current User:</p>
      <p>Status:</p>
    </footer>
  );
  return content;
};
export default DashFooter;
