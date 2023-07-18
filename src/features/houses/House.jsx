/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectHouseById } from "./houseApiSlice";

const House = ({ houseId }) => {
  const house = useSelector((state) => selectHouseById(state, houseId));

  const navigate = useNavigate();

  if (house) {
    const created = new Date(house.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(house.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    // name,
    // address,
    // city,
    // bedrooms,
    // bathrooms,
    // roomSize,
    // picture,
    // availabilityDate,
    // rentPerMonth,
    // phoneNumber,
    // description,

    const handleEdit = () => navigate(`/dash/houses/${houseId}`);

    return (
      <tr className="table__row">
        <td className="table__cell house__status">{house.name}</td>
        <td className="table__cell house__created">{created}</td>
        <td className="table__cell house__updated">{updated}</td>
        <td className="table__cell house__title">{house.city}</td>
        <td className="table__cell house__username">{house.address}</td>

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            Edit
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default House;
