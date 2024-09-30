import AppRoutes from "@/routes/AppRoutes";

import { Toaster } from "@/design-system/ui/Toast/Toaster";
import { TooltipProvider } from "@/design-system/ui/Tooltip/Tooltip";

function App() {
  console.log("staging");
  return (
    <TooltipProvider delayDuration={50}>
      <AppRoutes />
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
