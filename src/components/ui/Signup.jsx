import { useState } from "react";
import Logo from "../shared/Logo.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: ""
  });
  const navigate=useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler =async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://expense-tracker-backend-m0fv.onrender.com/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
    //   toast.error(error.response?.data?.message || "Login failed");
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form onSubmit={submitHandler} className="w-96 p-8 shadow-lg space-y-4">

        <div className="w-full flex flex-col items-center mb-5">
          <Logo />
          <p className="mt-2 text-lg font-semibold text-gray-800">Expense Tracker</p>
        </div>

        <div className="flex flex-col gap-1">
          <label>Full Name</label>
          <input
            type="text"
            name="fullname"
            value={input.fullname}
            onChange={changeHandler}
            placeholder="Enter your full name"
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeHandler}
            placeholder="Enter your email"
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={changeHandler}
            placeholder="Enter your password"
            className="border rounded px-3 py-2"
          />
        </div>

        <button className="w-full my-5 bg-black text-white py-2 rounded">
          Signup
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link className="text-blue-600" to="/login">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Signup;
