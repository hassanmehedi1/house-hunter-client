import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewHouseForm from "./NewHouseForm";

const NewHouse = () => {
  const users = useSelector(selectAllUsers);
  console.log(users);

  const content = users ? <NewHouseForm users={users} /> : <p>Loading...</p>;

  return content;
};
export default NewHouse;
