import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AddCsv from "./Components/superAdmin/addcsv";
import "bootstrap/dist/css/bootstrap.min.css";
import PropertyDetails from "./Components/users/PropertyDetails";
import UserLogin from "./Components/users/user_Login";
import ViewPropertyDetails from "./Components/superAdmin/ViewPropertyDetails";
import AdminLogin from "./Components/admin/admin_Login";
import Users from "./Components/admin/users";
import AssignTask from "./Components/admin/AssignTask";
import ViewTask from "./Components/admin/viewTask";
import ViewSurvey from "./Components/admin/survey_Data";

// Function to check if the user is logged in
const isUserLoggedIn = () => {
  return localStorage.getItem("user_token") !== null;
};

const isAdminLoggedIn = () => {
  return localStorage.getItem("admin_token") !== null;
};

const isSuperAdminLoggedIn = () => {
  return localStorage.getItem("super_admin_token") !== null;
};

// Function to render routes based on login status
const renderRoutes = () => {
  if (isSuperAdminLoggedIn()) {
    return (
      <Routes>
        <Route
          path="/"
          element={<Navigate replace to="viewbuildingdetails" />}
        />
        <Route path="/addcsv" element={<AddCsv />} />
        <Route path="/viewbuildingdetails" element={<ViewPropertyDetails />} />
        <Route
          path="*"
          element={<Navigate to="/viewbuildingdetails" replace />}
        />
      </Routes>
    );
  } else if (isAdminLoggedIn()) {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to="/users" />} />
        <Route path="/admin_login" element={<Navigate replace to="/users" />} />
        <Route path="users" element={<Users />} />
        <Route path="/assignTask/:user_id" element={<AssignTask />} />
        <Route path="/viewTask/:user_id" element={<ViewTask />} />
        <Route path="/viewSurvey/:user_id" element={<ViewSurvey />} />
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Routes>
    );
  } else if (isUserLoggedIn()) {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to="prop_details" />} />
        <Route path="/prop_details" element={<PropertyDetails />} />
        <Route path="*" element={<Navigate to="/prop_details" replace />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/user_login" element={<UserLogin />} />
        <Route path="/admin_login" element={<AdminLogin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }
};

// const renderRoutes = () => {
//   if (isLoggedIn()) {
//     return (
//       <Routes>
//         <Route path="/" element={<Navigate replace to="users" />} />
//         {/* <Route index element={<Navigate replace to="order" />} /> */}
//         <Route path="users" element={<Users />} />
//         <Route path="/assignTask/:user_id" element={<AssignTask />} />
//         <Route path="/viewTask/:user_id" element={<ViewTask />} />
//         <Route path="/viewSurvey/:user_id" element={<ViewSurvey />} />
//       </Routes>
//     );
//   } else {
//     return (
//       <Routes>
//         <Route path="/" element={<AdminLogin />} />
//         {/* <Route path="/user_login" element={<UserLogin />} /> */}
//         {/* <Route path="/admin_login" element={<AdminLogin />} /> */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     );
//   }
// };

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>{renderRoutes()}</BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
