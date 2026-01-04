// import React, { use } from "react";
// import Logo from "../shared/Logo";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"
// import {
//     Avatar,
//     AvatarFallback,
//     AvatarImage,
// } from "@/components/ui/avatar"
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import axios, { Axios } from "axios";
// import { toast } from "sonner";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { clearExpense } from "../../redux/expenseSlice";

// const Navbar = () => {
//     const {user} = useSelector(store=>store.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     // const logoutHandler = async () => {
//     //     try {
//     //         //network call 
//     //         const res = await axios.get("http://localhost:8000/api/v1/user/logout");
//     //         if(res.data.success){
//     //             navigate("/login");
//     //             toast.success(res.data.message);
//     //         }
//     //     } catch (error) {
//     //         console.log(error);
//     //         toast.error(error.response.data.message);
//     //     }
//     // }
//     const logoutHandler = async () => {
//         try {
//             const res = await axios.post(
//                 "http://localhost:8000/api/v1/user/logout",
//                 {}, // empty body
//                 { withCredentials: true } // important!
//             );
//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 dispatch(clearExpense());
//                 navigate("/login");
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error?.response?.data?.message || error.message || "Something went wrong");
//         }
//     };

//     return (
//         <div className="border-b border-gray-300">
//             <div className="flex items-center justify-between max-w-7xl max-auto h-16">
//                 <Logo />
//                 {
//                     user ? (
//                         <Popover>
//                             <p className="text-lg font-bold tracking-wide bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]"
// >
//                                     {user.fullname
//                                     ?.split(" ")
//                                     .map(w => w[0].toUpperCase() + w.slice(1))
//                                     .join(" ")}'s Expenses
//                             </p>

//                             <PopoverTrigger>
                                
//                                 <Avatar className="cursor-pointer">
//                                     <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    
//                                 </Avatar>
//                             </PopoverTrigger>
//                             <PopoverContent>
//                                 <Button variant="link" onClick={logoutHandler}>Logout</Button>
//                             </PopoverContent>
//                         </Popover>
//                     ) : (
//                         // <div className="flex items-center gap-2">
//                         //     <Link to="/login"><Button variant="outline">Login</Button></Link>
//                         //     <Link to="/signup"><Button>Signup</Button></Link>
//                         // </div>
//                         <div className="flex items-center gap-4">
//                             {/* Login Button */}
//                             <Link to="/login">
//                                 <Button
//                                     variant="outline"
//                                     className="relative overflow-hidden rounded-lg border border-blue-500 text-blue-500 px-6 py-2 font-semibold transition-all duration-300 hover:text-white group"
//                                 >
//                                     <span className="absolute inset-0 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
//                                     <span className="relative z-10">Login</span>
//                                 </Button>
//                             </Link>

//                             {/* Signup Button */}
//                             <Link to="/signup">
//                                 <Button
//                                     className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:from-pink-500 hover:to-purple-500"
//                                 >
//                                     Signup
//                                 </Button>
//                             </Link>
//                         </div>
//                     )
//                 }
//             </div>

//         </div>
//     )
// }

// export default Navbar;


import React from "react";
import Logo from "../shared/Logo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { clearExpense } from "../../redux/expenseSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "https://expense-tracker-backend-m0fv.onrender.com/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(clearExpense());
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b shadow-sm">
      

      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-xs font-medium text-gray-500 hidden sm:block">
            Track • Analyze • Save
          </span>
        </div>

        {/* Center */}
        {user && (
          <p className="hidden md:block text-xl font-semibold tracking-wide bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">
            {user.fullname
              ?.split(" ")
              .map(w => w[0].toUpperCase() + w.slice(1))
              .join(" ")}’s Expense Dashboard
          </p>
        )}

        {/* Right */}
        {user ? (
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer">
                
                <Avatar className="h-9 w-9 ring-2 ring-purple-400/40">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    {user.fullname?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </PopoverTrigger>

            <PopoverContent className="w-40 p-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-sm"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" className="px-6">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
                Signup
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
