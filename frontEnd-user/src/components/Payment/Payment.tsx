import React, { useEffect, useState } from "react";
import "./Payment.css";
import Thanks from "../Modal/Thanks/Thanks";
import { IErrorsPayment } from "../../types/Types";
import { IOrder, IProductMerger, Order } from "../../models/Order";
import { useSelector } from "react-redux";

const Payment: React.FC = () => {
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [errors, setErrors] = useState<IErrorsPayment>({});

  const [dataArr, setDataArr] = useState([]);
  const update = useSelector((state: any) => state.update);
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const userValue = localStorage.getItem("user");
  const user = userValue ? JSON.parse(userValue) : undefined;
  useEffect(() => {
    if (user && user.id) {
      Order.getOrderById(user.id).then((data: IOrder) => {
        Order.getProductMerger(data.id!).then((product: IProductMerger) => {
          const value: any = product.OrderDetail;
          setDataArr(value);
        });
      });
    }
  }, [update]);

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;
    const errors: IErrorsPayment = {};
    if (fullName.trim() === "") {
      isValid = false;
      errors.fullName = "Please enter your Full name";
    }

    if (email.trim() === "") {
      isValid = false;
      errors.email = "Please enter your email";
    } else if (!validateEmail(email)) {
      isValid = false;
      errors.email = "Please enter a valid email";
    }
    if (address.trim() === "") {
      isValid = false;
      errors.address = "Please enter your address";
    }

    if (phone.trim() === "") {
      isValid = false;
      errors.phone = "Please enter your phone";
    }
    setErrors(errors);
    if (isValid) {
      setIsShowForm(!isShowForm);
    }
  };

  const handleCloseForm = () => {
    setIsShowForm(false);
  };
  return (
    <div className="container form-payment">
      {isShowForm && (
        <Thanks
          dataArr={dataArr}
          handleCloseForm={handleCloseForm}
          fullName={fullName}
          email={email}
          address={address}
          phone={phone}
        />
      )}
      <form action="" onSubmit={handlePayment}>
        <div className="row">
          <div className="col">
            <h3 className="title">billing address</h3>
            <div className="inputBox">
              <span>full name :</span>
              <input
                type="text"
                placeholder="Truong Bao Hoang"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>
            <div className="inputBox">
              <span>email :</span>
              <input
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="inputBox">
              <span>address :</span>
              <input
                type="text"
                placeholder="room - street - locality"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {errors.address && <p className="error">{errors.address}</p>}
            </div>
            <div className="inputBox">
              <span>phone :</span>
              <input
                type="text"
                placeholder="0905485884"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
          </div>
        </div>
        <input
          type="submit"
          defaultValue="proceed to checkout"
          className="submit-btn"
          style={{ marginBottom: 20 }}
        />
      </form>
    </div>
  );
};

export default Payment;
