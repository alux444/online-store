import { Modal } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { AdminContext } from "../../App";
import useOutsideClick from "../../utils/useOutsideClose";
import LoginForm from "./LoginForm";
import SignUpModal from "./SignUpForm";
import SignUpForm from "./SignUpForm";

const LoginModal = ({ open, close }) => {
  const { setAdmin } = useContext(AdminContext);
  const [loginForUser, setLoginForUser] = useState(true);
  const [openSignUp, setOpenSignUp] = useState(false);

  const modalRef = useRef(null);
  useOutsideClick(modalRef, close);

  return (
    <div>
      <Modal open={open}>
        <div className="w-screen h-screen flex align-center items-center justify-center">
          <div
            className="flex bg-white p-3 border-2 text-center"
            ref={modalRef}
          >
            {loginForUser ? (
              openSignUp ? (
                <div>
                  <p>Sign Up</p>
                  <SignUpForm />
                  <button onClick={() => setOpenSignUp(false)}>
                    Return to Login
                  </button>
                </div>
              ) : (
                <div>
                  <p>User Login</p>
                  <LoginForm userLogin={loginForUser} close={close} />
                  <button onClick={() => setOpenSignUp(true)}>Sign Up</button>
                  <button onClick={() => setLoginForUser(false)}>
                    Admin Login
                  </button>
                </div>
              )
            ) : (
              <div>
                <p>Admin Login</p>
                <LoginForm userLogin={loginForUser} close={close} />
                <button onClick={() => setLoginForUser(true)}>
                  User Login
                </button>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
