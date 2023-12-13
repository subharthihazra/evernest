import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { setColorMode } from "./colorMode";
import FirstPage from "./pages/FirstPage";
import SignIn from "./pages/SignIn";
import { NavigationProvider } from "./contexts/navigation";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavigationProvider>
          <Header />
          <div className="h-32"></div>
          <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </NavigationProvider>
      </BrowserRouter>
    </div>
  );
}

setColorMode();

export default App;
