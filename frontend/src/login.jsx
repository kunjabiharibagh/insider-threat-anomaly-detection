
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    ArrowLeft,
    Loader2,
} from "lucide-react";

const Login = () => {
    const navigate = useNavigate();

    // ==================================================
    // LOGIN STATES
    // ==================================================
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // ==================================================
    // FORGOT PASSWORD STATES
    // ==================================================
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotLoading, setForgotLoading] = useState(false);

    // ==================================================
    // LOGIN FUNCTION
    // ==================================================
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:4000/auth/login",
                {
                    email: email,
                    password: password,
                }
            );

            console.log("Login response:", response.data);

            // ==================================================
            // CHECK JWT TOKEN
            // ==================================================
            if (!response.data.token) {
                alert("Login successful, but token was not received.");
                return;
            }

            // ==================================================
            // SAVE JWT TOKEN
            // ==================================================
            localStorage.setItem(
                "token",
                response.data.token
            );

            console.log(
                "JWT token saved:",
                localStorage.getItem("token")
            );

            // ==================================================
            // LOGIN SUCCESS
            // ==================================================
            alert("Login successful!");

            // ==================================================
            // REDIRECT TO dashboard_admin.jsx
            // ==================================================
            navigate("/dashboard", {
                replace: true,
            });

        } catch (error) {
            console.log("Login error:", error);

            if (error.response) {
                alert(
                    error.response.data.message ||
                    "Login failed"
                );
            } else {
                alert(
                    "Unable to connect to backend. Make sure the server is running on port 4000."
                );
            }

        } finally {
            setLoading(false);
        }
    };

    // ==================================================
    // FORGOT PASSWORD FUNCTION
    // ==================================================
    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (!forgotEmail) {
            alert("Please enter your email");
            return;
        }

        try {
            setForgotLoading(true);

            console.log(
                "Sending forgot password request..."
            );

            const response = await axios.post(
                "http://localhost:4000/auth/forgot-password",
                {
                    email: forgotEmail,
                }
            );

            console.log(
                "Forgot password response:",
                response.data
            );

            alert(
                "Password reset link has been sent to your email."
            );

            // Return to Login
            setIsForgotPassword(false);

            // Put email into login email field
            setEmail(forgotEmail);

            // Clear forgot password field
            setForgotEmail("");

        } catch (error) {
            console.log(
                "Forgot password error:",
                error
            );

            if (error.response) {
                alert(
                    error.response.data.message ||
                    "Unable to send reset email"
                );
            } else {
                alert(
                    "Unable to connect to backend."
                );
            }

        } finally {
            setForgotLoading(false);
        }
    };

    // ==================================================
    // FORGOT PASSWORD PAGE
    // ==================================================
    if (isForgotPassword) {
        return (
            <div className="min-h-screen bg-[#05020d] text-white flex items-center justify-center px-4">

                {/* Background Glow */}
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
                    />

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
                    />

                </div>

                {/* Container */}
                <div className="relative w-full max-w-md">

                    {/* Back To Login */}
                    <button
                        type="button"
                        onClick={() => {
                            setIsForgotPassword(false);
                        }}
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

                    {/* Logo */}
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

                    {/* Heading */}
                    <div className="text-center mb-8">

                        <h1 className="text-3xl font-bold">
                            Forgot Password?
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Enter your registered email and
                            we'll send you a reset link.
                        </p>

                    </div>

                    {/* Card */}
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

                        <form onSubmit={handleForgotPassword}>

                            {/* Email */}
                            <div className="mb-6">

                                <label
                                    className="
                                        block
                                        text-sm
                                        text-gray-300
                                        mb-2
                                    "
                                >
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
                                        value={forgotEmail}
                                        onChange={(e) =>
                                            setForgotEmail(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter your registered email"
                                        required
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

                            {/* Send Reset Link */}
                            <button
                                type="submit"
                                disabled={forgotLoading}
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

                                {forgotLoading ? (
                                    <>
                                        <Loader2
                                            size={19}
                                            className="animate-spin"
                                        />
                                        Sending...
                                    </>
                                ) : (
                                    "Send Reset Link"
                                )}

                            </button>

                        </form>

                        {/* Security Message */}
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
                                Reset link expires in 15 minutes
                            </span>

                        </div>

                    </div>

                </div>

            </div>
        );
    }

    // ==================================================
    // LOGIN PAGE
    // ==================================================
    return (
        <div
            className="
                min-h-screen
                bg-[#05020d]
                text-white
                flex
                items-center
                justify-center
                px-4
            "
        >

            {/* Background Glow */}
            <div
                className="
                    fixed
                    inset-0
                    overflow-hidden
                    pointer-events-none
                "
            >

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
                />

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
                />

            </div>

            {/* Login Container */}
            <div className="relative w-full max-w-md">

                {/* Logo */}
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

                {/* Heading */}
                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold">
                        Welcome Back
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Sign in to access your dashboard
                    </p>

                </div>

                {/* Login Card */}
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

                    <form onSubmit={handleLogin}>

                        {/* EMAIL */}
                        <div className="mb-5">

                            <label
                                className="
                                    block
                                    text-sm
                                    text-gray-300
                                    mb-2
                                "
                            >
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
                                    required
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

                        {/* PASSWORD */}
                        <div className="mb-3">

                            <label
                                className="
                                    block
                                    text-sm
                                    text-gray-300
                                    mb-2
                                "
                            >
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
                                    required
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

                                {/* Show Password */}
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

                        {/* FORGOT PASSWORD */}
                        <div
                            className="
                                flex
                                justify-end
                                mb-6
                            "
                        >

                            <button
                                type="button"
                                onClick={() =>
                                    setIsForgotPassword(true)
                                }
                                className="
                                    text-sm
                                    text-[#54ACBF]
                                    hover:text-white
                                    transition
                                "
                            >
                                Forgot Password?
                            </button>

                        </div>

                        {/* LOGIN BUTTON */}
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
                                    Logging in...
                                </>
                            ) : (
                                "Login"
                            )}

                        </button>

                    </form>

                    {/* Security Message */}
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

                    {/* NEW USER / SIGNUP */}
                    <div
                        className="
                            text-center
                            mt-6
                            pt-5
                            border-t
                            border-white/10
                        "
                    >

                        <p className="text-sm text-gray-400">

                            New user?{" "}

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/signup")
                                }
                                className="
                                    text-[#54ACBF]
                                    hover:text-white
                                    font-semibold
                                    transition
                                "
                            >
                                Create an account
                            </button>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;

