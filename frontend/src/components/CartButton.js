import HeaderLogo from "./HeaderLogo";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteItem } from "../redux/cart";

function CartButton() {
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function hup() {
    dispatch(addItem({ id: "745" }));
  }

  return (
    <HeaderLogo className="relative cursor-pointer" onClick={hup}>
      <AiOutlineShoppingCart className="h-8 w-8" />
      {state.length !== 0 && (
        <div className="text-[15px] bg-[rgba(255,255,255,0.9)] dark:bg-[rgba(0,0,0,0.8)] absolute top-0 right-0 rounded-full shadow-[0_0_3px_1px_rgba(0,0,0,0.6)] aspect-square h-[20px] text-center px-[2px]">
          {state.reduce((total, item) => total + item.quantity, 0)}
        </div>
      )}
    </HeaderLogo>
  );
}

export default CartButton;
