import AppRoutes from "@/routes/AppRoutes";

import { Toaster } from "@/design-system/ui/Toast/Toaster";

import AppAlertProvider from "@/common/providers/AppAlertProvider/AppAlertProvider";

function App() {
  return (
    <>
      <AppAlertProvider>
        <AppRoutes />
      </AppAlertProvider>
      <Toaster />
    </>
  );
}

export default App;
