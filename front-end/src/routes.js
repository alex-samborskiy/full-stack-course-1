import { Routes, Route } from "react-router-dom";

import Login from "./Components/LoginForm";
import Register from "./Components/RegisterForm";
import List from "./Components/List";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute";
import Layout from "./Components/Layout";
import Profile from "./Components/Profile";

const Index = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<List />} />
          <Route path="/list" element={<List />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        index
        element={
          <ProtectedRoute>
            <List />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
      {/* <Route path="*" element={<Navigate to="/login" replace={true} />} /> // navigate to Login page if rout does not exist */}
    </Routes>
  );
};

export default Index;
