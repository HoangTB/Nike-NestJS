import React, { useState } from "react";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";

const Register: React.FC = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  return (
    <>
      {isShow ? (
        <LoginForm setIsShow={setIsShow} />
      ) : (
        <RegisterForm setIsShow={setIsShow} />
      )}
    </>
  );
};

export default Register;
