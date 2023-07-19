import { useGetHousesQuery } from "./houseApiSlice";
import House from "./House";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const HousesList = () => {
  const { email } = useAuth();

  const {
    data: houses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetHousesQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = houses;

    let filteredIds = ids.filter(
      (houseId) => entities[houseId].email === email
    );

    const tableContent =
      ids?.length &&
      filteredIds.map((houseId) => <House key={houseId} houseId={houseId} />);

    content = (
      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            <Link
              to="new-house"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Add New House
            </Link>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th isNumeric>Bed Rooms</Th>
              <Th>Room Size</Th>
              <Th isNumeric>Rent</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>{tableContent}</Tbody>
        </Table>
      </TableContainer>
    );
  }

  return content;
};

export default HousesList;
