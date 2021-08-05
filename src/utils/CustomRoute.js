import { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";

function CustomRoute(props) {
  const [returnedRoute, setReturnedRoute] = useState();

  useEffect(() => {
    switch (props.isMember) {
      case true:
        return setReturnedRoute(<Route {...props} />);
      case false:
        return setReturnedRoute(<Redirect to="/become-a-member" />);
      default:
        return setReturnedRoute(<Route {...props} />);
    }
  }, [props]);

  return <>{returnedRoute}</>;
}

export default CustomRoute;
