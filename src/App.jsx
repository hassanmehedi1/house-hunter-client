import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
// import House from "./features/houses/House";
import HousesList from "./features/houses/HouseList";
import Login from "./features/auth/Login";
import SignUp from "./features/auth/Signup";
import EditHouse from "./features/houses/EditHouse";
import NewHouseForm from "./features/houses/NewHouseForm";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route index element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<SignUp />}></Route>

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />

          <Route path="houses">
            <Route index element={<HousesList />} />
            <Route path=":id" element={<EditHouse />} />
            <Route path="new-house" element={<NewHouseForm />} />
          </Route>
        </Route>
        {/*  End Dash   */}
      </Routes>
    </>
  );
}

export default App;
