import React, { useContext, useState } from "react";
import { useAttemptLogin } from "../../utils/useAttemptLogin";
import { AdminContext, UserContext } from "../../App";

const LoginForm = ({ userLogin, close }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setAdmin } = useContext(AdminContext);
  const { setUser } = useContext(UserContext);

  const { userAttempt, adminAttempt } = useAttemptLogin();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswodChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (userLogin) {
      const form = { email: username, password: password };
      const success = await userAttempt(form);
      if (success) {
        setUser({ loggedIn: true, email: form.email });
        close();
      } else {
        setMessage("Invalid Login Details.");
      }
    } else {
      const form = { username: username, password: password };
      const success = await adminAttempt(form);
      if (success) {
        setAdmin(true);
        close();
      } else {
        setMessage("Invalid Login Details.");
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="p-3 flex align-center gap-2 flex-col"
      >
        <input
          type="text"
          placeholder={userLogin ? "Email" : "Username"}
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswodChange}
        />
        <button className="altbutton" type="submit">
          Submit
        </button>
        <small>{message}</small>
      </form>
    </div>
  );
};

export default LoginForm;
