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

const HousesList = () => {
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
    const { ids } = houses;

    const tableContent = ids?.length
      ? ids.map((houseId) => <House key={houseId} houseId={houseId} />)
      : null;

    content = (
      <TableContainer>
        <Table variant="simple">
          <TableCaption>House List</TableCaption>
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
