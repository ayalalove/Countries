

import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/atoms";
import { getUser, loginUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../styles/LogIn.scss'
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [loginError, setLoginError] = useState<string>("");
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // מנקה את השגיאה כשהמשתמש מקליד
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let newErrors: { username?: string; password?: string } = {};
    setLoginError(""); // מנקה את השגיאה הקודמת לפני שליחה

    if (!credentials.username) newErrors.username = "יש להזין שם משתמש";
    if (!credentials.password) newErrors.password = "יש להזין סיסמה";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }



    try {
      const data = await loginUser(credentials);
      localStorage.setItem("token", data.token);
     

      const userDetails = await getUser(data.user._id);
       console.log(userDetails);

      setUser(userDetails);


      localStorage.setItem("user", JSON.stringify(userDetails)); 

      toast.success("התחברת בהצלחה!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });

      navigate("/homepage");
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("שם משתמש או סיסמה שגויים"); 
    }
  };

  return (
    <body>
    <div>
    <h1>Welcome to the Country Project</h1>
      <form onSubmit={handleSubmit}>
     
      <h1>Log in here</h1>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            className={errors.username ? "input-error" : ""}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <button type="submit">Login</button>
        {loginError && <p className="error-message">{loginError}</p>}


        <h1 className="signup">Not registered yet?</h1>
        <button onClick={() => navigate("/signup")}>Register here</button>
      </form>


    </div>
    </body>
  );
};

export default Login;
