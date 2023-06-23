import useEditCart from "../../../utils/useEditCart";

const CartItemDisplay = ({ item }) => {
  const { addToCart, removeFromCart } = useEditCart();

  const addOneExtra = () => {
    addToCart(item, 1);
  };

  const removeOne = () => {
    removeFromCart(item, 1);
  };

  const removeAll = () => {
    removeFromCart(item, 999);
  };

  return (
    <div>
      <div className="flex justify-center align-center">
        <img src={item.imageUrl} className="" />
      </div>
      <div>
        <p>
          {item.name} x {item.amount} | ${item.price}/each = $
          {item.price * item.amount}
        </p>
        <div className="flex gap-1 align-center justify-center">
          <button onClick={removeAll}>x</button>
          <button onClick={addOneExtra}>+</button>
          <button onClick={removeOne}>-</button>
        </div>
      </div>
    </div>
  );
};

export default CartItemDisplay;
