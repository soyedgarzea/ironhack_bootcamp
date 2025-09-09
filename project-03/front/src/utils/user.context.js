import { createContext } from "react";

const UserContext = createContext({
  user: null,
  updateUser: () => {},
});

export default UserContext;
