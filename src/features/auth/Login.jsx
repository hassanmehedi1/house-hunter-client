import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Login
        </h1>
        <p ref={errRef} className={`mb-4 ${errClass}`} aria-live="assertive">
          {errMsg}
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-600">
              Email:
            </label>
            <input
              className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              id="email"
              ref={userRef}
              value={email}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-gray-600">
              Password:
            </label>
            <input
              className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
            />
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="submit"
          >
            Sign In
          </button>
          <div className=" items-center hidden">
            <input
              type="checkbox"
              className="form-checkbox border-gray-400 rounded text-blue-600 cursor-pointer"
              id="persist"
              checked={true} // Always checked
              readOnly={true} // Set to readonly
              onChange={() => setPersist(!persist)} // No need for handleToggle, since it's readonly
            />
            <label
              htmlFor="persist"
              className="ml-2 text-gray-600 cursor-pointer"
            >
              Trust This Device
            </label>
          </div>
        </form>
        <footer className="mt-6 text-center">
          <Link
            to="/"
            className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Back to Home
          </Link>

          <footer className="mt-6 text-center">
            <Link
              to="/signup"
              className="text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <span className="text-black">New to House Hunter?</span> Sign Up
            </Link>
          </footer>
        </footer>
      </div>
    </section>
  );
};

export default Login;
