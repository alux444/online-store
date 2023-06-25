import React, { useContext, useState } from "react";
import LoginModal from "./LoginModal";
import AboutModal from "./AboutModal";
import { UserContext } from "../../App";
import logo from "../../images/kiwimartlogo.png";
import banner from "../../images/banner.png";

const Header = () => {
  const [openAbout, setOpenAbout] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const closeAbout = () => {
    setOpenAbout(false);
  };

  const closeLogin = () => {
    setOpenLogin(false);
  };

  return (
    <div className="block">
      <div className="flex sm:flex-col align-center items-center justify-between text-center m-5 p-5 w-[80vw]">
        <div className="flex align-center justify-center items-center">
          <h1 className="title">KiwiMart</h1>
          <img src={logo} className="w-[10vw] ml-5"></img>
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
      </div>
    </div>
  );
};

export default Header;
