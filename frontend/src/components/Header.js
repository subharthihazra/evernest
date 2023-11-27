import Navmenu from "./Navmenu";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { FiMoon, FiSun } from "react-icons/fi";
import { toggleColorMode } from "../colorMode";
import React, { useRef, useState } from "react";

function Header() {
  const [searchbarOpen, setSearchbarOpen] = useState(false);
  const searchbarRef = useRef(null);

  return (
    <div className="sticky top-2 mx-auto z-[1] lg:w-2/3">
      <div className="absolute left-2 right-2 lg:left-0 lg:right-0 z-[1] bg-[rgba(255,255,255,0.9)] dark:bg-[rgb(15,96,77,0.8)] shadow-[0_10px_5px_-8px_rgba(0,0,0,0.2),0_3px_15px_3px_rgba(0,0,0,0.1),0_3px_3px_1px_rgba(0,0,0,0.05)] px-3 py-3 rounded-2xl flex flex-col gap-4 backdrop-blur">
        {/* shadow-[0_0_15px_3px_rgba(0,0,0,0.1),0_0_3px_1px_rgba(0,0,0,0.05)] */}
        {/* <div>Future: Header Notices</div> */}
        <div className="flex flex-row place-content-between">
          <LeftPane searchbarOpen={searchbarOpen}>
            <MenuButton />
            <CompanyLogo />
          </LeftPane>
          <CloseSearchButton
            searchbarOpen={searchbarOpen}
            setSearchbarOpen={setSearchbarOpen}
          />
          <Searchbar
            searchbarRef={searchbarRef}
            searchbarOpen={searchbarOpen}
          />
          <RightPane searchbarOpen={searchbarOpen}>
            <SearchButton setSearchbarOpen={setSearchbarOpen} />
            <ThemeButton />
            <CartButton />
            <UserButton />
          </RightPane>
        </div>
        <div className="hidden sm:block">
          <Navmenu />
        </div>
      </div>
      <Menu />
    </div>
  );
}

function LeftPane({ searchbarOpen, children }) {
  return (
    <div
      className={` flex-row gap-2 sm:gap-4 sm:flex ${
        searchbarOpen ? "hidden" : "flex"
      }`}
    >
      {children}
    </div>
  );
}
function CompanyLogo({ darkm = false }) {
  return (
    <HeaderLogo>
      <img
        src={
          darkm
            ? "./assets/images/company_logo_white.svg"
            : "./assets/images/company_logo.svg"
        }
        alt="en"
        className="h-8 w-auto rounded-lg"
      />
    </HeaderLogo>
  );
}

function Searchbar({ searchbarRef, searchbarOpen }) {
  return (
    <div
      className={`sm:absolute sm:w-1/3 sm:left-1/3 sm:block ${
        !searchbarOpen && "hidden"
      }`}
    >
      <div className="relative flex gap-2 items-center w-full h-10 bg-slate-300 focus-within:bg-[rgba(203,213,225,0.6)] dark:bg-slate-900 dark:focus-within:bg-slate-800 overflow-hidden transition-colors rounded-lg px-2">
        <div className="grid place-items-center h-full">
          <AiOutlineSearch className="h-6 w-6" />
        </div>

        <input
          ref={searchbarRef}
          className="peer h-full w-full outline-none text-lg bg-transparent"
          type="text"
          id="search"
          placeholder="Search Something ..."
        />
      </div>
    </div>
  );
}

function CloseSearchButton({ searchbarOpen, setSearchbarOpen }) {
  return (
    <HeaderLogo
      className={`${!searchbarOpen && "hidden"}`}
      onClick={() => setSearchbarOpen(false)}
    >
      <AiOutlineCloseCircle />
    </HeaderLogo>
  );
}

function SearchButton({ setSearchbarOpen }) {
  return (
    <HeaderLogo className="sm:hidden" onClick={() => setSearchbarOpen(true)}>
      <AiOutlineSearch />
    </HeaderLogo>
  );
}

function RightPane({ searchbarOpen, children }) {
  return (
    <div
      className={` flex-row gap-2 sm:gap-4 sm:flex ${
        searchbarOpen ? "hidden" : "flex"
      }`}
    >
      {children}
    </div>
  );
}
function Menu() {}
function MenuButton() {
  return (
    <HeaderLogo>
      <AiOutlineMenu />
    </HeaderLogo>
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
    <HeaderLogo>
      <AiOutlineUser />
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
