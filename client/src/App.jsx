//hooks
import { Route, Routes } from "react-router-dom";
// //componentes a renderizar
import Home from "./components/homepage/homepage";
import Detail from "./components/detail/detail";
import Landing from "./components/landingpage/landingPage";
import Create from "./components/formulario/form";


import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;




