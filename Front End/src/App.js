import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Tasks from "./Pages/Tasks";
import { ToastContainer } from "react-toastify";
const PrivateRoute = ({ children, ...rest }) => {
  let auth = Boolean(localStorage.getItem("userAuth"));
  return !auth ? <Navigate to="/login" /> : children;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/signup"} element={<Signup />}></Route>
        <Route
          path={"/tasks"}
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        ></Route>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
