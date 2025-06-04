import React from "react";
import logo from "../assets/noteapplogo.png";
import Button from "./Button";
function Header() {
  return (
    <header className="flex justify-between items-center w-full px-4 py-2 bg-gray-100 shadow-md">
      <div className="flex justify-center items-center gap-2 ml-16">
        <img src={logo} alt="note app" className="w-20 h-20 rounded-full" />
        <h1 className="text-xl font-bold">NOTE APP</h1>
      </div>

      <div className="flex gap-4 mr-8">
        <Button label="Login" />
        <Button label="Sign UP"/>


      </div >

       
     
    </header>
  );
}

export default Header;
