const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// =========================
// REGISTER
// =========================

const register = async (req, res) => {

    try {

        const {
            name,
            email,
            phoneNumber,
            password
        } = req.body;


        // Check required fields
        if (!name || !email || !phoneNumber || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }


        // Check if email already exists
        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });


        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });

        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create user
        const user = await User.create({

            name: name,

            email: email.toLowerCase(),

            phoneNumber: phoneNumber,

            password: hashedPassword

        });


        // Create JWT token
        const token = jwt.sign(

            {
                userId: user._id,

                email: user.email

            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );


        // Send response
        return res.status(201).json({

            success: true,

            message: "Registration successful",

            token: token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                phoneNumber: user.phoneNumber

            }

        });


    } catch (error) {

        console.error("Registration error:", error);


        return res.status(500).json({

            success: false,

            message: "Server error during registration"

        });

    }

};



// =========================
// LOGIN
// =========================

const login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // Check required fields
        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message: "Email and password are required"

            });

        }


        // Find user
        const user = await User.findOne({

            email: email.toLowerCase()

        });


        // User doesn't exist
        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Invalid email or password"

            });

        }


        // Compare password
        const passwordMatch = await bcrypt.compare(

            password,

            user.password

        );


        // Wrong password
        if (!passwordMatch) {

            return res.status(401).json({

                success: false,

                message: "Invalid email or password"

            });

        }


        // Generate JWT
        const token = jwt.sign(

            {

                userId: user._id,

                email: user.email

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );


        // Successful login
        return res.status(200).json({

            success: true,

            message: "Login successful",

            token: token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                phoneNumber: user.phoneNumber

            }

        });


    } catch (error) {

        console.error("Login error:", error);


        return res.status(500).json({

            success: false,

            message: "Server error during login"

        });

    }

};


module.exports = {

    register,

    login

};