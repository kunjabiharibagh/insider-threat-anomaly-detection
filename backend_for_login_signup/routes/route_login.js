const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const Login = require("../model/login.js");
const { randomBytes } = require("crypto");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await Login.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Login({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        console.log("Signup error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Login.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        console.log("Login error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});

//The /profile endpoint is used to get the details of the currently logged-in user after verifying their JWT token.

const auth = require("../middleware/auth");

router.get("/profile", auth, async (req, res) => {
    try {
        const user = await Login.findById(req.user.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        console.log("Profile error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});


router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;

        const user = await Login.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Generate random reset token
      const resetToken = randomBytes(32).toString("hex");

        // Save token and expiry in database
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

        await user.save();

        // Create email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Reset URL
        const resetUrl =
            `http://localhost:5173/reset-password/${resetToken}`;

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset",
            html: `
                <h2>Password Reset</h2>

                <p>Hello ${user.name},</p>

                <p>
                    Click the button below to reset your password.
                </p>

                <a href="${resetUrl}"
                   style="
                     display:inline-block;
                     padding:10px 20px;
                     background:#26658C;
                     color:white;
                     text-decoration:none;
                     border-radius:5px;
                   ">
                    Reset Password
                </a>

                <p>This link will expire in 15 minutes.</p>
            `
        });

        res.status(200).json({
            message: "Password reset email sent"
        });

    } catch (error) {
        console.log("Forgot password error:", error);

        res.status(500).json({
            message: "Internal server erroor"
        });
    }
});


///for reset the password
router.post("/reset-password/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        console.log("Token:", token);
        console.log("Password:", password);

        if (!password) {
            return res.status(400).json({
                message: "New password is required"
            });
        }

        const user = await Login.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset token"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (error) {
        console.log("Reset password error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = router;