import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";

const SignUp = () => {
  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Sign Up
          </h2>
          <p className="text-gray-500 mb-8">
            Currently, we only support Google sign-in. Please use the login page to get started.
          </p>
          
          <Link
            to="/login"
            className="inline-block bg-[var(--color-primary)] text-white px-6 py-3 rounded-2xl hover:opacity-90 transition-opacity"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;