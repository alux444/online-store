import React, { useContext, useState } from "react";
import LoginModal from "./LoginModal";
import AboutModal from "./AboutModal";
import { UserContext } from "../../App";
import logo from "../../images/kiwimartlogo.png";

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
        <div className="flex">
          <h1 className="md:text-2xl lg:text-4xl title">KiwiMart</h1>
          <img src={logo} className="w-28 ml-5"></img>
        </div>
        <div className="flex items-center justify-end gap-1">
          <button className="altbutton" onClick={() => setOpenAbout(true)}>
            About
          </button>
          {user.loggedIn ? (
            <button
              className="altbutton"
              onClick={() => setUser({ loggedIn: false, email: "" })}
            >
              Sign Out
            </button>
          ) : (
            <button className="altbutton" onClick={() => setOpenLogin(true)}>
              Login
            </button>
          )}
          <LoginModal open={openLogin} close={closeLogin} />
          <AboutModal open={openAbout} close={closeAbout} />
        </div>
      </div>
      {user.loggedIn ? (
        <p>Welcome, {user.email}</p>
      ) : (
        <p>Welcome to KiwiMart!</p>
      )}
      <img src="" />
      {/* HEADER BANNER HERE. */}
    </div>
  );
};

export default Header;
