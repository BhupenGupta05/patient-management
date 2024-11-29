import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Spinner from "./components/Spinner";

const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./layouts/Layout"));
const Registration = lazy(() => import("./pages/Registration"));
const Appointment = lazy(() => import("./pages/Appointment"));
const Admin = lazy(() => import("./pages/Admin"));
const Success = lazy(() => import("./pages/Success"));

const AppRoutes = () => {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col sm:px-6 lg:px-8">
        {/* Global SEO Metadata */}
        <Helmet>
          <title>WeCare - Your Healthcare Solution</title>
          <meta name="description" content="Manage your healthcare appointments with ease using WeCare." />
          <meta name="keywords" content="WeCare, Healthcare, Appointments, Patient Management" />
          <link rel="canonical" href="https://yourdomain.com" />
        </Helmet>

        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <Layout>
                  <Helmet>
                    <title>WeCare - Home</title>
                  </Helmet>
                  <Home />
                </Layout>
              }
            />

            {/* Other Lazy-loaded Routes */}
            <Route path="/patient/registration" element={<Registration />} />
            <Route path="/patient/:patientId/appointment" element={<Appointment type="create" />} />
            <Route path="/patient/success" element={<Success />} />
            <Route path="/admin" element={<Admin />} />

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
