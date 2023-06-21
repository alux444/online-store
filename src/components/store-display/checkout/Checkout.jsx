import React, { useState } from "react";
import CheckoutModal from "./CheckoutModal";

const Checkout = () => {
  const [showCheckout, setShowCheckout] = useState(false);

  const closeCheckout = () => {
    setShowCheckout(false);
  };

  return (
    <div>
      <button onClick={() => setShowCheckout(true)}>Proceed to Checkout</button>
      <CheckoutModal open={showCheckout} close={closeCheckout} />
    </div>
  );
};

export default Checkout;
