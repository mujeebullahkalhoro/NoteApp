import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { fetchWithRefresh } from "../utils/fetchWithRefresh";
function Signup() {
  const navigate = useNavigate();

  const initialValue = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: initialValue,
      validationSchema: Yup.object({
        name: Yup.string().min(2).max(25).required("please enter your name"),
        email: Yup.string().email().required("please enter your email"),
        password: Yup.string().min(6).required("please enter your password"),
        confirmPassword: Yup.string()
          .required("please confirm your password")
          .oneOf([Yup.ref("password"), null], "password must match"),
      }),
      onSubmit: async (values, { resetForm }) => {
        const { name, email, password } = values;

        try {
          const response = await fetchWithRefresh("http://localhost:5000/user/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
            credentials: "include",
          });

          const data = await response.json();

          if (response.ok) {
            alert(data.message || "Registration successful!");
            resetForm();
            navigate("/dashboard");
          } else {
            
            alert(data.message || "Something went wrong. Please try again.");
            console.error("Server error:", data);
          }
        } catch (error) {
          
          alert("Unable to connect to server. Please try again later.");
          console.error("Network error:", error);
        }
      },
    });

  return (
    <form
      className="w-11/12 max-w-md mx-auto flex items-center justify-center h-full"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4 bg-white shadow-md p-8 w-full max-w-md rounded-lg">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 text-transparent bg-clip-text text-center">
            Sign Up
          </h2>
        </div>

        {/* Name Field */}
        <div className="flex flex-col gap-0.5">
          <label className="label-base">Name</label>
          <input
            className="input-base"
            type="text"
            placeholder="Full Name"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {errors.name && touched.name ? (
            <p className="text-red-500 text-sm">{errors.name}</p>
          ) : null}
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-0.5">
          <label className="label-base">Email</label>
          <input
            className="input-base"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email ? (
            <p className="text-red-500 text-sm">{errors.email}</p>
          ) : null}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-0.5">
          <label className="label-base">Password</label>
          <input
            className="input-base"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password ? (
            <p className="text-red-500 text-sm">{errors.password}</p>
          ) : null}
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-0.5">
          <label className="label-base">Confirm Password</label>
          <input
            className="input-base"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          ) : null}
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
          <Link
            to="/login"
            className="text-cyan-500 hover:underline font-medium"
          >
            Log in
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Signup;
