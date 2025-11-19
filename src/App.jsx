import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Pages/Welcome";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
import VerifyEmail from "./Pages/Auth/VerifyEmail";
import ConfirmPassword from "./Pages/Auth/ConfirmPassword";
import PrivateRoute from "./Layouts/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import EditProduct from "./Pages/QA/EditProduct";
import Inventory1 from "./Pages/Reports/Inventory1";
import AddProduct from "./Pages/QA/AddProduct";
import AddItem from "./Pages/AddItem";
import TransactionRecord from "./Pages/Reports/TransactionRecord";
import TransactionRecSec from "./Pages/TransactionRecSection";

export default function App() {
  return(
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/confirm-password" element={<ConfirmPassword />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/edit-product/:id" element={
          <PrivateRoute><EditProduct /></PrivateRoute>
        } />
        <Route path="/inventory1" element={
          <PrivateRoute><Inventory1 /></PrivateRoute>
        } />
        <Route path="/transaction-rec-sec" element={
          <PrivateRoute><TransactionRecSec /></PrivateRoute>
        } />
        <Route path="/transaction-record" element={
          <PrivateRoute><TransactionRecord /></PrivateRoute>
        } />
        <Route path="/add-product" element={
          <PrivateRoute><AddProduct /></PrivateRoute>
        } />
        <Route path="/make-transaction" element={
          <PrivateRoute><AddItem /></PrivateRoute>
        } />
        
      </Routes>
    </Router>
  );
}

