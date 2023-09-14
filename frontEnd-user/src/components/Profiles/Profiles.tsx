import React, { useState, useEffect } from "react";
import "./Profiles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { IProfile } from "../../types/Types";
import { UserAPI } from "../../models/LoginRegister";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../store/slice/UpdateProSlice";
import Login from "../Modal/Login/Login";
import Loading from "../Loading/Loading";

const Profiles: React.FC = () => {
  const [userData, setUserData] = useState<IProfile>();
  const location = useLocation();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [oldPass, setOldPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const update = useSelector((state: any) => state.update);

  useEffect(() => {
    const userValue = localStorage.getItem("user");
    const user = userValue ? JSON.parse(userValue) : undefined;
    UserAPI.getUserId(user.id).then((user) => {
      setUserData(user);
    });
  }, [update, location.pathname]);

  useEffect(() => {
    if (userData?.firstName && userData.lastName && userData.birthday) {
      setFirstName(userData!.firstName);
      setLastName(userData!.lastName);
      setBirthday(userData!.birthday);
    }
  }, [userData]);

  const handleUpdate = async (id: number) => {
    const formImage = new FormData();
    if (avatar) {
      formImage.append("avatar", avatar);
    }
    const data: IProfile | undefined = {
      avatar: avatar,
      email: userData?.email,
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      oldPass: oldPass,
      newPass: newPass,
      confirmPass: confirmPass,
    };

    setIsLoading(true);
    await UserAPI.updateUser(id, data as any)
      .then((res: any) => {
        {
          toast.success(res.message, {
            autoClose: 500,
          });
        }
        setIsLoading(false);
        dispatch(updateState());
        if (res.message == "Update User and Password Successfully") {
          setTimeout(() => {
            setIsShowLogin(true);
          }, 1000);
        }
      })
      .catch((error: any) => {
        toast.error(error.response.data.message, {
          autoClose: 500,
        });
        setIsLoading(false);
      });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const togglePassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div className="mt-4 form-profile-top">
      {isShowLogin && <Login />}
      {isLoading && <Loading />}
      <ToastContainer />
      <div className="form-profile">
        <h1 className="mb-5 text-center">Your Profile</h1>
        <div className="bg-white rounded-lg d-block d-sm-flex profile-tab-top">
          <div className="profile-tab-nav border-right">
            <div className="p-4">
              <div className="img-circle text-center mb-3">
                <img
                  src={String(userData?.avatar)}
                  alt="..."
                  className="shadow avatar-file"
                />
                <label
                  htmlFor="file-input"
                  className="fa-regular fa-pen-to-square edit-image"
                >
                  <input
                    type="file"
                    id="file-input"
                    style={{ display: "none" }}
                    onChange={(e: any) => setAvatar(e.target.files[0])}
                  />
                </label>
              </div>
              <h4 className="text-center">
                {userData?.lastName} {userData?.firstName}
              </h4>
            </div>
            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              {" "}
            </div>
          </div>
          <div className="tab-content" id="v-pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="account"
              role="tabpanel"
              aria-labelledby="account-tab"
            >
              <div className="row-form">
                <div className="row-1">
                  <div>
                    <div className="form-group">
                      <label>
                        <b>First Name:</b>
                      </label>
                      <input
                        type="text"
                        className="form-control profile-input"
                        value={firstName || ""}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="form-group">
                      <label>
                        <b>Last Name:</b>
                      </label>
                      <input
                        type="text"
                        className="form-control profile-input"
                        value={lastName || ""}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="form-group ">
                      <label>
                        <b>Email:</b>
                      </label>
                      <p className="form-control profile-input">
                        {" "}
                        {userData?.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="form-group">
                      <label>
                        <b>Birthday:</b>
                      </label>
                      <input
                        type="text"
                        className="form-control profile-input"
                        value={birthday ? birthday?.slice(0, 10) : ""}
                        onChange={(e) => setBirthday(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row-2">
                  <div>
                    <button
                      className="btn btn-light mb-3"
                      onClick={() => {
                        setShowForm(!showForm);
                      }}
                    >
                      {showForm ? "Close Form" : "Change Password"}
                    </button>
                  </div>
                  {showForm ? (
                    <div>
                      <div className="password-input">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control mb-3"
                          style={{ width: "400px" }}
                          placeholder="Old Password"
                          onChange={(e) => setOldPass(e!.target.value)}
                        />
                        <span
                          className={`password-toggle ${
                            showPassword ? "active" : ""
                          }`}
                          onClick={togglePassword}
                        >
                          <i
                            className={`fa-solid ${
                              showPassword ? "fa-eye-slash" : "fa-eye"
                            }`}
                          ></i>
                        </span>
                      </div>

                      <div className="password-input">
                        <input
                          type={showPassword1 ? "text" : "password"}
                          className="form-control mb-3"
                          style={{ width: "400px" }}
                          placeholder="New Password"
                          onChange={(e) => setNewPass(e!.target.value)}
                        />
                        <span
                          className={`password-toggle ${
                            showPassword1 ? "active" : ""
                          }`}
                          onClick={togglePassword1}
                        >
                          <i
                            className={`fa-solid ${
                              showPassword1 ? "fa-eye-slash" : "fa-eye"
                            }`}
                          ></i>
                        </span>
                      </div>
                      <div className="password-input">
                        <input
                          type={showPassword2 ? "text" : "password"}
                          className="form-control mb-3"
                          style={{ width: "400px" }}
                          placeholder="Confirm New Password"
                          onChange={(e) => setConfirmPass(e!.target.value)}
                        />
                        <span
                          className={`password-toggle ${
                            showPassword2 ? "active" : ""
                          }`}
                          onClick={togglePassword2}
                        >
                          <i
                            className={`fa-solid ${
                              showPassword2 ? "fa-eye-slash" : "fa-eye"
                            }`}
                          ></i>
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="text-center mt-2">
                <button
                  className="btn btn-light btn-update-user"
                  onClick={() => userData?.id && handleUpdate(userData.id)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
