import React, { useState } from "react";
import { useAttemptLogin } from "../../utils/useAttemptLogin";

const LoginForm = ({ userLogin, close }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { userAttempt, adminAttempt } = useAttemptLogin();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswodChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    if (userLogin) {
      const success = userAttempt();
      if (success) {
        close();
      } else {
        setMessage("Invalid Login Details.");
      }
    } else {
      const success = adminAttempt();
      if (success) {
        close();
      } else {
        setMessage("Invalid Login Details.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswodChange}
        />
        <button type="submit">Submit</button>
        <small>{message}</small>
      </form>
    </div>
  );
};

export default LoginForm;
