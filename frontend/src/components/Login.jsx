import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom"; // Required if using React Router

function Login() {
  return (
    <form className="w-11/12 max-w-md mx-auto flex items-center justify-center h-full">
      <div className="flex flex-col gap-8 bg-white shadow-md p-8 w-full max-w-md rounded-lg">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 text-transparent bg-clip-text text-center">
            Login
          </h2>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="label-base">Email</label>
          <input className="input-base" type="email" placeholder="Email" name="email" />
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="label-base">Password</label>
          <input className="input-base" type="password" placeholder="Password" name="password" />
        </div>

        <div className="w-full flex justify-center">
          <Button
            label="login"
            style="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-2 rounded-md shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 font-semibold"
          />
        </div>

        {/* Don't have an account section */}
        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account yet?{" "}
          <Link to="/register" className="text-cyan-500 hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Login;
