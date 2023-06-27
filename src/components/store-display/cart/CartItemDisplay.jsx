import useEditCart from "../../../utils/useEditCart";
import image from "../../../utils/noImage.svg";
import { useAccessCart } from "../../../utils/useAccessCart";

const CartItemDisplay = ({ item }) => {
  const { addToCart, removeFromCart } = useEditCart();
  const { saveCart } = useAccessCart();

  const addOneExtra = async () => {
    addToCart(item, 1);
    saveCart();
  };

  const removeOne = async () => {
    removeFromCart(item, 1);
    saveCart();
  };

  const removeAll = async () => {
    removeFromCart(item, 999);
    saveCart();
  };

  return (
    <div>
      <div className="flex justify-center align-center gap-1">
        <div className="flex justify-start w-[100%] flex-wrap">
          <img
            src={item.imageUrl == "" ? image : item.imageUrl}
            className="sm:max-h-[10vh] max-h-[8vh] lg"
          />
          <div className="flex flex-col justify-start flex-wrap align-center sm:justify-center ">
            <p className="text-sm">{item.name}</p>
            <small className="self-start">
              ${parseFloat(item.price).toFixed(2)}/each = $
              {parseFloat(item.price * item.amount).toFixed(2)}
            </small>
          </div>
        </div>
        <div className="flex gap-1 align-center justify-center items-center">
          <button
            className="deletebutton hover:bg-[#ec2917] hover:text-white hover:border-white h-min"
            onClick={removeAll}
          >
            x
          </button>
          <button className="altbutton h-min" onClick={addOneExtra}>
            +
          </button>
          <p className="price">{item.amount}</p>
          <button className="altbutton h-min" onClick={removeOne}>
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemDisplay;
