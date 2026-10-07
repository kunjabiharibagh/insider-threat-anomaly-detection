
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  ArrowLeft,
} from "lucide-react";

const Signup = () => {

  const navigate = useNavigate();

  // ==============================
  // STATES
  // ==============================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  // ==================================================
  // SIGNUP FUNCTION
  // ==================================================

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log("SIGNUP BUTTON CLICKED");

    // Check empty fields
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Password length
    if (password.length < 6) {
      alert("Password must contain at least 6 characters");
      return;
    }

    try {

      setLoading(true);

      console.log("Sending signup request...");

      const response = await axios.post(
        "http://localhost:4000/auth/signup",
        {
          name: name,
          email: email,
          password: password,
        }
      );

      console.log(
        "SIGNUP RESPONSE:",
        response.data
      );

      alert("Account created successfully!");

      // Go to login page
      navigate("/login.jsx", {
        replace: true,
      });

    } catch (error) {

      console.log(
        "SIGNUP ERROR:",
        error
      );

      if (error.response) {

        alert(
          error.response.data.message ||
          "Signup failed"
        );

      } else {

        alert(
          "Unable to connect to backend. Make sure the server is running."
        );

      }

    } finally {

      setLoading(false);

    }
  };

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="min-h-screen bg-[#05020d] text-white flex items-center justify-center px-4">

      {/* ==============================
          BACKGROUND
      =============================== */}

      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <div
          className="
            absolute
            top-[-150px]
            left-[-150px]
            w-[400px]
            h-[400px]
            bg-[#023859]
            opacity-30
            blur-[120px]
            rounded-full
          "
        ></div>

        <div
          className="
            absolute
            bottom-[-150px]
            right-[-150px]
            w-[400px]
            h-[400px]
            bg-[#26658C]
            opacity-20
            blur-[120px]
            rounded-full
          "
        ></div>

        <div
          className="
            absolute
            bottom-[-200px]
            left-1/3
            w-[350px]
            h-[350px]
            bg-[#54ACBF]
            opacity-10
            blur-[120px]
            rounded-full
          "
        ></div>

      </div>

      {/* ==============================
          SIGNUP CONTAINER
      =============================== */}

      <div className="relative w-full max-w-md">

        {/* Back to Login */}

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="
            flex
            items-center
            gap-2
            text-gray-400
            hover:text-white
            mb-6
            transition
          "
        >
          <ArrowLeft size={18} />

          Back to Login
        </button>

        {/* ==============================
            LOGO
        =============================== */}

        <div className="flex justify-center mb-6">

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-[#023859]
              flex
              items-center
              justify-center
              shadow-lg
            "
          >

            <ShieldCheck
              size={34}
              className="text-[#54ACBF]"
            />

          </div>

        </div>

        {/* ==============================
            HEADING
        =============================== */}

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="text-gray-400 mt-2">
            Create your account to access the security dashboard
          </p>

        </div>

        {/* ==============================
            SIGNUP CARD
        =============================== */}

        <div
          className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-2xl
            p-7
            shadow-2xl
          "
        >

          <form onSubmit={handleSignup}>

            {/* ==========================
                NAME
            =========================== */}

            <div className="mb-5">

              <label className="block text-sm text-gray-300 mb-2">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={19}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                  "
                />

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your full name"
                  className="
                    w-full
                    bg-black/30
                    border
                    border-white/10
                    rounded-lg
                    py-3
                    pl-11
                    pr-4
                    text-white
                    placeholder-gray-500
                    outline-none
                    focus:border-[#54ACBF]
                    transition
                  "
                />

              </div>

            </div>

            {/* ==========================
                EMAIL
            =========================== */}

            <div className="mb-5">

              <label className="block text-sm text-gray-300 mb-2">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={19}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                  "
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="
                    w-full
                    bg-black/30
                    border
                    border-white/10
                    rounded-lg
                    py-3
                    pl-11
                    pr-4
                    text-white
                    placeholder-gray-500
                    outline-none
                    focus:border-[#54ACBF]
                    transition
                  "
                />

              </div>

            </div>

            {/* ==========================
                PASSWORD
            =========================== */}

            <div className="mb-5">

              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={19}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                  "
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter your password"
                  className="
                    w-full
                    bg-black/30
                    border
                    border-white/10
                    rounded-lg
                    py-3
                    pl-11
                    pr-11
                    text-white
                    placeholder-gray-500
                    outline-none
                    focus:border-[#54ACBF]
                    transition
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    hover:text-white
                  "
                >

                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}

                </button>

              </div>

            </div>

            {/* ==========================
                CONFIRM PASSWORD
            =========================== */}

            <div className="mb-6">

              <label className="block text-sm text-gray-300 mb-2">
                Confirm Password
              </label>

              <div className="relative">

                <Lock
                  size={19}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                  "
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Confirm your password"
                  className="
                    w-full
                    bg-black/30
                    border
                    border-white/10
                    rounded-lg
                    py-3
                    pl-11
                    pr-11
                    text-white
                    placeholder-gray-500
                    outline-none
                    focus:border-[#54ACBF]
                    transition
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    hover:text-white
                  "
                >

                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}

                </button>

              </div>

            </div>

            {/* ==========================
                SIGNUP BUTTON
            =========================== */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-[#26658C]
                hover:bg-[#54ACBF]
                disabled:opacity-50
                disabled:cursor-not-allowed
                py-3
                rounded-lg
                font-semibold
                transition
                flex
                items-center
                justify-center
                gap-2
              "
            >

              {loading ? (
                <>
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />

                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}

            </button>

          </form>

          {/* ==============================
              LOGIN LINK
          =============================== */}

          <div className="text-center mt-6">

            <span className="text-gray-500 text-sm">
              Already have an account?
            </span>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="
                ml-2
                text-[#54ACBF]
                hover:text-white
                text-sm
                transition
              "
            >
              Login
            </button>

          </div>

          {/* ==============================
              SECURITY MESSAGE
          =============================== */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-2
              text-gray-500
              text-sm
              mt-6
            "
          >

            <ShieldCheck size={17} />

            <span>
              Your account is securely protected
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;

