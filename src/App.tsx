import { Toaster } from "./components/ui/sonner";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <AppRoutes />
    </>
  );
}

export default App;
