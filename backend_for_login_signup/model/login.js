const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        resetToken: {
            type: String
        },

        resetTokenExpiry: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;