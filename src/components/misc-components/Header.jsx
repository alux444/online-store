import React, { useContext, useState } from "react";
import LoginModal from "./LoginModal";
import AboutModal from "./AboutModal";
import { UserContext, AdminContext } from "../../App";
import logo from "../../images/kiwimartlogo.png";
import Cart from "../store-display/cart/Cart";

const Header = ({ wobble, setWobble }) => {
  const [openAbout, setOpenAbout] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { setAdmin } = useContext(AdminContext);

  const closeAbout = () => {
    setOpenAbout(false);
  };

  const closeLogin = () => {
    setOpenLogin(false);
  };

  return (
    <div className="block sm:relative bg-white">
      <div className="flex sm:flex-col align-center items-center justify-between lg:justify-center lg:gap-2 text-center m-2 p-5 w-[80vw] border-2 flex-wrap">
        <div className="flex align-center justify-center items-center">
          <h1 className="title">KiwiMart</h1>
          <button
            className="w-[10vw] border-none p-1 bg-white"
            onClick={() => setAdmin(false)}
          >
            <img src={logo} className="w-full m-0 logoicon"></img>
          </button>
        </div>
        <div className="flex items-center justify-end gap-1">
          <button className="lgbutton" onClick={() => setOpenAbout(true)}>
            About
          </button>
          {user.loggedIn ? (
            <button
              className="lgbutton"
              onClick={() => setUser({ loggedIn: false, email: "" })}
            >
              Sign Out
            </button>
          ) : (
            <button className="lgbutton" onClick={() => setOpenLogin(true)}>
              Login
            </button>
          )}
          <LoginModal open={openLogin} close={closeLogin} />
          <AboutModal open={openAbout} close={closeAbout} />
        </div>
        <Cart wobble={wobble} setWobble={setWobble} />
      </div>
      {user.loggedIn ? (
        <div>
          <p>Welcome to KiwiMart, {user.email.split("@")[0]}!</p>
          <small>Enjoy an automatic 5% discount!</small>
        </div>
      ) : (
        <div>
          <p>Welcome to KiwiMart!</p>
          <small>Sign up for a 5% discount on all purchases!</small>
        </div>
      )}
    </div>
  );
};

export default Header;
