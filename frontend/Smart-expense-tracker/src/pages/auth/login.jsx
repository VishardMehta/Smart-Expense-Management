import React from "react";
import { FcGoogle } from "react-icons/fc";
import AuthLayout from "../../components/AuthLayout";
import toast from "react-hot-toast";

const handleGoogleLogin = () => {
  // TODO: Replace with real login logic
  toast.success("Google login triggered (integrate Firebase/Auth0)");
};

const Login = () => {
  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 mb-8">
            Sign in to continue managing your expenses.
          </p>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 rounded-md py-3 text-sm hover:shadow-md transition-all duration-200"
          >
            <FcGoogle size={22} />
            <span>Continue with Google</span>
          </button>

          <div className="mt-6 text-sm text-gray-400">
            No other login methods available.
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;