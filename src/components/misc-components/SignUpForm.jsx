import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { checkExisting } from "../../utils/checkExisting";
import { signUp } from "../../utils/signUp";

const SignUpForm = ({ close }) => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    if (e.target.value.length < 40) {
      setPassword(e.target.value);
    }
  };

  const handleConfirmChange = (e) => {
    if (e.target.value.length < 40) {
      setConfirm(e.target.value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirm) {
      setMessage("Passwords don't match.");
    }

    const form = { email: email, password: password };

    const userAlreadyExists = await checkExisting(form.email);

    console.log(userAlreadyExists);

    if (userAlreadyExists) {
      setMessage("Email is already in use.");
    } else {
      const signedUp = signUp(form);
      if (signedUp) {
        setUser({ loggedIn: true, email: form.email });
        close();
      } else {
        setMessage("Error signing up.");
      }
    }
  };

  return (
    <div className="p-3 block">
      <form
        onSubmit={onSubmit}
        className="p-3 flex align-center gap-2 flex-col"
      >
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <input
          type="password"
          value={confirm}
          onChange={handleConfirmChange}
          placeholder="Confirm Password"
        />
        <button type="submit">Submit</button>
        {message}
      </form>
    </div>
  );
};

export default SignUpForm;
