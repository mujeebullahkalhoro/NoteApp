import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: { password: "" },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("New password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await fetch("http://localhost:5000/user/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password: values.password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setMessage("Password successfully reset! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        setMessage(error.message || "An error occurred");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-11/12 max-w-md mx-auto mt-20 bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>

      <input
        type="password"
        name="password"
        placeholder="Enter new password"
        className="input-base"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />

      {formik.errors.password && formik.touched.password && (
        <p className="text-red-500 text-sm">{formik.errors.password}</p>
      )}

      <button
        type="submit"
        className="w-full mt-4 bg-teal-500 text-white py-2 rounded hover:bg-teal-600"
      >
        Reset Password
      </button>

      {message && (
        <p
          className={`mt-4 text-center text-sm ${
            message.includes("successfully")
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}

export default ResetPassword;
