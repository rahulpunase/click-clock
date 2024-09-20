import { createRoot } from "react-dom/client";

import { ConvexClientProvider } from "@/common/providers/ConvexClientProviders.tsx";

import App from "./App.tsx";
import "./design-system/style/global.scss";

document
  .querySelector("html")
  ?.setAttribute("theme-preference", localStorage.getItem("theme") ?? "light");

createRoot(document.getElementById("root")!).render(
  <ConvexClientProvider>
    <App />
  </ConvexClientProvider>,
);
