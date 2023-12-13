import { createContext } from "react";
import { useNavigate } from "react-router";
const NavigationContext = createContext(undefined);

function NavigationProvider({ children }) {
  const navigate = useNavigate();

  function navigatePage(url) {
    navigate(url);
  }

  return (
    <NavigationContext.Provider value={navigatePage}>
      {children}
    </NavigationContext.Provider>
  );
}

export { NavigationProvider, NavigationContext };
