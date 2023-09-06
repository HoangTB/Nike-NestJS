import React, { useEffect, useState } from "react";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../../store/slice/LoginRegisterSlice";
import Loading from "../../Loading/Loading";
import { IErrorsLogin, LoginRegisterFormProps } from "../../../types/Types";
import { UserAPI } from "../../../models/LoginRegister";
import { updateState } from "../../../store/slice/UpdateProSlice";
const LoginForm: React.FC<LoginRegisterFormProps> = ({ setIsShow }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IErrorsLogin>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (token) {
      UserAPI.deleteCookie()
        .then(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
        })
        .then(() => {
          dispatch(updateState());
        })
        .catch((err: any) => console.log(err));
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  }, [location.pathname]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    // Validate form inputs
    let isValid = true;
    const errors: IErrorsLogin = {};

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
    } else {
      isValid = true;
    }

    setErrors(errors);

    if (isValid) {
      const data = await dispatch(login({ email, password }) as any).unwrap();
      if (data.status === 200) {
        navigate("/");
      } else if (data.message === "Account has been locked") {
        setIsLoading(false);
        toast.warn("Account has been locked !", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setIsLoading(false);
        toast.error(data?.response?.data?.message, {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center form-login form-login">
      <ToastContainer />
      {isLoading && <Loading />}
      <div className="nike-unite-swoosh register-panel-form">
        <img
          src="https://s3.nikecdn.com/unite/app/912/images/swoosh_black.png"
          alt="nike"
        />
      </div>
      <div className="header-text">
        <span>
          FOR EVERYTHING ABOUT NIKE <br /> YOUR ACCOUNT
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login-panel-form">
          <input
            placeholder="Email address"
            type="text"
            className="form-control mt-3 w-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <input
            placeholder="Password"
            type="password"
            className="form-control mt-3 w-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <span className="login-panel-desc mb-3 mt-3">
            By signing in, you agree to Nike's{" "}
            <a
              href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&country=TR&language=en&mobileStatus=false&requestType=redirect&uxId=com.nike.commerce.nikedotcom.web"
              className="underline"
            >
              Privacy Policy
            </a>
            {" and "}
            <a
              href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=termsOfUse&country=TR&language=en&mobileStatus=false&requestType=redirect&uxId=com.nike.commerce.nikedotcom.web"
              className="underline"
            >
              Terms of Use
            </a>
            .
          </span>
          <button className="login-panel-button" type="submit">
            SIGN IN
          </button>
          <span className="text-center mt-4">
            Not a member?{" "}
            <span
              className="underline cursor-pointer text-logres"
              onClick={() => setIsShow(false)}
            >
              Join us.
            </span>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
