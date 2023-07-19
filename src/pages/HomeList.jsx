/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { selectHouseById } from "../features/houses/houseApiSlice";
import { Button } from "@chakra-ui/react";

const HomeList = ({ houseId }) => {
  const house = useSelector((state) => selectHouseById(state, houseId));

  if (!house) return null;

  return (
    <div className="border rounded-lg p-4">
      <img
        src={house.picture} // Assuming house.picture contains the image URL
        alt={house.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{house.name}</h2>
      <p className="text-gray-600">{house.address}</p>
      <p className="text-gray-600">{house.city}</p>
      <div className="my-4">
        <p>Bedrooms: {house.bedrooms}</p>
        <p>Bathrooms: {house.bathrooms}</p>
        <p>Room Size: {house.roomSize}</p>
        <p>Availability Date: {house.availabilityDate}</p>
        <p>Rent per Month: ${house.rentPerMonth}</p>
        <p>Contact Phone: {house.phoneNumber}</p>
      </div>
      <p className="text-gray-700">{house.description}</p>
      <div className="flex mx-auto my-3">
        <Button colorScheme="blue">Book This House</Button>
      </div>
    </div>
  );
};

export default HomeList;
