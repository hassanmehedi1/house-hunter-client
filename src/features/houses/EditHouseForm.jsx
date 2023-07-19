/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  useUpdateHouseMutation,
  useDeleteHouseMutation,
} from "./houseApiSlice";
import { useNavigate } from "react-router-dom";

const EditHouseForm = ({ house }) => {
  const [updateHouse, { isLoading, isSuccess, isError, error }] =
    useUpdateHouseMutation();
  const [
    deleteHouse,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteHouseMutation();

  const navigate = useNavigate();

  const [name, setName] = useState(house.name);
  const [address, setAddress] = useState(house.address);
  const [city, setCity] = useState(house.city);
  const [bedrooms, setBedrooms] = useState(house.bedrooms);
  const [bathrooms, setBathrooms] = useState(house.bathrooms);
  const [roomSize, setRoomSize] = useState(house.roomSize);
  const [picture, setPicture] = useState(house.picture);
  const [availabilityDate, setAvailabilityDate] = useState(
    house.availabilityDate
  );
  const [rentPerMonth, setRentPerMonth] = useState(house.rentPerMonth);
  const [phoneNumber, setPhoneNumber] = useState(house.phoneNumber);
  const [description, setDescription] = useState(house.description);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      navigate("/dash/houses");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onAddressChanged = (e) => setAddress(e.target.value);
  const onCityChanged = (e) => setCity(e.target.value);
  const onBedroomsChanged = (e) => setBedrooms(Number(e.target.value));
  const onBathroomsChanged = (e) => setBathrooms(Number(e.target.value));
  const onRoomSizeChanged = (e) => setRoomSize(e.target.value);
  const onPictureChanged = (e) => setPicture(e.target.value);
  const onAvailabilityDateChanged = (e) => setAvailabilityDate(e.target.value);
  const onRentPerMonthChanged = (e) => setRentPerMonth(Number(e.target.value));
  const onPhoneNumberChanged = (e) => setPhoneNumber(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const canSave =
    [
      name,
      address,
      city,
      bedrooms,
      bathrooms,
      roomSize,
      picture,
      availabilityDate,
      rentPerMonth,
      phoneNumber,
      description,
    ].every(Boolean) && !isLoading;

  const onSaveHouseClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await updateHouse({
        id: house.id,
        name,
        address,
        city,
        bedrooms,
        bathrooms,
        roomSize,
        picture,
        availabilityDate,
        rentPerMonth,
        phoneNumber,
        description,
      });
    }
  };

  const onDeleteHouseClicked = async () => {
    await deleteHouse({ id: house.id });
  };

  const errClass = isError || isDelError ? "errmsg" : "offscreen";

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="w-full max-w-lg">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSaveHouseClicked}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Edit House</h2>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={onNameChanged}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="address">
              Address:
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="address"
              name="address"
              type="text"
              value={address}
              onChange={onAddressChanged}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="city">
              City:
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="city"
              name="city"
              type="text"
              value={city}
              onChange={onCityChanged}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="bedrooms">
              Bedrooms:
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="bedrooms"
              name="bedrooms"
              type="number"
              value={bedrooms}
              onChange={onBedroomsChanged}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="bathrooms">
              Bathrooms:
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="bathrooms"
              name="bathrooms"
              type="number"
              value={bathrooms}
              onChange={onBathroomsChanged}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="roomSize">
              Room Size:
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="roomSize"
              name="roomSize"
              type="text"
              value={roomSize}
              onChange={onRoomSizeChanged}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="picture">
              Picture:
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="picture"
              name="picture"
              type="text"
              value={picture}
              onChange={onPictureChanged}
            />
          </div>

          <div className="mb-4">
            <label
              className="block font-semibold mb-2"
              htmlFor="availabilityDate"
            >
              Availability Date:
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="availabilityDate"
              name="availabilityDate"
              type="date"
              value={availabilityDate}
              onChange={onAvailabilityDateChanged}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="rentPerMonth">
              Rent Per Month:
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="rentPerMonth"
              name="rentPerMonth"
              type="number"
              value={rentPerMonth}
              onChange={onRentPerMonthChanged}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="phoneNumber">
              Phone Number:
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={onPhoneNumberChanged}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="description">
              Description:
            </label>
            <textarea
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="description"
              name="description"
              rows={4}
              value={description}
              onChange={onDescriptionChanged}
            ></textarea>
          </div>

          <p className={`text-red-500 text-sm ${errClass}`}>
            {error?.data?.message ?? delError?.data?.message}
          </p>

          <div className="flex justify-center">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                !canSave && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!canSave}
            >
              Save
            </button>
            <button
              className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onDeleteHouseClicked}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHouseForm;
