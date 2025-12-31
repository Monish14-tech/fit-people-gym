require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { sequelize } = require('./config/db');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret'
});

const User = require('./models/User');
const Contact = require('./models/Contact');
const Testimonial = require('./models/Testimonial');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection & Sync
sequelize.sync()
    .then(() => {
        console.log('SQLite Database connected & synced');
        seedAdmin();
        seedTestimonials();
    })
    .catch(err => console.error('Database sync error:', err));

// Seed Database Functions
async function seedAdmin() {
    try {
        const username = process.env.ADMIN_USERNAME || 'admin';
        const password = process.env.ADMIN_PASSWORD || 'admin123';

        const admin = await User.findOne({ where: { username } });
        if (!admin) {
            await User.create({
                username,
                password,
                role: 'admin'
            });
            console.log('Admin user seeded successfully');
        } else {
            // Force update password to match .env in case it was changed
            admin.password = password;
            await admin.save();
            console.log('Admin credentials synced with .env');
        }
    } catch (err) {
        console.error('Error seeding admin:', err);
    }
}

async function seedTestimonials() {
    try {
        const count = await Testimonial.count();
        if (count === 0) {
            const defaults = [
                {
                    name: "MONISH",
                    role: "Professional Athlete",
                    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
                    text: "The focus and discipline I found at FIT PEOPLE GYM is unlike anywhere else. The platinum equipment is world-class."
                },
                {
                    name: "ARUN KUMAR",
                    role: "Fitness Enthusiast",
                    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
                    text: "Absolutely stunning facility. It's not just a gym, it's a lifestyle. The community support is incredible."
                },
                {
                    name: "Mike Tyson",
                    role: "Heavyweight Legend",
                    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
                    text: "If you want to be the best, you train with the best. This place has everything a champion needs."
                }
            ];
            await Testimonial.bulkCreate(defaults);
            console.log('Default testimonials seeded');
        }
    } catch (err) {
        console.error('Error seeding testimonials:', err);
    }
}

// --- AUTH MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// --- ROUTES ---

// 1. Admin Login
app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// 2. Get Testimonials (Public)
app.get('/api/testimonials', async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll({ where: { approved: true } });
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching testimonials' });
    }
});

// 3. Submit Contact Form (Public)
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        await Contact.create({ name, email, message });
        res.status(200).json({ message: 'Message received successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error saving message' });
    }
});

// --- PROTECTED ADMIN ROUTES ---

// 4. Get All Contact Submissions
app.get('/api/admin/submissions', authenticateToken, async (req, res) => {
    try {
        const submissions = await Contact.findAll({ order: [['createdAt', 'DESC']] });
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching submissions' });
    }
});

// 5. Add Testimonial
app.post('/api/admin/testimonials', authenticateToken, async (req, res) => {
    const { name, role, text, image } = req.body;
    try {
        const newTestimonial = await Testimonial.create({ name, role, text, image });
        res.json({ message: 'Testimonial added', testimonial: newTestimonial });
    } catch (err) {
        res.status(500).json({ message: 'Error adding testimonial' });
    }
});

// 6. Delete Testimonial
app.delete('/api/admin/testimonials/:id', authenticateToken, async (req, res) => {
    try {
        await Testimonial.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Testimonial deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting testimonial' });
    }
});

// 7. Get Database Stats
app.get('/api/admin/stats', authenticateToken, async (req, res) => {
    try {
        const contactCount = await Contact.count();
        const testimonialCount = await Testimonial.count();
        res.json({ contactCount, testimonialCount });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching stats' });
    }
});

// --- PAYMENT ROUTES ---

// 8. Create Razorpay Order
app.post('/api/payment/order', async (req, res) => {
    const { amount, planName, upiId } = req.body;
    const options = {
        amount: amount * 100, // Amount in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: { planName, upiId }
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        console.error('Error creating Razorpay order:', err);
        res.status(500).json({ message: 'Error creating order' });
    }
});

// 9. Verify Payment Signature
app.post('/api/payment/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const hmac = crypto.createHmac('sha256', razorpay.key_secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
        res.json({ success: true, message: 'Payment verified successfully' });
    } else {
        res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
});

// Root Route
app.get('/api', (req, res) => {
    res.send('FIT PEOPLE GYM - Premium Backend Running with SQLite');
});

// --- SERVE FRONTEND (PRODUCTION) ---
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Catch-all to serve React index.html for any non-API route
app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
