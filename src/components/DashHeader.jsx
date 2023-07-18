import { Link } from "react-router-dom";

const DashHeader = () => {
  const content = (
    <header className="bg-gray-600 mt-20 p-4 text-white font-semibold">
      <div className="dash-header__container">
        <Link to="/dash">
          <h1 className="dash-header__title">Dashboard</h1>
        </Link>
        <nav className="dash-header__nav">{/* add nav buttons later */}</nav>
      </div>
    </header>
  );

  return content;
};
export default DashHeader;
