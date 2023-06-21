const CartItemDisplay = ({ item }) => {
  return (
    <div>
      <div className="flex justify-center align-center">
        <img src={item.imageUrl} className="" />
      </div>
      <div>
        <p>
          {item.name} x {item.amount}
          <button>X</button>
        </p>
        <p>
          ${item.price}/each = ${item.price * item.amount}
        </p>
      </div>
    </div>
  );
};

export default CartItemDisplay;
