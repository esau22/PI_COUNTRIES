import { Routes, Route, useLocation } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { HomePage } from "./pages/HomePage";
import { DetailPage } from "./pages/DetailPage";
import { FormPage } from "./pages/FormPage";
import { NavBar } from "./components/NavBar";

export const App = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === "/" ? null : <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/create" element={<FormPage />} />
      </Routes>
    </>
  );
};
