import { Button } from "@/design-system/ui/Button/Button";
import { Badge } from "@/design-system/ui/Badge/Badge";
import AppLayout from "./common/layout/AppLayout";

function App() {
  return (
    <AppLayout>
      <div>
        <Button variant="default">I am it</Button>
        <Badge>Hello</Badge>
      </div>
    </AppLayout>
  );
}

export default App;
