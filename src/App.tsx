import AppRoutes from "@/routes/AppRoutes";

// import this BEFORE react
import { Toaster } from "@/design-system/ui/Toast/Toaster";
import { TooltipProvider } from "@/design-system/ui/Tooltip/Tooltip";

import AllGlobalModalProviders from "@/common/providers/AllGlobalDialogProviders";

function App() {
  return (
    <TooltipProvider delayDuration={50}>
      <Toaster />
      <AllGlobalModalProviders>
        <AppRoutes />
      </AllGlobalModalProviders>
    </TooltipProvider>
  );
}

export default App;
