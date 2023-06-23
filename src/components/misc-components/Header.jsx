import React, { useContext, useState } from "react";
import LoginModal from "./LoginModal";
import AboutModal from "./AboutModal";
import { UserContext } from "../../App";

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
        <div className="flex items-center">
          <h1 className="md:text-2xl lg:text-4xl">Shop Name Here</h1>
          <h4>Logo here</h4>
        </div>
        <div className="flex items-center justify-end gap-1">
          <button onClick={() => setOpenAbout(true)}>About</button>
          {user.loggedIn ? (
            <button onClick={() => setUser({ loggedIn: false, email: "" })}>
              Sign Out
            </button>
          ) : (
            <button onClick={() => setOpenLogin(true)}>Login</button>
          )}
          <LoginModal open={openLogin} close={closeLogin} />
          <AboutModal open={openAbout} close={closeAbout} />
        </div>
      </div>
      {user.loggedIn ? (
        <p>Welcome, {user.email}</p>
      ) : (
        <p>Welcome to Storename!</p>
      )}
    </div>
  );
};

export default Header;
