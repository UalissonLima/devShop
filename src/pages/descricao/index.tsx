import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { ProductProps } from "../home";
import { BsCartPlus } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import "./descricao.css";

export default function Descricao() {
  const { productDescription, addItemCart } = useContext(CartContext);
  const [productCosumido, setProductCosumido] = useState<ProductProps[]>([]);

  useEffect(() => {
    function handleAddProduct() {
      setProductCosumido(productDescription);
    }

    handleAddProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <>
      {productCosumido.map((product) => (
        <section key={product.id} className="containerConteudoDescricao">
          <div className="containerImagem">
            <img src={product.cover} alt={product.title} />
          </div>

          <div className="cotaineirDescricao">
            <strong>{product.title}</strong>
            <p>{product.description}</p>

            <div className="cotainerBtnAddCart">
              <p>
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>

              <button  onClick={() => handleAddCartItem(product)}>
                <BsCartPlus
                  size={25}
                  color="#FFF"
                 
                ></BsCartPlus>
              </button>
            </div>
          </div>
        </section>
      ))}
      <ToastContainer />
    </>
  );
}
