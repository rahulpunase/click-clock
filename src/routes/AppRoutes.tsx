import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicRoute from "@/routes/PublicRoute";
import { lazyLoadComponent, lazyWrapper } from "@/routes/utils";
import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import { AppLayout } from "@/common/layout/AppLayout";
import AppSettingsLayout from "@/common/layout/AppSettingsLayout";
import AuthLayout from "@/common/layout/AuthLayout";
import { MainLayout } from "@/common/layout/MainLayout";

const LazySignIn = lazyLoadComponent(
  "SignInPage",
  lazy(() => import("@/pages/auth/sign-in")),
);
const LazySignUp = lazyLoadComponent(
  "SignUpPage",
  lazy(() => import("@/pages/auth/sign-up")),
);

const taskPageRoute = (
  <Route
    path="task/:taskId"
    lazy={lazyWrapper(() => import("@/pages/tasks/[:taskId]"))}
  />
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<MainLayout />} caseSensitive>
      <Route path="" element={<ProtectedRoute />}>
        <Route path="" element={<AppLayout />}>
          <Route path="" element={<Navigate to="/home" replace />} />
          <Route path="home" lazy={lazyWrapper(() => import("@/pages/home"))} />
          <Route
            path="documents"
            lazy={lazyWrapper(() => import("@/pages/documents"))}
          />
          <Route
            path="dashboard"
            lazy={lazyWrapper(() => import("@/pages/dashboard"))}
          />

          <Route path="inbox" lazy={lazyWrapper(() => import("@/pages/inbox"))}>
            <Route
              path="c/:channelId"
              lazy={lazyWrapper(() => import("@/pages/inbox/[channelId]"))}
            />
          </Route>

          <Route
            path="s/:spaceId"
            lazy={lazyWrapper(() => import("@/pages/spaces/SpaceIdIndexPage"))}
          />

          {/* List Routes */}
          <Route
            path="s/:spaceId/l"
            lazy={lazyWrapper(() => import("@/pages/list/"))}
          >
            <Route
              path=":viewType/:listId"
              lazy={lazyWrapper(
                () => import("@/pages/list/components/childPages/ViewTypePage"),
              )}
            >
              {taskPageRoute}
            </Route>
          </Route>

          {/* Task route */}
          {taskPageRoute}

          {/* Doc routes */}
          <Route
            path="doc/:docId"
            lazy={lazyWrapper(() => import("@/pages/doc/[:docId]"))}
          />
        </Route>

        {/* Settings route */}
        <Route path="settings" element={<AppSettingsLayout />}>
          <Route
            path="members"
            lazy={lazyWrapper(() => import("@/pages/settings/members"))}
          />
          <Route
            path="profile"
            lazy={lazyWrapper(() => import("@/pages/settings/profile"))}
          />
        </Route>

        <Route
          path="onboarding"
          lazy={lazyWrapper(() => import("@/pages/onboarding"))}
        />

        <Route
          path="invite"
          lazy={lazyWrapper(() => import("@/pages/invite"))}
        />
      </Route>

      {/* Other layouts... */}
      <Route path="/" element={<PublicRoute />}>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<LazySignIn />} />
          <Route path="sign-up" element={<LazySignUp />} />
        </Route>

        <Route
          path="dev-utility"
          lazy={lazyWrapper(() => import("@/pages/devUtility"))}
        />
      </Route>
    </Route>,
  ),
);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
