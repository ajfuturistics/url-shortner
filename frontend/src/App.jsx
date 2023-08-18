import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import Home from "./pages/home/Home";
import User from "./pages/user/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/user",
    element: <User />,
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <main className="main-container">
          <RouterProvider router={router} />
        </main>
      </AuthProvider>
    </>
  );
}

export default App;
