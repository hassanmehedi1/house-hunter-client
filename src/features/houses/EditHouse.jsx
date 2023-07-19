import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectHouseById } from "./houseApiSlice";
import { selectAllUsers } from "../users/usersApiSlice";
import EditHouseForm from "./EditHouseForm";

const EditHouse = () => {
  const { id } = useParams();

  const house = useSelector((state) => selectHouseById(state, id));
  const users = useSelector(selectAllUsers);

  const content =
    house && users ? (
      <EditHouseForm house={house} users={users} />
    ) : (
      <p>Loading...</p>
    );

  return content;
};
export default EditHouse;
