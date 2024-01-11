import { createContext } from "react";

const AppContext = createContext({
  loggedin: false,
  loginInfo: {},
});

export default AppContext;
