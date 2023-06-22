import React, { useState } from "react";

const Header = () => {
  const [openAbout, setOpenAbout] = useState(false);

  const closeAbout = () => {
    setOpenAbout(false);
  };

  return (
    <div className="flex align-center items-center justify-between text-center border-2 m-5 p-5 gap-1 w-[80vw]">
      <div className="flex items-center">
        <h1>Shop Name Here</h1>
        <h4>Logo here</h4>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={() => setOpenAbout(true)}>About</button>
        <button>Login</button>
      </div>
    </div>
  );
};

export default Header;
