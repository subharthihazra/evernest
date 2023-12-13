import { AiOutlineUser } from "react-icons/ai";
import HeaderLogo from "./HeaderLogo";
import { useNavigate } from "react-router";

function UserButton() {
  const navigate = useNavigate();

  function navigateSignin(url) {
    navigate("/signin");
  }

  return (
    <HeaderLogo onClick={navigateSignin}>
      <AiOutlineUser />
    </HeaderLogo>
  );
}

export default UserButton;
