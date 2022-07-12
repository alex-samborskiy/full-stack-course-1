import { Routes, Route } from "react-router-dom";

import Login from './Components/LoginForm';
import Register from './Components/RegisterForm';
import List from './Components/List';
import NotFound from './Components/NotFound';
import ProtectedRoute from './Components/ProtectedRoute';

const Index = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <ProtectedRoute>
            <List />
          </ProtectedRoute>
        }
      />
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
}

export default Index;