import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/Store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom"; // 👈 import BrowserRouter
import "./index.css";
import App from "./App.tsx";
import "./i18n";

const queryClient = new QueryClient();

// chay MSW chi trong moi truong development
if (import.meta.env.MODE === "development") {
  (async () => {
    const { worker } = await import("@/mocks/Browser.ts");
    worker.start();
  })();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
