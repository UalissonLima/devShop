import { RouterProvider } from "react-router-dom";
import { router } from "./routers";
import CartProvider from "./contexts/CartContext";

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router}></RouterProvider>;
    </CartProvider>
  );
}

export default App;
