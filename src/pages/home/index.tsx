import { useEffect, useState, useContext } from "react";
import { BsCartPlus } from "react-icons/bs";
import { api } from "../../services/api";
import { CartContext } from "../../contexts/CartContext";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}

export default function Home() {
  const { addItemCart, descriptionItem } = useContext(CartContext);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/products");
      setProducts(response.data);
    }

    getProducts();
  }, []);

  function handleAddCartItem(product: ProductProps) {
    addItemCart(product);
    mostrarSucesso();
  }

  function mostrarSucesso() {
    toast.success("Produto adicionado ao carrinho!", {
      position: "bottom-right",
      autoClose: 2000,
      closeOnClick: true,
    });
  }

  function handleDescriptionProduct(
    product: ProductProps,
    idProduct: string | number
  ) {
    const id: string | number = idProduct;
    descriptionItem(product);
    navigate(`/descricao/${id}`, { replace: true });
  }

  return (
    <div>
      <main className="w-full  px-4 mx-auto">
        <h1 className="font-bold text-2xl mb-4 mt-10 text-center">
          Produtos em alta
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {products.map((product) => (
            <section key={product.id} className="w-full cursor-pointer">
              <img
                className="w-full rounded-lg max-h-70 mb-2"
                onClick={() => handleDescriptionProduct(product, product.id)}
                src={product.cover}
                alt={product.title}
              />
              <p className="font-medium mt-1 mb-2">{product.title}</p>

              <div className="flex gap-3 items-center">
                <strong className="text-zinc-700/90">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
                <button
                  className="bg-zinc-900 p-1 rounded"
                  onClick={() => handleAddCartItem(product)}
                >
                  <BsCartPlus size={20} color="#FFF" />
                </button>
              </div>
            </section>
          ))}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
