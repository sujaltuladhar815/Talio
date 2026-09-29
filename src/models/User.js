const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    username: {
        type: String,
        unique: true,
        sparse: true,
        lowercase: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email : {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        minlength: 8,
        maxlength: 50,
        unique: true,
        validate: {
            validator: (value) => {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                return emailRegex.test(value)
            },
            message: "Invalid email format"
        }
    },
    // stores the bcrypt hash (hashed in the service layer)
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    phone: {
        type: String,
        unique: true,
        trim: true,
        validate: {
            validator: (value) => /^\d{10}$/.test(value),
            message: "Phone number must be exactly 10 digits"
        }
    },
    avatar: {
        type: String
    },
    headline: {
        type: String,
        maxlength: 120
    },
    bio: {
        type: String,
        maxlength: 1000
    },
    location: {
        type: String
    },
    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },
    role: {
        type: String,
        enum: ["user", "employer", "admin"],
        default: "user"
    },
    status: {
        type: String,
        enum: ["active", "suspended"],
        default: "active"
    },
},
{
    timestamps: true
}
)

module.exports = mongoose.model("User", UserSchema)