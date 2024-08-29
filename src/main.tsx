import { ConvexClientProvider } from "@/common/providers/ConvexClientProviders.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./design-system/style/global.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexClientProvider>
      <App />
    </ConvexClientProvider>
  </StrictMode>
);
