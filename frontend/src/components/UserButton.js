import { useSelector, useDispatch } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import HeaderLogo from "./HeaderLogo";

function UserButton() {
  const state = useSelector((state) => state.cart);

  return (
    <HeaderLogo onClick={state.navigate("/signin")}>
      <AiOutlineUser />
    </HeaderLogo>
  );
}

export default UserButton;
