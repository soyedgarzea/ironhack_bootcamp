import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../utils/user.context";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};
export default ProtectedRoute;
