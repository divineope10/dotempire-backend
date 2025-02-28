require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test Route to Check If Server is Running
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Contact Form Route
app.post("/send", async (req, res) => {
    const { name, email, message } = req.body;

    console.log("Incoming request:", req.body);

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587, // Use TLS instead of SSL
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL,
            subject: "New Contact Form Message",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Email error:", error);
                return res.status(500).json({ error: "Failed to send message.", details: error.message });
            }
            console.log("Email sent:", info.response);
            res.json({ success: "Message sent successfully!" });
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Something went wrong.", details: error.message });
    }
});

// ✅ Move `app.listen` OUTSIDE the route!
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log("Starting server..."); // Debugging message