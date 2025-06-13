import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await fetch("http://localhost:5000/user/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error sending email");

        setEmailSent(true);
        setMessage("Reset email sent! Please check your inbox.");
      } catch (error) {
        setMessage(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-11/12 max-w-md mx-auto mt-20">
      {emailSent ? (
        <div className="bg-green-100 border border-green-400 text-green-700 p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Success 🎉</h2>
          <p>{message}</p>
          <button
            onClick={() => {
              setEmailSent(false);
              formik.resetForm();
              setMessage("");
            }}
            className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
          >
            Send Again
          </button>
        </div>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-6 rounded shadow"
        >
          <h2 className="text-xl font-bold mb-4 text-center">
            Forgot Password
          </h2>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="input-base border border-gray-300 p-2 rounded w-full"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full mt-4 bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600 disabled:opacity-50"
          >
            {formik.isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>

          {message && !emailSent && (
            <p className="mt-4 text-center text-sm text-red-500">{message}</p>
          )}
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
