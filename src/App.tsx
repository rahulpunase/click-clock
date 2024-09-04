import AppRoutes from "@/routes/AppRoutes";

import AppAlertProvider from "@/common/providers/AppAlertProvider/AppAlertProvider";

function App() {
  return (
    <AppAlertProvider>
      <AppRoutes />;
    </AppAlertProvider>
  );
}

export default App;
