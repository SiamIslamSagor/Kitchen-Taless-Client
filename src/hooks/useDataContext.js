import { useContext } from "react";
import { AuthContext } from "../hoc/AuthProvider";

const useDataContext = () => {
  const data = useContext(AuthContext);
  return data;
};

export default useDataContext;
