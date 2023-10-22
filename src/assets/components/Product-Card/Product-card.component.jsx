import { useContext } from "react";
import { cartContext } from "../../../Contexts/Cart.context";

const ProductCard = ({ product }) => {
  const { cartItems, setCartItems } = useContext(cartContext);

  const addProductToCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      product.quantity += 1;
      setCartItems([...cartItems]);
    } else {
      product.quantity = 1;
      setCartItems([...cartItems, product]);
    }
  };

  return (
    <div className="flex flex-col text-xl hover:cursor-pointer">
      <img
        className="rounded-xl "
        src="https://i.ibb.co/sF4Zxjy/all-over-print-case-1.jpg"
        alt="img"
      />
      <h1 className="p-1 pt-2 ">{product.name}</h1>
      <p className="p-1">${product.price}</p>
      <button onClick={addProductToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
