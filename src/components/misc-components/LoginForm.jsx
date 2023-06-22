import React, { useState } from "react";
import { useAttemptLogin } from "../../utils/useAttemptLogin";

const LoginForm = ({ userLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { userAttempt, adminAttempt } = useAttemptLogin();

  const onSubmit = (e) => {
    e.preventDefault();
    if (userLogin) {
      userAttempt();
    } else {
      adminAttempt();
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
