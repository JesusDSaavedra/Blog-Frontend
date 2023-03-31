import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

const RoutesWithNotFound = ({ children }) => {
  return (
    <Routes>
      {children}
      <Route path="*" key={"404"} element={<div>NO ENCONTRADOOOO</div>} />
    </Routes>
  );
};

export default RoutesWithNotFound;
