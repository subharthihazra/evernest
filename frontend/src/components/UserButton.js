import { AiOutlineUser } from "react-icons/ai";
import HeaderLogo from "./HeaderLogo";
import { NavigationContext } from "../contexts/navigation";
import { useContext } from "react";

function UserButton() {
  const navigate = useContext(NavigationContext);
  function navigateUser(url) {
    navigate("/signin");
  }
  return (
    <HeaderLogo onClick={navigateUser}>
      <AiOutlineUser />
    </HeaderLogo>
  );
}

export default UserButton;
