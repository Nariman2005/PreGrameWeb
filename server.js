const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('PagesOfProject')); // Serve static files from PagesOfProject directory

// Create a transporter using your email service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'YOUR_EMAIL@gmail.com', // <-- Put your Gmail address here
        pass: 'YOUR_APP_PASSWORD' // <-- Put your 16-character app password here
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, userType, subject, message } = req.body;

    // Email content
    const mailOptions = {
        from: 'YOUR_EMAIL@gmail.com', // <-- Put your Gmail address here
        to: 'YOUR_EMAIL@gmail.com', // <-- Put your Gmail address here
        subject: `New Contact Form Submission: ${subject}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>User Type:</strong> ${userType}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
}); 