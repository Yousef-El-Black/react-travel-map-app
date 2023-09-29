import Map from "./components/Map/Map";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Map />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
