import AppRoutes from "@/routes/AppRoutes";

import { Toaster } from "@/design-system/ui/Toast/Toaster";

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
}

export default App;
