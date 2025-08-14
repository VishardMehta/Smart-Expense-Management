import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/AuthLayout";
import toast from "react-hot-toast";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    
    try {
      const success = await login();
      if (success) {
        toast.success("Welcome back! 🎉");
        navigate('/dashboard');
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-10 text-center">
          {/* Logo */}
          <div className="w-16 h-16 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-xl">SE</span>
          </div>

          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 mb-8">
            Sign in to continue managing your expenses.
          </p>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 rounded-2xl py-4 text-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle size={22} />
            <span>
              {loading ? 'Signing in...' : 'Continue with Google'}
            </span>
          </button>

          <div className="mt-6 text-sm text-gray-400">
            We only support Google sign-in for now.
          </div>

          {/* Development note */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl text-left">
            <p className="text-sm text-yellow-800 font-medium mb-2">
              🚧 Development Mode
            </p>
            <p className="text-xs text-yellow-700">
              This is a mock login for development. In production, this will integrate with real Google OAuth.
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;