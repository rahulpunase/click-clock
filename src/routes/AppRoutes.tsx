import AppLayout from "@/common/layout/AppLayout";
import MainLayout from "@/common/layout/MainLayout";
import Dashboard from "@/pages/dashboard";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const LazyHomePage = lazy(() => import("@/pages/home"));
const LazyInboxPage = lazy(() => import("@/pages/inbox"));

const AppRoutes = () => {
  return (
    <BrowserRouter basename="/">
      <Suspense>
        <Routes>
          <Route path="" element={<MainLayout />}>
            <Route path="/" element={<AppLayout />}>
              <Route path="home" element={<LazyHomePage />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="inbox" element={<LazyInboxPage />} />
            </Route>

            <Route path="/account" />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
