import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Lovebomb from "./pages/Lovebomb";
import Clear from "./pages/Clear";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="lovebomb" element={<Lovebomb />} />
          <Route path="clear" element={<Clear />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
