import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";

export default function Carrinho() {
  const { cart, total, addItemCart, removeItemCart } = useContext(CartContext);

  return (
    <div className="w-full  max-auto flex justify-center flex-col items-center">
      <h1 className="font-medium text-2xl text-center my-4">Meu carrinho</h1>

      {cart.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full">
          <p className="font-medium">Ops seu carrinho está vazio...</p>
          <Link
            to="/"
            className="bg-slate-600 my-3 p-1 px-3 text-white font-medium rounded"
          >
            Acessar produtos
          </Link>
        </div>
      )}

      {cart.map((item) => (
        <section
          className="flex items-center justify-between border-b-2 border-gray-300 w-10/12"
          key={item.id}
        >
          <img className="w-28" src={item.cover} alt="" />
          <strong>{item.title}</strong>

          <div className="flex items-center justify-center gap-3">
            <button
              className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center"
              onClick={() => removeItemCart(item)}
            >
              -
            </button>
            {item.amount}
            <button
              className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center"
              onClick={() => addItemCart(item)}
            >
              +
            </button>
          </div>

          <strong className="float-right">
            Subtotal:{" "}
            {item.total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
        </section>
      ))}

      {cart.length !== 0 && <p className="font-bold ">Total: {total}</p>}
    </div>
  );
}
