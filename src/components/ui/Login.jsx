// import { useState } from "react";
// import Logo from "../shared/Logo.jsx";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";
// import { useDispatch } from "react-redux";
// import { setAuthUser } from "../../redux/authSlice";




// const Login = () => {
//   const [input, setInput] = useState({
//     email: "",
//     password: ""
//   });

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const changeHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "https://expense-tracker-backend-m0fv.onrender.com/api/v1/user/login",
//         input,
//         {
//           headers: {
//             "Content-Type": "application/json"
//           },
//           withCredentials: true
//         }
//       );
//       console.log(res);
//       if (res.data.success) {
//         dispatch(setAuthUser(res.data.user));
//         toast.success(res.data.message);
//         navigate("/");
//       }
//     } catch (error) {
//     //   toast.error(error.response?.data?.message || "Login failed");
//       toast.error(error.response.data.message)
//     }
//   };

//   return (
    
//     <div className="flex items-center justify-center w-screen h-screen">
//       <form onSubmit={submitHandler} className="w-96 p-8 shadow-lg space-y-4">

//         <div className="w-full flex flex-col items-center mb-5">
//           <Logo />
//           <p className="mt-2 text-lg font-semibold text-gray-800">Expense Tracker</p>
//         </div>
        

//         <div className="flex flex-col gap-1">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={input.email}
//             onChange={changeHandler}
//             placeholder="Enter your email"
//             className="border rounded px-3 py-2"
//           />
//         </div>

//         <div className="flex flex-col gap-1">
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={input.password}
//             onChange={changeHandler}
//             placeholder="Enter your password"
//             className="border rounded px-3 py-2"
//           />
//         </div>

//         <button className="w-full my-5 bg-black text-white py-2 rounded">
//           Login
//         </button>

//         <p className="text-sm text-center">
//           Don't have an account?{" "}
//           <Link className="text-blue-600" to="/signup">
//             Signup
//           </Link>
//         </p>

//       </form>
//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import Logo from "../shared/Logo.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/authSlice";
import AnimatedBackground from "../shared/AnimatedBackground.jsx";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://expense-tracker-backend-m0fv.onrender.com/api/v1/user/login",
        input,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">

      {/* Animated Background */}
      <AnimatedBackground />

      {/* Login Form */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <form
          onSubmit={submitHandler}
          className="w-96 p-8 space-y-4 bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl"
        >
          <div className="flex flex-col items-center mb-5">
            <Logo />
            <p className="mt-2 text-lg font-semibold text-gray-800">
              Expense Tracker
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={changeHandler}
              placeholder="Enter your email"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={changeHandler}
              placeholder="Enter your password"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button className="w-full mt-4 bg-black text-white py-2 rounded hover:opacity-90 transition">
            Login
          </button>

          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;