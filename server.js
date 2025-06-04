// Server for PawCare Connect Authentication
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection string - replace with your actual connection string in production
const uri = "mongodb://localhost:27017/pawcare";
let db;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

// Connect to MongoDB
async function connectToMongo() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log("Connected to MongoDB");
        db = client.db("pawcare");
        
        // Create LeBron James account if it doesn't exist
        await createLebronAccount();
        
        return client;
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    }
}

// Create LeBron James account
async function createLebronAccount() {
    try {
        // Check if LeBron's account already exists
        const existingUser = await db.collection('users').findOne({ email: 'lebron@example.com' });
        
        if (!existingUser) {
            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password123', salt);
            
            // Create LeBron's account
            const lebronUser = {
                firstName: 'LeBron',
                lastName: 'James',
                email: 'lebron@example.com',
                passwordHash: hashedPassword,
                role: 'customer',
                memberSince: new Date(),
                isPremium: true,
                address: {
                    street: '123 Basketball Court',
                    city: 'Los Angeles',
                    state: 'CA',
                    zipCode: '90001',
                    country: 'USA'
                },
                phoneNumber: '555-123-4567',
                loyaltyPoints: 325
            };
            
            await db.collection('users').insertOne(lebronUser);
            console.log("LeBron James account created");
        } else {
            console.log("LeBron James account already exists");
        }
    } catch (err) {
        console.error("Error creating LeBron account:", err);
    }
}

// Routes
// Register new user
app.post('/api/auth/register', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        
        // Split fullname into first and last name
        const nameParts = fullname.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create new user
        const newUser = {
            firstName,
            lastName,
            email,
            passwordHash: hashedPassword,
            role: 'customer',
            memberSince: new Date(),
            isPremium: false
        };
        
        const result = await db.collection('users').insertOne(newUser);
        
        // Return user without password
        const userToReturn = {
            id: result.insertedId,
            firstName,
            lastName,
            email,
            role: 'customer'
        };
        
        res.status(201).json({
            message: 'User registered successfully',
            user: userToReturn
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await db.collection('users').findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // Check password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // Return user without password
        const userToReturn = {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role
        };
        
        res.json({
            message: 'Login successful',
            user: userToReturn
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Get user profile
app.get('/api/auth/profile/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Find user by ID
        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Return user without password
        const userToReturn = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            memberSince: user.memberSince,
            isPremium: user.isPremium,
            address: user.address,
            phoneNumber: user.phoneNumber,
            loyaltyPoints: user.loyaltyPoints
        };
        
        res.json(userToReturn);
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ message: 'Server error fetching profile' });
    }
});

// Start server
async function startServer() {
    const client = await connectToMongo();
    
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    
    // Handle shutdown gracefully
    process.on('SIGINT', async () => {
        await client.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    });
}

startServer(); 