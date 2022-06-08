// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import LoginPages from "./pages/loginPage";
import TaskPage from "./pages/taskPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Container />}>
            <Route path="login" element={<LoginPages />} />
            <Route path="task" element={<TaskPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function Container() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
export default App;
