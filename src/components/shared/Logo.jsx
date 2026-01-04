import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/expenselogo.png"; // adjust path

const Logo = () => {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="Logo"
        className="w-14"
      />
    </Link>
  );
};

export default Logo;