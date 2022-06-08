// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

import LoginPages from "./pages/loginPage";
import LogoutPages from "./pages/logoutPage";
import TaskPage from "./pages/taskPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Container />}>
            <Route path="login" element={<LoginPages />} />
            <Route path="task" element={<TaskPage />} />
            <Route path="logout" element={<LogoutPages />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function Container() {
  return (
    <div>
      <Navbar/>
      <Outlet />
    </div>
  );
}
export default App;
