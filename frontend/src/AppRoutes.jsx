import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Spinner from "./components/Spinner";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import Departments from "./components/Departments";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";

const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./layouts/Layout"));
const Layout2 = lazy(() => import("./layouts/Layout2"));
const Registration = lazy(() => import("./pages/Registration"));
const Appointment = lazy(() => import("./pages/Appointment"));
const AppointmentForm = lazy(() => import("./components/AppointmentForm"))
const Admin = lazy(() => import("./pages/Admin"));
const Success = lazy(() => import("./pages/Success"));

const AppRoutes = () => {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col sm:px-6 lg:px-8">
        {/* Global SEO Metadata */}
        <Helmet>
          <title>NurtureMed - Your Healthcare Solution</title>
          <meta name="description" content="Manage your healthcare appointments with ease using NurtureMed." />
          <meta name="keywords" content="NurtureMed, Healthcare, Appointments, Patient Management" />
          <link rel="canonical" href="https://yourdomain.com" />
        </Helmet>

        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <Layout2>
                  <Helmet>
                    <title>NurtureMed - Home</title>
                  </Helmet>
                  {/* <Home /> */}
                  {/* <Navbar /> */}
                  <HeroBanner />
                  <Departments />
                  <Doctors />
                </Layout2>
              }
            />

            <Route path="/doctors"
              element={
                <Layout2>
                  <Doctors />
                </Layout2>}
            />

            <Route path="/about"
              element={
                <Layout2>
                  <About />
                </Layout2>}
            />

            <Route path="/contact"
              element={
                <Layout2>
                  <Contact />
                </Layout2>}
            />

            {/* Other Lazy-loaded Routes */}
            <Route path="/patient/registration" element={<Registration />} />
            <Route path="/patient/:patientId/appointment" element={<Appointment type="create" />} />
            <Route path="/patient/success" element={<Success />} />
            <Route path="/admin" element={<Admin />} />

            <Route path="/admin/:appointmentId/schedule" element={<Admin />} />
            <Route path="/admin/:appointmentId/cancel" element={<Admin />} />


            {/* Fallback Route */}
            <Route
              path="*"
              element={
                <Navigate to="/" />
              }
            />
          </Routes>
        </Suspense>
      </div>
    </HelmetProvider>
  );
};

export default AppRoutes;
