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

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587, // Change to 587
            secure: false, // Use TLS instead of SSL
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

        await transporter.sendMail(mailOptions);
        res.json({ success: "Message sent successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send message." });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log("Starting server..."); // Debugging message