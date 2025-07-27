import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TransferMarket from "./pages/TransferMarket";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import { ProtectedRoute } from "./components/ProtecterRoute";
import { AppRoutes } from "./constants";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={AppRoutes.LOGIN} element={<Login />} />
        <Route
          path={AppRoutes.DASHBOARD}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoutes.TRANSFER}
          element={
            <ProtectedRoute>
              <TransferMarket />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
