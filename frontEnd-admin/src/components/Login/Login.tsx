import React, { useEffect, useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../store/slice/LoginSlice";
import Loading from "../Loading/Loading";
import { IErrors } from "../../types/Type";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IErrors>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("admin");
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();

    // Validate form inputs
    let isValid = true;
    const errors: IErrors = {};

    if (email.trim() === "") {
      setIsLoading(false);
      isValid = false;
      errors.email = "Please enter your email";
    } else if (!validateEmail(email)) {
      setIsLoading(false);
      isValid = false;
      errors.email = "Please enter a valid email";
    }

    if (password.trim() === "") {
      setIsLoading(false);
      isValid = false;
      errors.password = "Please enter your password";
    }

    setErrors(errors);

    if (isValid) {
      const data = await dispatch(login({ email, password }) as any).unwrap();
      console.log(1, data);

      if (data.status === 200) {
        setIsLoading(false);
        navigate("/home");
      } else if (data.message === "This is not an administrator account") {
        setIsLoading(false);
        toast.info("This is not an administrator account", {
          autoClose: 500,
        });
      } else {
        setIsLoading(false);
        toast.error(data.response.data.message, {
          autoClose: 500,
        });
      }
    }
  };

  return (
    <div className="container forms">
      {isLoading && <Loading />}
      <ToastContainer />
      <div className="form login" id="formSignIn">
        <div className="form-content">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/projectshoes-cf747.appspot.com/o/673483.png?alt=media&token=fb222f9d-7894-4adb-80c8-10729ef5b496"
            alt=""
          />

          <form action="#" onSubmit={handleSubmit}>
            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="email form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Password"
                className="password form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="error">{errors.password}</p>}
              <i className="bx bx-hide eye-icon" />
            </div>

            <div className="field button-field">
              <button type="submit" id="btnLogin">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
