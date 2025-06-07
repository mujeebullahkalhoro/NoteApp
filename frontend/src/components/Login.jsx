import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {useNavigate} from 'react-router-dom'

function Login() {
  const navigate=useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Please enter your email"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Please enter your password"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await fetch("http://localhost:5000/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // <== Important to send/receive cookies
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Login failed");
        }

        
        navigate("/dashboard");
      } catch (error) {
        console.error("Login error:", error.message);
        setErrors({ password: "Invalid email or password" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form
      className="w-11/12 max-w-md mx-auto flex items-center justify-center h-full"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-8 bg-white shadow-md p-8 w-full max-w-md rounded-lg">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 text-transparent bg-clip-text text-center">
            Login
          </h2>
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

        {/* Login Button */}
        <div className="w-full flex justify-center">
          <Button
            label="login"
            style="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-2 rounded-md shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 font-semibold"
          />
        </div>

        {/* Don't have an account section */}
        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/register"
            className="text-cyan-500 hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Login;
