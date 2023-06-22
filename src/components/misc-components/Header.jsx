import React, { useState } from "react";
import LoginModal from "./LoginModal";
import AboutModal from "./AboutModal";

const Header = () => {
  const [openAbout, setOpenAbout] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const closeAbout = () => {
    setOpenAbout(false);
  };

  const closeLogin = () => {
    setOpenLogin(false);
  };

  return (
    <div className="flex align-center items-center justify-between text-center border-2 m-5 p-5 gap-1 w-[80vw]">
      <div className="flex items-center">
        <h1>Shop Name Here</h1>
        <h4>Logo here</h4>
      </div>
      <div className="flex items-center justify-end gap-1">
        <button onClick={() => setOpenAbout(true)}>About</button>
        <button onClick={() => setOpenLogin(true)}>Login</button>
      </div>
      <LoginModal open={openLogin} close={closeLogin} />
      <AboutModal open={openAbout} close={closeAbout} />
    </div>
  );
};

export default Header;
