import { useGetHousesQuery } from "./houseApiSlice";
import House from "./House";

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
      <table className="table table--houses">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th house__status">
              Name
            </th>
            <th scope="col" className="table__th house__created">
              Created
            </th>
            <th scope="col" className="table__th house__updated">
              Updated
            </th>
            <th scope="col" className="table__th house__title">
              City
            </th>
            <th scope="col" className="table__th house__username">
              Address
            </th>
            <th scope="col" className="table__th house__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default HousesList;
