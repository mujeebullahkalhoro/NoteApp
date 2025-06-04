import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <form className="w-11/12 max-w-md mx-auto flex items-center justify-center h-full">
      <div className="flex flex-col gap-4 bg-white shadow-md p-8 w-full max-w-md rounded-lg">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 text-transparent bg-clip-text text-center">
            Sign Up
          </h2>
        </div>

        {/* Name Field */}
        <div className="flex flex-col gap-0.5">
          <label className="label-base">Name</label>
          <input className="input-base" type="text" placeholder="Full Name" name="name" />
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-0.5">
          <label className="label-base">Email</label>
          <input className="input-base" type="email" placeholder="Email" name="email" />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-0.5">
          <label className="label-base">Password</label>
          <input className="input-base" type="password" placeholder="Password" name="password" />
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-0.5">
          <label className="label-base">Confirm Password</label>
          <input className="input-base" type="password" placeholder="Confirm Password" name="confirmPassword" />
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-center">
          <Button
            label="Sign Up"
            style="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-2 rounded-md shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 font-semibold"
          />
        </div>

        {/* Already have an account section */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-500 hover:underline font-medium">
            Log in
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Signup;
