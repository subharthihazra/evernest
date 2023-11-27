import Header from "./components/Header";
import { setColorMode } from "./colorMode";
import FirstPage from "./pages/FirstPage";

function App() {
  return (
    <div>
      <Header />
      <div className="h-32"></div>
      <FirstPage />
    </div>
  );
}

setColorMode();

export default App;
