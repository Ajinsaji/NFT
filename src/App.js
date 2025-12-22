import { Routes, Route } from "react-router-dom";


import HomePage from "./public/HomePage";
import Verify from "./public/Verify";
import About from "./public/About";

import Login from "./Auth/Login";
import Signup from "./Auth/Signup";


import StudentDashboard from "./Profile/StudentDashboard";
import StudentProfile from "./Profile/StudentProfile";
import AccountSettings from "./Profile/AccountSettings";
import StudentCertificates from "./Profile/StudentCertificates";


import InstitutionDashboard from "./Auth/institution/InstitutionDashboard";
import IssueCertificate from "./Auth/institution/IssueCertificate";
import InstitutionProfile from "./Auth/institution/InstitutionProfile";
import InstitutionAccountSettings from "./Auth/institution/InstitutionAccountSettings";


import AdminDashboard from "./admin/AdminDashboard";
import AdminRequests from "./admin/AdminRequests";
import AdminInstitutions from "./admin/AdminInstitutions";
import AdminStudents from "./admin/AdminStudents";
import AdminCertificates from "./admin/AdminCertificates";
import AdminProfile from "./admin/AdminProfile";
import AdminAccountSettings from "./admin/AdminAccountSettings";

function App() {
  return (
    <Routes>
     
      <Route path="/" element={<HomePage />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/about" element={<About />} />

  
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/student-profile" element={<StudentProfile />} />
      <Route path="/student-certificates" element={<StudentCertificates />} />
      <Route path="/account-settings" element={<AccountSettings />} />


      <Route
        path="/institution-dashboard"
        element={<InstitutionDashboard />}
      />
      <Route path="/issue-certificate" element={<IssueCertificate />} />

      <Route path="/institution-profile" element={<InstitutionProfile />} />
      <Route path="/institution-account-settings" element={<InstitutionAccountSettings />} />


      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-requests" element={<AdminRequests />} />
      <Route path="/admin-institutions" element={<AdminInstitutions />} />
      <Route path="/admin-students" element={<AdminStudents />} />
      <Route path="/admin-certificates" element={<AdminCertificates />} />
      <Route path="/admin-profile" element={<AdminProfile />} />
      <Route path="/admin-account-settings" element={<AdminAccountSettings />} />
    </Routes>
  );
}

export default App;
