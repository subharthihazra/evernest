import { AiOutlineUser } from "react-icons/ai";
import HeaderLogo from "./HeaderLogo";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function UserButton() {
  const navigate = useNavigate();
  const state = useSelector((state) => state.user);

  function navigateSignin(url) {
    if (state?.isAuthenticated === true) {
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  }

  return (
    <HeaderLogo className="cursor-pointer" onClick={navigateSignin}>
      <AiOutlineUser />
    </HeaderLogo>
  );
}

export default UserButton;
