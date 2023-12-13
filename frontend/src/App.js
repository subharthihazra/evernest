import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { setColorMode } from "./colorMode";
import FirstPage from "./pages/FirstPage";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="h-32"></div>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

setColorMode();

export default App;
