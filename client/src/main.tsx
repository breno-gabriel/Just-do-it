import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from "./components/protect-route.tsx"; // Importa aqui

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/home",
    element: <ProtectedRoute children={<Home />} />,  // ⛔ Protegendo essa rota
    children: [
      {
        path: "",  // equivale a "/home"
        element: <Home />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <Toaster />
  </StrictMode>
);
