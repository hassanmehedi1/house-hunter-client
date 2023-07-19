import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isHouseOwner = false;
  let isRenter = false;
  let status = "HOUSE_OWNER";

  if (token) {
    const decoded = jwtDecode(token);
    const { email, roles } = decoded.UserInfo;

    isHouseOwner = roles.includes("HOUSE_OWNER");
    isRenter = roles.includes("HOUSE_RENTER");

    if (isHouseOwner) status = "HOUSE_OWNER";
    if (isRenter) status = "HOUSE_RENTER";

    return { email, roles, status, isHouseOwner, isRenter };
  }

  return { email: "", roles: [], isHouseOwner, isRenter, status };
};
export default useAuth;
