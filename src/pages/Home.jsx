import { useState } from "react";
import Navbar from "../components/Navbar";
import { useGetHousesQuery } from "../features/houses/houseApiSlice";
import HomeList from "./HomeList";
// import useAuth from "../hooks/useAuth";
import { Input, Button } from "@chakra-ui/react";

const Home = () => {
  // const { email, isHouseOwner, isRenter } = useAuth();
  const {
    data: houses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetHousesQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    city: "",
    bedrooms: "",
    bathrooms: "",
    roomSize: "",
    minRent: "",
    maxRent: "",
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    // Implement filtering here and set the filtered data accordingly
    // You can use the same filtering logic used in the previous code snippet
  };

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = houses;
    let filteredHouses = ids;

    // Filter houses based on search term and filter options
    if (houses) {
      filteredHouses = ids.filter((houseId) => {
        const house = houses.entities[houseId];
        const searchString =
          house.name.toLowerCase() +
          house.address.toLowerCase() +
          house.city.toLowerCase() +
          house.description.toLowerCase();

        return (
          searchString.includes(searchTerm.toLowerCase()) &&
          (!filterOptions.city || house.city === filterOptions.city) &&
          (!filterOptions.bedrooms ||
            house.bedrooms === parseInt(filterOptions.bedrooms)) &&
          (!filterOptions.bathrooms ||
            house.bathrooms === parseInt(filterOptions.bathrooms)) &&
          (!filterOptions.roomSize ||
            house.roomSize === parseInt(filterOptions.roomSize)) &&
          (!filterOptions.minRent ||
            house.rentPerMonth >= parseInt(filterOptions.minRent)) &&
          (!filterOptions.maxRent ||
            house.rentPerMonth <= parseInt(filterOptions.maxRent))
        );
      });
    }

    const tableContent =
      filteredHouses?.length &&
      filteredHouses.map((houseId) => (
        <HomeList key={houseId} houseId={houseId} />
      ));

    content = (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 mt-32">
          <div className="my-4">
            <h1 className="text-3xl font-semibold">Houses for Rent</h1>
          </div>
          <div className="my-4">
            <Input
              type="text"
              placeholder="Search houses..."
              readOnly
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-4 py-2 border rounded-lg w-96 focus:outline-none"
            />
            <div className="space-y-4">
              {/* Add filter options here */}
              {/* City */}
              <Input
                type="text"
                name="city"
                placeholder="City"
                value={filterOptions.city}
                onChange={handleFilterChange}
              />
              {/* Bedrooms */}
              <Input
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                value={filterOptions.bedrooms}
                onChange={handleFilterChange}
              />
              {/* Bathrooms */}
              <Input
                type="number"
                name="bathrooms"
                placeholder="Bathrooms"
                value={filterOptions.bathrooms}
                onChange={handleFilterChange}
              />
              {/* Room Size */}
              <Input
                type="number"
                name="roomSize"
                placeholder="Room Size"
                value={filterOptions.roomSize}
                onChange={handleFilterChange}
              />
              {/* Min Rent */}
              <Input
                type="number"
                name="minRent"
                placeholder="Min Rent"
                value={filterOptions.minRent}
                onChange={handleFilterChange}
              />
              {/* Max Rent */}
              <Input
                type="number"
                name="maxRent"
                placeholder="Max Rent"
                value={filterOptions.maxRent}
                onChange={handleFilterChange}
              />
              <Button colorScheme="blue" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Display filtered houses in cards */}
            {tableContent}
          </div>
        </div>
      </div>
    );
  }
  return content;
};

export default Home;
