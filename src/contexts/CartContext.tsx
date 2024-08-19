import { createContext, ReactNode, useState, useEffect } from "react"; // Importa funções necessárias do React
import { ProductProps } from "../pages/home"; // Importa a interface ProductProps de um arquivo específico

// Define a interface CartContextData que descreve a estrutura do contexto do carrinho
interface CartContextData {
  cart: CartProps[]; // Um array de itens do carrinho
  cartAmount: number; // A quantidade total de itens no carrinho
  addItemCart: (newItem: ProductProps) => void; // Função para adicionar um item ao carrinho
  removeItemCart: (product: CartProps) => void; // Função para remover um item do carrinho
  total: string; // Total formatado do carrinho
  descriptionItem: (product: ProductProps) => void;
  productDescription: ProductProps[];
}

// Define a interface CartProps que descreve a estrutura de cada item no carrinho
interface CartProps {
  id: number; // ID único do produto
  title: string; // Título do produto
  description: string; // Descrição do produto
  price: number; // Preço do produto
  cover: string; // URL da imagem do produto
  amount: number; // Quantidade do produto no carrinho
  total: number; // Total (quantidade * preço) do produto no carrinho
}

// Define a interface CartProviderProps que descreve as propriedades do provedor
interface CartProviderProps {
  children: ReactNode; // Elementos filhos que serão renderizados dentro do provedor
}

// Cria o contexto do carrinho com um valor inicial vazio
export const CartContext = createContext({} as CartContextData);

// Função do provedor do contexto do carrinho
function CartProvider({ children }: CartProviderProps) {
  // Cria um estado para armazenar os itens do carrinho
  const [cart, setCart] = useState<CartProps[]>([]);
  const [total, setTotal] = useState(""); // Estado para o total formatado
  const [productDescription, setProductDescription] = useState<ProductProps[]>(
    []
  );

  // Função para adicionar um novo item ao carrinho
  function addItemCart(newItem: ProductProps) {
    // Verifica se o item já existe no carrinho
    const indexItem = cart.findIndex((item) => item.id === newItem.id);

    if (indexItem !== -1) {
      // Se o item já existe no carrinho
      const cartList = [...cart]; // Cria uma cópia do carrinho
      cartList[indexItem].amount += 1; // Aumenta a quantidade do item
      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price; // Atualiza o total do item
      setCart(cartList); // Atualiza o estado do carrinho
    } else {
      // Se o item não existe no carrinho
      const data = {
        ...newItem, // Copia as propriedades do novo item
        amount: 1, // Define a quantidade inicial como 1
        total: newItem.price, // Define o total inicial como o preço do item
      };
      setCart((products) => [...products, data]); // Adiciona o novo item ao carrinho
    }
    totalResultCart([...cart, { ...newItem, amount: 1, total: newItem.price }]); // Atualiza o total
  }

  // Função para remover um item do carrinho
  function removeItemCart(product: CartProps) {
    const indexItem = cart.findIndex((item) => item.id === product.id);

    if (indexItem !== -1) {
      // Verifica se o item existe no carrinho
      if (cart[indexItem].amount > 1) {
        // Se a quantidade for maior que 1
        const cartList = [...cart]; // Cria uma cópia do carrinho
        cartList[indexItem].amount -= 1; // Diminui a quantidade do item
        cartList[indexItem].total =
          cartList[indexItem].amount * cartList[indexItem].price; // Atualiza o total do item
        setCart(cartList); // Atualiza o estado do carrinho
      } else {
        // Se a quantidade for 1, remove o item
        const removeItem = cart.filter((item) => item.id !== product.id);
        setCart(removeItem); // Atualiza o estado do carrinho
      }
      totalResultCart(cart); // Atualiza o total após remoção
    }
  }

  // Função para calcular o total do carrinho
  function totalResultCart(items: CartProps[]) {
    const result = items.reduce((acc, obj) => acc + obj.total, 0); // Soma os totais dos itens

    const format = result.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setTotal(format); // Atualiza o total formatado
  }

  function descriptionItem(product: ProductProps) {
    setProductDescription([product]);
  }

  // Atualiza o total sempre que o carrinho muda
  useEffect(() => {
    totalResultCart(cart);
  }, [cart]);

  // Retorna o provedor do contexto com os valores do carrinho e as funções
  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addItemCart,
        removeItemCart,
        total,
        descriptionItem,
        productDescription,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Exporta o provedor para ser utilizado em outros componentes
export default CartProvider;
