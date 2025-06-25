import "./App.css";
import { Route, Routes } from "react-router-dom";
// import { Siemens } from "./pages/Siemens";
import { SiemensMap } from "./pages/SiemensMap";

export const App = () => {
  return (
    <Routes>
      {/* <Route index path="smns" element={<Siemens />} /> */}
      <Route index path="smns" element={<SiemensMap />} />
    </Routes>
  );
};
