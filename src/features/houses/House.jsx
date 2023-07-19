/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectHouseById } from "./houseApiSlice";
import { Td, Tr } from "@chakra-ui/react";

const House = ({ houseId }) => {
  const house = useSelector((state) => selectHouseById(state, houseId));
  const navigate = useNavigate();

  const handleEdit = () => navigate(`/dash/houses/${houseId}`);

  if (!house) return null;

  return (
    <Tr>
      <Td>{house.name}</Td>
      <Td>{house.address}</Td>
      <Td isNumeric>{house.bedrooms}</Td>
      <Td>{house.roomSize}</Td>
      <Td isNumeric>{house.rentPerMonth}</Td>
      <Td>
        <button
          onClick={handleEdit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Edit
        </button>
      </Td>
    </Tr>
  );
};

export default House;
