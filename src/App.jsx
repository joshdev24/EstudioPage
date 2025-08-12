import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contratar from "./pages/Contratar";
import PagoExitoso from "./pages/PagoExitoso";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/formulario" element={<Contratar />} />
      <Route path="/pago-resultado" element={<PagoExitoso />} />
    </Routes>
  );
}

export default App;
