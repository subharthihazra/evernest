import Navmenu from "./Navmenu";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineSearch,
} from "react-icons/ai";
import { FiMoon, FiSun } from "react-icons/fi";
import { toggleColorMode } from "../colorMode";
import React from "react";

function Header() {
  return (
    <div className="sticky top-2 mx-auto z-[1] lg:w-2/3">
      <div className="absolute left-2 right-2 z-[1] bg-[rgba(255,255,255,0.8)] dark:bg-[rgb(15,96,77,0.8)] shadow-[0_10px_5px_-8px_rgba(0,0,0,0.2),0_3px_15px_3px_rgba(0,0,0,0.1),0_3px_3px_1px_rgba(0,0,0,0.05)] px-3 py-3 rounded-2xl flex flex-col gap-4 backdrop-blur">
        {/* shadow-[0_0_15px_3px_rgba(0,0,0,0.1),0_0_3px_1px_rgba(0,0,0,0.05)] */}
        {/* <div>Future: Header Notices</div> */}
        <div className="flex flex-row place-content-between">
          <LeftPane>
            <MenuButton />
            <CompanyLogo />
          </LeftPane>
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
      </div>
      <Menu />
    </div>
  );
}

function LeftPane({ children }) {
  return <div className="flex flex-row gap-4">{children}</div>;
}
function CompanyLogo() {
  return (
    <div className="h-10 w-10 overflow-hidden flex justify-center items-center dark:bg-slate-300 rounded-full">
      <img
        src="./assets/company_logo.svg"
        alt="en"
        className="h-8 w-auto rounded-lg"
      />
    </div>
  );
}

function Searchbar() {
  return (
    <div className="absolute w-1/3 left-1/3">
      <div className="relative flex gap-2 items-center w-full h-10 bg-slate-200 focus-within:bg-slate-100 dark:bg-slate-900 dark:focus-within:bg-slate-800 overflow-hidden transition-colors rounded-lg px-2">
        <div className="grid place-items-center h-full">
          <AiOutlineSearch className="h-6 w-6" />
        </div>

        <input
          className="peer h-full w-full outline-none text-lg bg-transparent"
          type="text"
          id="search"
          placeholder="Search Something ..."
        />
      </div>
    </div>
  );
}

function SearchButton() {
  return (
    <div className="h-10 w-10 overflow-hidden flex justify-center items-center sm:hidden">
      <AiOutlineMenu className="h-8 w-8" />
    </div>
  );
}

function RightPane({ children }) {
  return <div className="flex flex-row gap-4">{children}</div>;
}
function Menu() {}
function MenuButton() {
  return (
    <div className="h-10 w-10 overflow-hidden flex justify-center items-center sm:hidden">
      <AiOutlineMenu className="h-8 w-8" />
    </div>
  );
}

function ThemeButton() {
  return (
    <HeaderLogo onClick={toggleColorMode}>
      <FiSun className="h-8 w-8 hidden dark:block" />
      <FiMoon className="h-8 w-8 dark:hidden" />
    </HeaderLogo>
  );
}

function CartButton() {
  return (
    <HeaderLogo>
      <AiOutlineShoppingCart />
    </HeaderLogo>
  );
}

function UserButton() {
  return (
    <HeaderLogo
      href="https://google.com"
      className="bg-red-500"
      target="_blank"
    >
      <AiOutlineUser className="bg-yellow-200" />
    </HeaderLogo>
  );
}

function HeaderLogo({
  children,
  href = null,
  target = null,
  linkProps = "",
  className: boxPropsClassName = "",
  ...otherBoxProps
}) {
  console.log(children);
  const { className: linkPropsClassName = "", ...otherLinkProps } = linkProps;

  let childrenWithProps;
  if (!Array.isArray(children)) {
    const { className: logoPropsClassName = "", ...otherLogoProps } =
      children?.props;

    childrenWithProps = React.cloneElement(children, {
      className: `text-black dark:text-white h-8 w-8 ${logoPropsClassName}`,
      ...otherLogoProps,
    });
  }

  console.log("xx", childrenWithProps);

  return (
    <a
      href={href}
      className={`${linkPropsClassName}`}
      target={target}
      {...otherLinkProps}
    >
      <div
        className={`h-10 w-10 overflow-hidden flex justify-center items-center ${boxPropsClassName}`}
        {...otherBoxProps}
      >
        {Array.isArray(children) ? children : childrenWithProps}
      </div>
    </a>
  );
}

export default Header;
