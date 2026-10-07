
import React from "react";

import ReactDOM from "react-dom/client";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import "./index.css";

import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Dashboard from "./dashboard_admin.jsx";
import About from "./about.jsx";
import Contact from "./contact.jsx";
import ResetPassword from "./ResetPassword.jsx";


// ==================================================
// PROTECTED ROUTE
// ==================================================

const ProtectedRoute = ({ children }) => {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};


// ==================================================
// APPLICATION
// ==================================================

ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>

        <BrowserRouter>

            <Routes>

                {/* ==========================================
                    FIRST PAGE = SIGNUP
                ========================================== */}

                <Route
                    path="/"
                    element={<Signup />}
                />

                {/* ==========================================
                    SIGNUP PAGE
                ========================================== */}

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                {/* ==========================================
                    LOGIN PAGE
                ========================================== */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* ==========================================
                    DASHBOARD
                ========================================== */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* ==========================================
                    ABOUT
                ========================================== */}

                <Route
                    path="/about"
                    element={
                        <ProtectedRoute>
                            <About />
                        </ProtectedRoute>
                    }
                />


                {/* ==========================================
                    CONTACT
                ========================================== */}

                <Route
                    path="/contact"
                    element={
                        <ProtectedRoute>
                            <Contact />
                        </ProtectedRoute>
                    }
                />


                {/* ==========================================
                    RESET PASSWORD
                ========================================== */}

                <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                />


                {/* ==========================================
                    WRONG URL
                ========================================== */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>

    </React.StrictMode>
);

