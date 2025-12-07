import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "./Pages/Welcome";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import PasswordResetRequest from "./Pages/Auth/PasswordResetRequest";
import ResetPassword from "./Pages/Auth/ResetPassword";
import ConfirmPassword from "./Pages/Auth/ConfirmPassword";
import VerifyEmail from "./Pages/Auth/VerifyEmail";
import ConfirmRegistration from "./Pages/Auth/ConfirmRegistration";
import TransactionRecord from "./Pages/Reports/TransactionRecord";
import PrivateRoute from "./Layouts/PrivateRoute";

import Dashboard from "./Pages/Dashboard";
import SecuritySettings from "./Pages/Profile/SecuritySettings";
import PasswordVerified from "./Pages/Profile/PasswordVerified";
import Edit from "./Pages/Profile/Edit";

import SalesReport from "./Pages/Reports/SalesReport";
import GenerateSalesReport from "./Pages/Reports/GenerateSalesReport";
import GenerateCapitalReport from "./Pages/Reports/GenerateCapitalReport";

import GenerateSalesReportDaily from "./Pages/SalesReports/GenerateSalesReportDaily";
import GenerateSalesReportWeekly from "./Pages/SalesReports/GenerateSalesReportWeekly";
import GenerateSalesReportMonthly from "./Pages/SalesReports/GenerateSalesReportMonthly";
import GenerateSalesReportCustom from "./Pages/SalesReports/GenerateSalesReportCustom";

import GenerateCapitalReportDaily from "./Pages/CapitalReports/GenerateCapitalReportDaily";
import GenerateCapitalReportWeekly from "./Pages/CapitalReports/GenerateCapitalReportWeekly";
import GenerateCapitalReportMonthly from "./Pages/CapitalReports/GenerateCapitalReportMonthly";
import GenerateCapitalReportCustom from "./Pages/CapitalReports/GenerateCapitalReportCustom";

import TransactionRecSection from "./Pages/TransactionRecSection";
import MakeTransaction from "./Pages/QA/MakeTransaction";
import TransactionHistory from "./Pages/QA/TransactionHistory";

import AddItem from "./Pages/AddItem";
import FullTransInfo from "./Pages/FullTransInfo";
import Inventory1 from "./Pages/Reports/Inventory1";

import AddProduct from "./Pages/QA/AddProduct";
import EditProduct from "./Pages/QA/EditProduct";


export default function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/passwordresetrequest" element={<PasswordResetRequest />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/confirm-password" element={<ConfirmPassword />} />
        <Route path="/confirm-register" element={<ConfirmRegistration />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />

        <Route path="/securitysettings" element={
          <PrivateRoute><SecuritySettings /></PrivateRoute>
        } />

        <Route path="/transaction-record" element={
          <PrivateRoute><TransactionRecord /></PrivateRoute>
        } />

        <Route path="/passwordverified" element={
          <PrivateRoute><PasswordVerified /></PrivateRoute>
        } />

        <Route path="/profile" element={
          <PrivateRoute><Edit /></PrivateRoute>
        } />


        {/* Reports */}
        <Route path="/sales-report" element={
          <PrivateRoute><SalesReport /></PrivateRoute>
        } />

        <Route path="/generate-sales-report" element={
          <PrivateRoute><GenerateSalesReport /></PrivateRoute>
        } />

        <Route path="/generate-capital-report" element={
          <PrivateRoute><GenerateCapitalReport /></PrivateRoute>
        } />


        {/* Sales Report Types */}
        <Route path="/generate-sales-report/daily" element={
          <PrivateRoute><GenerateSalesReportDaily /></PrivateRoute>
        } />

        <Route path="/generate-sales-report/weekly" element={
          <PrivateRoute><GenerateSalesReportWeekly /></PrivateRoute>
        } />

        <Route path="/generate-sales-report/monthly" element={
          <PrivateRoute><GenerateSalesReportMonthly /></PrivateRoute>
        } />

        <Route path="/generate-sales-report/custom" element={
          <PrivateRoute><GenerateSalesReportCustom /></PrivateRoute>
        } />


        {/* Capital Report Types */}
        <Route path="/generate-capital-report/daily" element={
          <PrivateRoute><GenerateCapitalReportDaily /></PrivateRoute>
        } />

        <Route path="/generate-capital-report/weekly" element={
          <PrivateRoute><GenerateCapitalReportWeekly /></PrivateRoute>
        } />

        <Route path="/generate-capital-report/monthly" element={
          <PrivateRoute><GenerateCapitalReportMonthly /></PrivateRoute>
        } />

        <Route path="/generate-capital-report/custom" element={
          <PrivateRoute><GenerateCapitalReportCustom /></PrivateRoute>
        } />


        {/* Transactions */}
        

        <Route path="/make-transaction" element={
          <PrivateRoute><MakeTransaction /></PrivateRoute>
        } />

        <Route path="/transaction-history" element={
          <PrivateRoute><TransactionHistory /></PrivateRoute>
        } />

        <Route path="/full-trans-info" element={
          <PrivateRoute><FullTransInfo /></PrivateRoute>
        } />


        {/* Inventory */}
        <Route path="/inventory1" element={
          <PrivateRoute><Inventory1 /></PrivateRoute>
        } />


        {/* Product Management */}
        <Route path="/add-product" element={
          <PrivateRoute><AddProduct /></PrivateRoute>
        } />

        <Route path="/edit-product/:id" element={
          <PrivateRoute><EditProduct /></PrivateRoute>
        } />


        {/* Other */}
        <Route path="/create-transaction" element={
          <PrivateRoute><AddItem /></PrivateRoute>
        } />
        <Route path="/transaction-rec-sec" element={
          <PrivateRoute><TransactionRecSection /></PrivateRoute>
        } />
        

      </Routes>
    </Router>
  );
}
