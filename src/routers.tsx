import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Carrinho from "./pages/carrinho";
import Layout from "./components/layout";
import Descricao from "./pages/descricao";

const router = createBrowserRouter([
  {
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/carrinho",
        element: <Carrinho></Carrinho>,
      },
      {
        path: "/descricao/:id",
        element: <Descricao></Descricao>
      },
    ],
  },
]);

export { router };
