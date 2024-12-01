import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import AddCoffee from "./components/AddCoffee.jsx";
import UpdateCoffee from "./components/UpdateCoffee.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import SignInForm from "./components/SignInForm.jsx";
import SignupForm from "./components/SignupForm.jsx";
import { AuthProvider } from "./providers/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://localhost:4500/coffee"),
      },

      {
        path: "/addCoffee",
        element: <AddCoffee />,
      },
      {
        path: "/updateCoffee/:id",
        element: <UpdateCoffee />,
        loader: ({ params }) =>
          fetch(`http://localhost:4500/coffee/${params.id}`),
      },
      {
        path: "/signin",
        element: <SignInForm></SignInForm>,
      },
      {
        path: "/signup",
        element: <SignupForm></SignupForm>,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
