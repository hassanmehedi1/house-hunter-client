import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  const logoutButton = (
    <button
      className="p-2 rounded-md bg-red-600 text-white"
      title="Logout"
      onClick={sendLogout}
    >
      Logout
    </button>
  );

  const content = (
    <header className=" bg-gray-900 text-white py-3">
      <div
        className={`container mx-auto flex items-center justify-between ${dashClass}`}
      >
        <Link to="/dash">
          <h1 className="text-blue-600 text-2xl font-bold">Dashboard</h1>
        </Link>
        <nav className="">
          {/* add more buttons later */}
          {logoutButton}
        </nav>
      </div>
    </header>
  );

  return content;
};

export default DashHeader;
