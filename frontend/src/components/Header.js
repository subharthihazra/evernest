import React, { useContext, useRef, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineCloseCircle,
  AiOutlineClose,
} from "react-icons/ai";
import { FiMoon, FiSun } from "react-icons/fi";
import { IoChevronDownSharp } from "react-icons/io5";
import { toggleColorMode } from "../colorMode";
import Navmenu from "./Navmenu";
import menuData from "../data/menu";
import HeaderLogo from "./HeaderLogo";
import CartButton from "./CartButton";
import UserButton from "./UserButton";

function Header() {
  const [menuOpen, setMenuOpen] = useState("closed");
  const [searchbarOpen, setSearchbarOpen] = useState(false);
  const searchbarRef = useRef(null);

  function handleMenuOpen() {
    setMenuOpen("open");
  }

  function handleMenuClose() {
    if (menuOpen !== "closing" && menuOpen !== "closing") {
      setMenuOpen("closing");
      setTimeout(() => {
        setMenuOpen("closed");
      }, 300);
    }
  }

  function handleSearchbarOpen() {
    setSearchbarOpen(true);
    setTimeout(() => {
      // check if better method exists
      searchbarRef.current.focus();
    }, 0);
  }

  function handleSearchbarClose() {
    setSearchbarOpen(false);

    searchbarRef.current.value = "";
  }

  return (
    <div className="sticky top-2 mx-auto z-[1] lg:w-2/3">
      <div className="absolute left-2 right-2 lg:left-0 lg:right-0 z-[1] bg-[rgba(255,255,255,0.9)] dark:bg-[rgb(15,96,77,0.8)] shadow-[0_10px_5px_-8px_rgba(0,0,0,0.2),0_3px_15px_3px_rgba(0,0,0,0.1),0_3px_3px_1px_rgba(0,0,0,0.05)] px-3 py-3 rounded-2xl flex flex-col gap-4 backdrop-blur">
        {/* shadow-[0_0_15px_3px_rgba(0,0,0,0.1),0_0_3px_1px_rgba(0,0,0,0.05)] */}
        {/* <div>Future: Header Notices</div> */}
        <div className="flex flex-row place-content-between">
          <LeftPane searchbarOpen={searchbarOpen}>
            <MenuButton onMenuOpen={handleMenuOpen} />
            <CompanyLogo />
          </LeftPane>
          <Searchbar
            searchbarRef={searchbarRef}
            searchbarOpen={searchbarOpen}
          />
          <CloseSearchButton
            searchbarOpen={searchbarOpen}
            onSearchbarClose={handleSearchbarClose}
          />
          <RightPane searchbarOpen={searchbarOpen}>
            <SearchButton onSearchbarOpen={handleSearchbarOpen} />
            <ThemeButton />
            <CartButton />
            <UserButton />
          </RightPane>
        </div>
        <div className="hidden sm:block">
          <Navmenu />
        </div>
      </div>
      <Menu menuOpen={menuOpen} onMenuClose={handleMenuClose} />
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

function MenuButton({ onMenuOpen }) {
  return (
    <HeaderLogo
      className="cursor-pointer"
      linkProps={{ className: "sm:hidden" }}
      onClick={onMenuOpen}
    >
      <AiOutlineMenu />
    </HeaderLogo>
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
      className={`sm:absolute w-full sm:w-1/3 sm:left-1/3 sm:block ${
        !searchbarOpen && "hidden"
      }`}
    >
      <div className="relative flex gap-2 items-center w-full h-10 bg-slate-300 focus-within:bg-[rgba(203,213,225,0.6)] dark:bg-slate-900 dark:focus-within:bg-slate-800 overflow-hidden transition-colors rounded-lg px-2">
        <div className="grid place-items-center h-full">
          <AiOutlineSearch className="h-6 w-6" />
        </div>

        <input
          ref={searchbarRef}
          className="h-full w-full outline-none text-lg bg-transparent"
          name="search"
          type="text"
          autoComplete="off"
          id="search"
          placeholder="Explore Evernest ..."
        />
      </div>
    </div>
  );
}

function CloseSearchButton({ searchbarOpen, onSearchbarClose }) {
  return (
    <HeaderLogo
      className={`sm:hidden ml-2 cursor-pointer ${!searchbarOpen && "hidden"}`}
      onClick={onSearchbarClose}
    >
      <AiOutlineCloseCircle />
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

function SearchButton({ onSearchbarOpen }) {
  return (
    <HeaderLogo
      className="cursor-pointer"
      linkProps={{ className: "sm:hidden" }}
      onClick={onSearchbarOpen}
    >
      <AiOutlineSearch />
    </HeaderLogo>
  );
}

function ThemeButton() {
  return (
    <HeaderLogo className="cursor-pointer" onClick={toggleColorMode}>
      <FiSun className="h-8 w-8 hidden dark:block" />
      <FiMoon className="h-8 w-8 dark:hidden" />
    </HeaderLogo>
  );
}

function Menu({ menuOpen, onMenuClose }) {
  return (
    <div
      className={`fixed z-[10] sm:hidden w-full h-full overflow-hidden ${
        menuOpen === "open"
          ? "translate-x-0"
          : menuOpen === "closed"
          ? "translate-x-[-100%]"
          : ""
      }`}
    >
      <div
        className={`fixed z-[1] sm:hidden  w-full h-full transition-all duration-300 ${
          menuOpen === "open"
            ? "bg-[rgba(0,0,0,0.3)] backdrop-blur-sm"
            : "bg-transparent backdrop-blur-none"
        }`}
        onClick={onMenuClose}
      ></div>
      <div
        key="Menu"
        className={`fixed z-[2] flex flex-col gap-4 px-7 py-6 overflow-auto bg-white dark:bg-black w-[85%] h-full transition-all duration-300 shadow-[0px_3px_5px_2px_rgba(0,0,0,0.5),0px_5px_12px_2px_rgba(0,0,0,0.5)] ${
          menuOpen === "open" ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        <div className="flex flex-row w-full">
          <div className="grow text-2xl place-self-center cursor-default">
            Evernest
          </div>
          <HeaderLogo className="cursor-pointer" onClick={onMenuClose}>
            <AiOutlineClose />
          </HeaderLogo>
        </div>
        <div>
          <Accordion.Root type="multiple">
            {menuData.map((option) => (
              <Accordion.Item
                key={option?.trigger}
                value={option?.trigger}
                className=""
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex flex-row group py-1 my-2 text-[20px]">
                    {option?.trigger}
                    <IoChevronDownSharp
                      className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180 place-self-center ml-2"
                      aria-hidden
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="data-[state=open]:animate-slideDown group data-[state=closed]:animate-slideUp overflow-hidden text-[15px] bg-slate-100 dark:bg-[rgb(15,96,77,0.8)] rounded-2xl">
                  <div className="flex flex-col p-3 gap-2 group-data-[state=open]:opacity-1 group-data-[state=closed]:opacity-0 transition-opacity duration-300">
                    {option?.content?.map((subOption) => (
                      <a key={subOption}>
                        <div className="p-2 text-[16px] cursor-pointer">
                          {subOption}
                        </div>
                      </a>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </div>
  );
}

export default Header;
