import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
// import Navbar from "./components/Navbar";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
// import House from "./features/houses/House";
import HousesList from "./features/houses/HouseList";
import Login from "./features/auth/Login";
import SignUp from "./features/auth/SignUp";
import EditHouse from "./features/houses/EditHouse";
import Prefetch from "./features/auth/Prefetch";
import NewHouse from "./features/houses/NewHouse";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        {/* public routes  */}
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<SignUp />}></Route>

        {/* protected routes  */}
        <Route element={<PersistLogin />}>
          <Route index element={<Home />}></Route>

          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route
                  element={<RequireAuth allowedRoles={[ROLES.HOUSE_OWNER]} />}
                >
                  <Route path="houses">
                    <Route index element={<HousesList />} />
                    <Route path=":id" element={<EditHouse />} />
                    <Route path="new-house" element={<NewHouse />} />
                  </Route>
                </Route>
                {/* house route end  */}
              </Route>
              {/*  End Dash   */}
            </Route>
          </Route>
        </Route>

        {/* ----  */}
      </Routes>
    </>
  );
}

export default App;
