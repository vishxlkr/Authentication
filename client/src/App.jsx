// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthPage from "./pages/AuthPage"; // single combined auth page
// import HomePage from "./pages/Homepage"; // your home page
// import { Toaster } from "react-hot-toast";

// function App() {
//    return (
//       <>
//          <Toaster position="top-right" reverseOrder={false} />
//          <Router>
//             <Routes>
//                {/* Combined auth page for login, signup, reset, otp, new password */}
//                <Route path="/auth" element={<AuthPage />} />

//                {/* Home page */}
//                <Route path="/home" element={<HomePage />} />

//                {/* Default redirect to /auth */}
//                <Route path="*" element={<AuthPage />} />
//             </Routes>
//          </Router>
//       </>
//    );
// }

// export default App;

// import { Routes, Route, Navigate } from "react-router-dom";
// import AuthPage from "./pages/AuthPage";
// import Homepage from "./pages/Homepage";
// import { useAuth } from "./context/AuthContext";

// function RequireAuth({ children }) {
//    const { user, token } = useAuth();
//    if (!token && !user) {
//       return <Navigate to="/" replace />;
//    }
//    return children;
// }

// export default function App() {
//    return (
//       <Routes>
//          <Route path="/" element={<AuthPage />} />
//          <Route
//             path="/home"
//             element={
//                <RequireAuth>
//                   <Homepage />
//                </RequireAuth>
//             }
//          />
//       </Routes>
//    );
// }
import React from "react";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import Homepage from "./pages/Homepage";

// Protect private routes
function RequireAuth({ children }) {
   const { user, token } = useAuth();
   if (!token && !user) {
      return <Navigate to="/" replace />;
   }
   return children;
}

export default function App() {
   return (
      <AuthProvider>
         <Router>
            <Toaster position="top-right" />
            <Routes>
               {/* Public auth page */}
               <Route path="/" element={<AuthPage />} />

               {/* Protected homepage */}
               <Route
                  path="/home"
                  element={
                     <RequireAuth>
                        <Homepage />
                     </RequireAuth>
                  }
               />

               {/* Redirect unknown routes */}
               <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
         </Router>
      </AuthProvider>
   );
}
