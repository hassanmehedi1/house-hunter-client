import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import House from "./features/houses/House";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route index element={<Home />}></Route>

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />

          <Route path="houses">
            <Route index element={<House />} />
          </Route>
        </Route>
        {/*  End Dash   */}
      </Routes>
    </>
  );
}

export default App;
