import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "@/common/components/auth/ProtectedRoute";
import PublicRoute from "@/common/components/auth/PublicRoute";
import NotFound from "@/common/components/NotFound";
import AppLayout from "@/common/layout/AppLayout";
import AppSettingsLayout from "@/common/layout/AppSettingsLayout";
import AuthLayout from "@/common/layout/AuthLayout";
import MainLayout from "@/common/layout/MainLayout";

const LazySignIn = lazy(() => import("@/pages/auth/sign-in"));
const LazySignUp = lazy(() => import("@/pages/auth/sign-up"));

const LazyHomePage = lazy(() => import("@/pages/home"));
const LazyInboxPage = lazy(() => import("@/pages/inbox"));
const LazyDashboardPage = lazy(() => import("@/pages/dashboard"));
const LazyOnBoardingPage = lazy(() => import("@/pages/onboarding"));

const LazyInvitePage = lazy(() => import("@/pages/invite"));
const LazyMembersPage = lazy(() => import("@/pages/settings/members"));
const LazySpaceIdPage = lazy(() => import("@/pages/spaces/[:spaceId]"));

const AppRoutes = () => {
  return (
    <BrowserRouter basename="/">
      <Suspense>
        <Routes>
          <Route path="" element={<MainLayout />} caseSensitive>
            {/* ProtectedRoute */}
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<AppLayout />}>
                <Route path="" element={<Navigate to="/home" replace />} />
                <Route path="home" element={<LazyHomePage />} />
                <Route path="dashboard" element={<LazyDashboardPage />} />
                <Route path="inbox" element={<LazyInboxPage />} />

                <Route path="spaces">
                  <Route path=":spaceId" element={<LazySpaceIdPage />} />
                </Route>
              </Route>

              {/* Settings route */}
              <Route path="settings" element={<AppSettingsLayout />}>
                <Route path="members" element={<LazyMembersPage />} />
              </Route>

              <Route path="onboarding" element={<LazyOnBoardingPage />} />
              <Route path="invite" element={<LazyInvitePage />} />
              {/* Other layouts... */}
            </Route>

            {/* Public Route */}
            <Route path="/" element={<PublicRoute />}>
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="sign-in" element={<LazySignIn />} />
                <Route path="sign-up" element={<LazySignUp />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
