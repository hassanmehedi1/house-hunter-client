import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const { email, isHouseOwner, isRenter } = useAuth();
  return (
    <section className=" items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold mb-8">Welcome {email}</h1>
      <div className="space-y-4">
        {isHouseOwner && (
          <Link
            to="/dash/houses"
            className="bg-white text-blue-600 text-lg font-medium py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
          >
            View Houses
          </Link>
        )}

        {isRenter && (
          <Link
            to="/dash/bookings"
            className="bg-white text-blue-600 text-lg font-medium py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
          >
            View Bookings
          </Link>
        )}
      </div>
    </section>
  );
};

export default Welcome;
