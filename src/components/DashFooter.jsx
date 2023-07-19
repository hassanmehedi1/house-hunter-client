import { useNavigate, useLocation } from "react-router-dom";
import { BsFillHouseDoorFill } from "react-icons/bs";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { email, status } = useAuth();

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
      <p>Current User: {email}</p>
      <p>Status: {status}</p>
    </footer>
  );
  return content;
};
export default DashFooter;
