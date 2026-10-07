import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

const ResetPassword = () => {
  // Get token from:
  // /reset-password/:token
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check password
    if (!password) {
      alert("Please enter your new password");
      return;
    }

    // Check confirm password
    if (!confirmPassword) {
      alert("Please confirm your password");
      return;
    }

    // Check matching
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Minimum password length
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      console.log("Reset Token:", token);

      const response = await axios.post(
        `http://localhost:4000/auth/reset-password/${token}`,
        {
          password: password,
        }
      );

      console.log("Reset response:", response.data);

      alert("Password reset successfully!");

      // Go back to login
      navigate("/login");

    } catch (error) {
      console.log("Reset password error:", error);

      if (error.response) {
        alert(
          error.response.data.message ||
            "Password reset failed"
        );
      } else {
        alert("Unable to connect to backend");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05020d] text-white flex items-center justify-center px-4">

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[#26658C] opacity-20 blur-[150px] rounded-full"></div>

        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-[#54ACBF] opacity-10 blur-[150px] rounded-full"></div>

      </div>

      {/* Main container */}
      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-6">

          <div className="w-16 h-16 rounded-2xl bg-[#023859] flex items-center justify-center shadow-lg">

            <ShieldCheck
              size={34}
              className="text-[#54ACBF]"
            />

          </div>

        </div>

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold">
            Reset Password
          </h1>

          <p className="text-gray-400 mt-2">
            Create a new password for your account
          </p>

        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-7 shadow-2xl">

          <form onSubmit={handleResetPassword}>

            {/* New Password */}
            <div className="mb-5">

              <label className="block text-sm text-gray-300 mb-2">
                New Password
              </label>

              <div className="relative">

                <Lock
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter new password"
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-3 pl-11 pr-11 text-white placeholder-gray-500 outline-none focus:border-[#54ACBF] transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* Confirm Password */}
            <div className="mb-6">

              <label className="block text-sm text-gray-300 mb-2">
                Confirm Password
              </label>

              <div className="relative">

                <Lock
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm new password"
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-3 pl-11 pr-11 text-white placeholder-gray-500 outline-none focus:border-[#54ACBF] transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* Reset Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#26658C] hover:bg-[#54ACBF] disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-semibold transition"
            >
              {loading
                ? "Resetting Password..."
                : "Reset Password"}
            </button>

          </form>

          {/* Security message */}
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-6">

            <CheckCircle size={17} />

            <span>
              Your password is securely protected
            </span>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ResetPassword;