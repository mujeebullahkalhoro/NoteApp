import React, { useState } from "react";
import logo from "../assets/noteapplogo.png";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Lucide or any icon library

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const style =
    "bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 font-semibold";

  return (
    <header className="w-full bg-gray-100 shadow-md p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        
        <div className="flex items-center gap-3">
          <img src={logo} alt="note app" className="w-12 h-12 rounded-full" />
          <h1 className="text-xl font-bold">NOTE APP</h1>
        </div>

        
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div className="hidden md:flex gap-4">
          <Button label="Login" style={style} onClick={() => navigate("/login")} />
          <Button label="Sign Up" style={style} onClick={() => navigate("/signup")} />
        </div>
      </div>

     
      {menuOpen && (
        <div className="flex justify-center items-center gap-4 mt-4 md:hidden">
          <Button label="Login" style={style} onClick={() => navigate("/login")} />
          <Button label="Sign Up" style={style} onClick={() => navigate("/signup")} />
        </div>
      )}
    </header>
  );
}

export default Header;
