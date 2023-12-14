import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { setColorMode } from "./colorMode";
import FirstPage from "./pages/FirstPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="min-h-[100vh]">
      <BrowserRouter>
        <Header />
        <div className="h-32"></div>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

setColorMode();

export default App;
