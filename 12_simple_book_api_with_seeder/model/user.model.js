const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Enter username"],
            unique: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters long."],
            maxlength: [30, "Username cannot exceed 30 characters."],
            match: [/^[a-zA-Z0-9_]+$/, "Username can only contain alphanumeric characters and underscores."]
        },
        email: {
            type: String,
            required: [true, "Ente email"],
            unique: true,
            trim: true,                             
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."]
        },
        password: {
            type: String,
            required: [true, "Enter password"],
            minlength: [6, "Password must be at least 6 characters long."], // Built-in: minlength
        }
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;