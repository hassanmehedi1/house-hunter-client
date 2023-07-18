import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "../users/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";

const SignUp = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      setPassword("");
      setFullName("");
      setPhoneNumber("");
      setRoles([]);
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onFullNameChanged = (e) => setFullName(e.target.value);
  const onPhoneNumberChanged = (e) => setPhoneNumber(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    );
    setRoles(values);
  };

  const canSave =
    [roles.length, email, password, phoneNumber, fullName].every(Boolean) &&
    !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ email, password, roles, phone: `+880${phoneNumber}`, fullName });
      // console.log(email, password, roles, `+880${phoneNumber}`, fullName);
    }
  };

  const roleOptions = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const errClass = isError ? "text-red-500" : "hidden";

  return (
    <div className="flex items-center justify-center mt-32">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 py-6"
          onSubmit={onSaveUserClicked}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="name">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="name"
              name="name"
              type="text"
              value={fullName}
              onChange={onFullNameChanged}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="email">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              value={email}
              onChange={onEmailChanged}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="password">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChanged}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="phoneNumber">
              Phone<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                +880
              </span>
              <input
                className="w-full border border-gray-300 py-2 pl-14 pr-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                pattern="[0-9]{10}"
                value={phoneNumber}
                onChange={onPhoneNumberChanged}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="roles">
              Assigned Roles:
            </label>
            <select
              id="roles"
              name="roles"
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              multiple={false}
              size="1"
              value={roles}
              onChange={onRolesChanged}
            >
              <option value="" disabled>
                Select a role
              </option>
              {roleOptions}
            </select>
          </div>

          <p className={`text-red-500 text-sm ${errClass}`}>
            {error?.data?.message}
          </p>

          <div className="flex justify-center mt-6">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                !canSave && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!canSave}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
