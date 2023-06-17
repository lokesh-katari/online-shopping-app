import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { LogoutUser, UserDetails, updateUser } from "../../features/User/UserSlice";
import UpdatePassword from "./UpdatePassword";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = useSelector((state) => state.userSlice.profileUrl);
  const name = useSelector((state) => state.userSlice.name);

  const { phone, Email } = useSelector((state) => state.userSlice.userData);
  const isLoggedIn = useSelector((state) => state.userSlice.loggedIn);
  const isUpdated = useSelector((state) => state.userSlice.isUpdated);
  const [disabled, setDisabled] = useState(true);
  const [editName, seteditName] = useState("");
  const [editEmail, seteditEmail] = useState("");
  const [editPhone, seteditPhone] = useState("");
  const [disabledtext, setDisabledtext] = useState("text-gray-400");
  const loading = useSelector((state) => state.userSlice.loading);

  const editUserProfile = (e) => {
    //submitting user data edited
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", editName);
    myForm.set("Email", editEmail);
    myForm.set("phone", editPhone);
    dispatch(updateUser(myForm));
  };
  const disablingform = (e) => {
    e.preventDefault();
    if (disabled === true) {
      setDisabled(false);
      setDisabledtext("text-gray-900");
    } else {
      setDisabled(true);
      setDisabledtext("text-gray-400");
    }
  };

  const Logout = () => {
    dispatch(LogoutUser());
  };

  useEffect(() => {
    if (name && Email && phone) {
      seteditName(name);
      seteditEmail(Email);
      seteditPhone(phone);
    }
   
  }, [name, Email, phone]);

  return isLoggedIn ? (
    loading ? (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vh",
            margin: "auto",
          }}
        >
          <CircularProgress />
        </Box>{" "}
      </>
    ) : (
      <>
        <div className="h-screen">
          <div className="grid grid-rows-3 grid-cols-3 grid-flow-col gap-4 h-3/4 mt-24 m-7 ">
            <div className=" box-border col-span-1 row-span-1">
              <div className="border-2 flex rounded-full w-3/5 items-center justify-center">
                <Avatar alt={name} src={url} sx={{ width: 84, height: 84 }} />
                <div className="container pl-2 ">
                  <h1>hello {name}</h1>
                </div>
              </div>
            </div>

          
            <div className="mx-2 row-span-2 col-span-1">
              <Link
                onClick={Logout}
                to={"/"}
                className="py-2 px-2  text-sm text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
              >
                log out
              </Link>

              <Link
                
                to={"/orders/cart"}
                className="py-2 px-2 ml-6 text-sm text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
              >
                Cart
              </Link>

              <Link
                
                to={"/myorders"}
                className="py-2 px-2 ml-6 text-sm text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
              >
              My Orders
              </Link>
            </div>
            <div className="row-span-3 col-span-2">
              <form onSubmit={editUserProfile}>
                <button onClick={disablingform}>
                  {disabled ? "edit" : "cancel"}
                </button>

                <div>
                  <label
                    htmlFor="name"
                    className={` text-base font-medium ${disabledtext} `}
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="name"
                      id="name"
                      disabled={disabled}
                      name="name"
                      required
                      value={editName}
                      onChange={(e) => seteditName(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="Email"
                    className={` text-base font-medium ${disabledtext} `}
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="Email"
                      disabled={disabled}
                      name="Email"
                      required
                      value={editEmail}
                      onChange={(e) => seteditEmail(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className={` text-base font-medium ${disabledtext} `}
                  >
                    {" "}
                    Phone{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Phone"
                      id="Phone"
                      disabled={disabled}
                      name="Phone"
                      required
                      value={editPhone}
                      onChange={(e) => seteditPhone(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center mt-10">
                  <UpdatePassword/>
                  <button
                    className="text-2xl bg-blue-500 p-3 text-white mt-10 w-2/6 rounded-lg"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  ) : (
    <>
      <div className="h-screen  ">
        <div
          className="container text-center relative  text-8xl mt-32"
          style={{ top: "134px", opacity: ".2", fontSize: "214px" }}
        >
          404
        </div>
        <div className="text-center relative">
          <h1 className="text-5xl text-red-600">unauthorised access</h1>
          <h1 className="text-3xl text-red-600">
            You must Login to access this resourse
          </h1>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
