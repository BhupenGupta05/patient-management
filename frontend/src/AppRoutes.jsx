import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import Registration from "./pages/Registration";
import Appointment from "./pages/Appointment";
import Admin from "./pages/Admin";
import Success from "./pages/Success";

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout>
                        <Home />
                    </Layout>
                }
            />
            <Route path="/patient/registration" element={<Registration />} />
            <Route path="/patient/:patientId/appointment" element={<Appointment type='create' />} />
            <Route path="/patient/success" element={<Success />} />

            <Route path="/admin" element={<Admin />} />

            {/* WILL CREATE THESE AFTER CREATING DASHBOARD */}
            <Route path="/admin/:appointmentId/schedule" element={<Admin />} />
            <Route path="/admin/:appointmentId/cancel" element={<Admin />} />
            <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
    );
};

export default AppRoutes;
