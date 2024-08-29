import NotFound from "@/common/components/NotFound";
import AppLayout from "@/common/layout/AppLayout";
import AuthLayout from "@/common/layout/AuthLayout";
import MainLayout from "@/common/layout/MainLayout";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const LazySignIn = lazy(() => import("@/pages/auth/sign-in"));
const LazySignUp = lazy(() => import("@/pages/auth/sign-up"));

const LazyHomePage = lazy(() => import("@/pages/home"));
const LazyInboxPage = lazy(() => import("@/pages/inbox"));
const LazyDashboard = lazy(() => import("@/pages/dashboard"));

const AppRoutes = () => {
  return (
    <BrowserRouter basename="/">
      <Suspense>
        <Routes>
          <Route path="" element={<MainLayout />} caseSensitive>
            <Route path="/" element={<AppLayout />}>
              <Route path="" element={<Navigate to="/home" replace />} />
              <Route path="home" element={<LazyHomePage />} />
              <Route path="dashboard" element={<LazyDashboard />} />
              <Route path="inbox" element={<LazyInboxPage />} />
            </Route>

            <Route path="/auth" element={<AuthLayout />}>
              <Route path="sign-in" element={<LazySignIn />} />
              <Route path="sign-up" element={<LazySignUp />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
