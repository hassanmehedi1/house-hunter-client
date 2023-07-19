import NewHouseForm from "./NewHouseForm";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { Spinner } from "@chakra-ui/react";

const NewHouse = () => {
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <Spinner size="lg" />;

  const content = <NewHouseForm users={users} />;

  return content;
};
export default NewHouse;
