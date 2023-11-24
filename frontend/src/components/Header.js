import Navmenu from "./Navmenu";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { FiMoon, FiSun } from "react-icons/fi";

function Header() {
  return (
    <div className="fixed w-full z-[1] bg-slate-100 dark:bg-slate-700">
      {/* <div>Future: Header Notices</div> */}
      <div className="flex flex-row">
        <MenuButton />
        <CompanyLogo />
        <Searchbar />
        <RightPane>
          <ThemeButton />
          <CartButton />
          <UserButton />
        </RightPane>
      </div>
      <div>
        <Navmenu />
      </div>
      <Menu />
    </div>
  );
}

function CompanyLogo() {
  return (
    <img
      src="./assets/company_logo.png"
      alt="en"
      className="h-10 w-auto rounded-lg"
    />
  );
}
function Searchbar() {}
function RightPane({ children }) {
  return <div>{children}</div>;
}
function Menu() {}
function MenuButton() {
  return <AiOutlineMenu className="text-black dark:text-white h-10 w-10" />;
}

function ThemeButton({ theme = "light" }) {
  return (
    <div className="h-10 w-10 overflow-hidden">
      <FiSun className="text-black dark:text-white h-10 w-10 dark:hidden" />
      <FiMoon className="text-black dark:text-white h-10 w-10 hidden dark:block" />
    </div>
  );
}

function CartButton() {
  return (
    <AiOutlineShoppingCart className="text-black dark:text-white h-10 w-10" />
  );
}

function UserButton() {
  return <AiOutlineUser className="text-black dark:text-white h-10 w-10" />;
}

export default Header;
