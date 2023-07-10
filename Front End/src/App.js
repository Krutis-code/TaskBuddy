import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Tasks from "./Pages/Tasks";
import { ToastContainer, toast } from "react-toastify";
const PrivateRoute = ({ children, ...rest }) => {
  let auth = { token: false };
  return (
    <Route {...rest}>{!auth.token ? <Navigate to="/login" /> : children}</Route>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/signup"} element={<Signup />}></Route>
        <Route
          path={"/tasks"}
          element={
            // <PrivateRoute>
            <Tasks />
            // </PrivateRoute>
          }
        ></Route>
      </Routes>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
