import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useDataContext from "../hooks/useDataContext";
import { Spinner } from "@nextui-org/react";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useDataContext();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center ">
        <Spinner label="Loading..." size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/"></Navigate>;
  }

  return children;
};

PrivetRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivetRoute;
