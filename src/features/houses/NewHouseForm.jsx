/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useAddNewHouseMutation } from "../houses/houseApiSlice";
import { useNavigate } from "react-router-dom";

const NewHouseForm = ({ users }) => {
  const [addNewHouse, { isLoading, isSuccess, isError, error }] =
    useAddNewHouseMutation();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [bedrooms, setBedrooms] = useState();
  const [bathrooms, setBathrooms] = useState();
  const [roomSize, setRoomSize] = useState("");
  const [picture, setPicture] = useState("");
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [rentPerMonth, setRentPerMonth] = useState();
  const [phoneNumber, setPhoneNumber] = useState("+880");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(users[0].id);

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setAddress("");
      setCity("");
      setBedrooms();
      setBathrooms();
      setRoomSize("");
      setPicture("");
      setAvailabilityDate("");
      setRentPerMonth();
      setPhoneNumber("+880");
      setDescription("");
      setUserId("");
      navigate("/dash/houses");
    }
  }, [isSuccess, navigate]);

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
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave =
    [
      name,
      userId,
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
      await addNewHouse({
        user: userId,
        name,
        address,
        city,
        bedrooms,
        bathrooms,
        roomSize,
        picture,
        availabilityDate,
        rentPerMonth,
        phoneNumber: `+880${phoneNumber}`,
        description,
      });
      // console.log({
      //   user: userId,
      //   name,
      //   address,
      //   city,
      //   bedrooms,
      //   bathrooms,
      //   roomSize,
      //   picture,
      //   availabilityDate,
      //   rentPerMonth,
      //   phoneNumber: `+880${phoneNumber}`,
      //   description,
      // });
    }
  };

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {" "}
        {user.email}
      </option>
    );
  });

  const errClass = isError ? "text-red-500" : "hidden";

  return (
    <div className="flex items-center justify-center mt-32">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 py-6"
          onSubmit={onSaveHouseClicked}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Add New House
          </h2>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="userEmail">
              Select Your Mail
            </label>
            <select
              id="userEmail"
              name="userEmail"
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              multiple={false}
              size="1"
              value={userId}
              onChange={onUserIdChanged}
            >
              <option value="" disabled>
                Select Your Email
              </option>
              {options}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="name">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={onNameChanged}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="address">
              Address<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="address"
              name="address"
              type="text"
              value={address}
              onChange={onAddressChanged}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="city">
              City<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="city"
              name="city"
              type="text"
              value={city}
              onChange={onCityChanged}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="bedrooms">
              Bedrooms<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="bedrooms"
              name="bedrooms"
              type="number"
              value={bedrooms}
              onChange={onBedroomsChanged}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="bathrooms">
              Bathrooms<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="bathrooms"
              name="bathrooms"
              type="number"
              value={bathrooms}
              onChange={onBathroomsChanged}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="roomSize">
              Room Size<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="roomSize"
              name="roomSize"
              type="text"
              value={roomSize}
              onChange={onRoomSizeChanged}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="picture">
              Picture<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="picture"
              name="picture"
              type="text"
              value={picture}
              onChange={onPictureChanged}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block font-semibold mb-2"
              htmlFor="availabilityDate"
            >
              Availability Date<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="availabilityDate"
              name="availabilityDate"
              type="date"
              value={availabilityDate}
              onChange={onAvailabilityDateChanged}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="rentPerMonth">
              Rent Per Month<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="rentPerMonth"
              name="rentPerMonth"
              type="number"
              value={rentPerMonth}
              onChange={onRentPerMonthChanged}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="phoneNumber">
              Phone Number<span className="text-red-500">*</span>
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
            <label className="block font-semibold mb-2" htmlFor="description">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="description"
              name="description"
              rows="3"
              value={description}
              onChange={onDescriptionChanged}
              required
            ></textarea>
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
              Add House
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewHouseForm;
