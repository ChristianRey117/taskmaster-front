import { useState } from "react";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // const dispatch = useDispatch<AppDispatch>();
  // const handleLogin = () => {
  //   const userData = { username };
  //   dispatch(login(userData));
  // };
  return (
    <>
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit">
          Sign in
        </button>

        <p className="signup-link">
          No account?
          <a href="">Sign up</a>
        </p>
      </form>
    </>
  );
}
