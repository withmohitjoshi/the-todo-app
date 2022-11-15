import { NavLink } from "react-router-dom";
import NavBarContainer from "../styles/NavBar";

const NavBar = () => {
  return (
    <NavBarContainer>
      <li>
        <NavLink to={"/"}>All</NavLink>
      </li>
      <li>
        <NavLink to={"/pending"}>Pending</NavLink>
      </li>
      <li>
        <NavLink to={"/finished"}>Finished</NavLink>
      </li>
    </NavBarContainer>
  );
};
export default NavBar;
