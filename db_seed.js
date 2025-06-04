// MongoDB Seed Script for PawCare Connect
// This script will populate the database with mock data

// Import required packages
const { MongoClient } = require('mongodb');

// MongoDB connection string - replace with your actual connection string in production
const uri = "mongodb://localhost:27017/pawcare";

// Sample data for the database
const users = [
  {
    _id: "user1",
    firstName: "LeBron",
    lastName: "James",
    email: "lebron@example.com",
    passwordHash: "hashed_password_here", // In production, use proper password hashing
    role: "customer",
    memberSince: new Date("2023-10-01"),
    isPremium: true,
    address: {
      street: "123 Basketball Court",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA"
    },
    phoneNumber: "555-123-4567",
    loyaltyPoints: 325
  },
  {
    _id: "user2",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    passwordHash: "hashed_password_here",
    role: "customer",
    memberSince: new Date("2023-09-15"),
    isPremium: false,
    address: {
      street: "456 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    phoneNumber: "555-987-6543",
    loyaltyPoints: 150
  },
  {
    _id: "admin1",
    firstName: "Admin",
    lastName: "User",
    email: "admin@pawcare.com",
    passwordHash: "admin_password_hash",
    role: "admin",
    memberSince: new Date("2023-01-01"),
    isPremium: false
  }
];

const pets = [
  {
    _id: "pet1",
    name: "Max",
    ownerId: "user1",
    species: "Dog",
    breed: "Golden Retriever",
    age: 3,
    weight: 65.5, // in lbs
    birthdate: new Date("2020-06-15"),
    microchipped: true,
    vaccinated: true,
    neutered: true,
    medicalNotes: "Allergic to chicken",
    imageUrl: "https://images.unsplash.com/photo-1587764379873-97837921fd44"
  },
  {
    _id: "pet2",
    name: "Luna",
    ownerId: "user1",
    species: "Cat",
    breed: "Siamese",
    age: 2,
    weight: 8.2, // in lbs
    birthdate: new Date("2021-03-10"),
    microchipped: true,
    vaccinated: true,
    neutered: false,
    medicalNotes: "Sensitive stomach",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"
  },
  {
    _id: "pet3",
    name: "Buddy",
    ownerId: "user2",
    species: "Dog",
    breed: "Beagle",
    age: 5,
    weight: 30.2, // in lbs
    birthdate: new Date("2018-04-22"),
    microchipped: false,
    vaccinated: true,
    neutered: true,
    medicalNotes: "",
    imageUrl: "https://images.unsplash.com/photo-1544568100-847a948585b9"
  }
];

const products = [
  {
    _id: "prod1",
    name: "Royal Canin Adult Dog Food",
    description: "Premium nutrition for adult dogs",
    price: 49.99,
    category: "Food & Treats",
    subCategory: "Dog Food",
    imageUrl: "images/Royal Canin Adult Dog Food.png",
    stock: 45,
    rating: 4.8,
    reviews: 127,
    featured: true,
    discountPercentage: 0
  },
  {
    _id: "prod2",
    name: "Wellness Kittles Cat Treats",
    description: "Crunchy, grain-free treats for cats",
    price: 14.99,
    category: "Food & Treats",
    subCategory: "Cat Treats",
    imageUrl: "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad",
    stock: 78,
    rating: 4.5,
    reviews: 89,
    featured: true,
    discountPercentage: 0
  },
  {
    _id: "prod3",
    name: "KONG Classic Toy Bundle",
    description: "Durable rubber toys for dogs",
    price: 24.99,
    category: "Toys",
    subCategory: "Dog Toys",
    imageUrl: "images/KONG Classic Toy Bundle.jpg",
    stock: 32,
    rating: 4.9,
    reviews: 203,
    featured: true,
    discountPercentage: 0
  },
  {
    _id: "prod4",
    name: "Orthopedic Memory Foam Pet Bed",
    description: "Comfortable bed for pets with joint issues",
    price: 39.99,
    category: "Beds & Home",
    subCategory: "Pet Beds",
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
    stock: 15,
    rating: 4.7,
    reviews: 65,
    featured: true,
    discountPercentage: 0
  },
  {
    _id: "prod5",
    name: "Reflective Nylon Dog Collar",
    description: "Safety collar with reflective stitching",
    price: 19.99,
    category: "Accessories",
    subCategory: "Collars & Leashes",
    imageUrl: "images/Reflective Nylon Dog Collar.jpg",
    stock: 53,
    rating: 4.4,
    reviews: 42,
    featured: true,
    discountPercentage: 0
  },
  {
    _id: "prod6",
    name: "Furminator Deluxe Grooming Kit",
    description: "Complete grooming solution for pets",
    price: 34.99,
    category: "Grooming",
    subCategory: "Grooming Tools",
    imageUrl: "images/Furminator Deluxe Grooming Kit.jpg",
    stock: 28,
    rating: 4.6,
    reviews: 118,
    featured: true,
    discountPercentage: 15
  }
];

const categories = [
  {
    _id: "cat1",
    name: "Food & Treats",
    imageUrl: "images/Foods & Treats.png",
    featured: true
  },
  {
    _id: "cat2",
    name: "Toys",
    imageUrl: "images/Toys.jpg",
    featured: true
  },
  {
    _id: "cat3",
    name: "Health",
    imageUrl: "images/Health.png",
    featured: false
  },
  {
    _id: "cat4",
    name: "Grooming",
    imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7",
    featured: true
  },
  {
    _id: "cat5",
    name: "Accessories",
    imageUrl: "images/Accessories.jpg",
    featured: false
  },
  {
    _id: "cat6",
    name: "Beds & Home",
    imageUrl: "images/Beds & Home.jpg",
    featured: true
  },
  {
    _id: "cat7",
    name: "Training",
    imageUrl: "images/Training.png",
    featured: false
  },
  {
    _id: "cat8",
    name: "Travel",
    imageUrl: "images/Travel.png",
    featured: false
  },
  {
    _id: "cat9",
    name: "Wellness",
    imageUrl: "images/Wellness.png",
    featured: false
  },
  {
    _id: "cat10",
    name: "Litter & Waste",
    imageUrl: "images/Litter & Waste.png",
    featured: false
  }
];

const vets = [
  {
    _id: "vet1",
    firstName: "Stephen",
    lastName: "Curry",
    specialty: "Small Animal Specialist",
    experience: "10+ years",
    imageUrl: "https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png",
    bio: "Dr. Curry specializes in the care of small pets including dogs, cats, and small mammals.",
    available: true,
    rating: 4.9,
    reviews: 156
  },
  {
    _id: "vet2",
    firstName: "Sarah",
    lastName: "Johnson",
    specialty: "Veterinary Surgeon",
    experience: "8 years",
    imageUrl: "https://randomuser.me/api/portraits/women/22.jpg",
    bio: "Dr. Johnson is an experienced surgeon specializing in orthopedic procedures.",
    available: true,
    rating: 4.8,
    reviews: 98
  },
  {
    _id: "vet3",
    firstName: "Michael",
    lastName: "Brown",
    specialty: "Feline Medicine",
    experience: "12 years",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Dr. Brown has dedicated his career to feline medicine and behavior.",
    available: false,
    rating: 4.7,
    reviews: 124
  }
];

const services = [
  {
    _id: "serv1",
    name: "Annual Wellness Exam",
    description: "Complete physical examination to ensure your pet's overall health and wellness.",
    category: "checkup",
    price: 75.00,
    duration: 45, // minutes
    popular: true,
    features: ["Comprehensive health check", "Preventive care advice", "Nutrition consultation"],
    imageUrl: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def"
  },
  {
    _id: "serv2",
    name: "Vaccinations",
    description: "Essential immunizations to protect your pet from common infectious diseases.",
    category: "vaccines",
    price: 45.00,
    duration: 20, // minutes
    popular: false,
    features: ["Core vaccines available", "Non-core vaccines", "Vaccination record management"],
    imageUrl: "../images/Vaccination Pet.jpg"
  },
  {
    _id: "serv3",
    name: "Sick Pet Visit",
    description: "Immediate care for pets experiencing illness, injury, or concerning symptoms.",
    category: "urgent",
    price: 95.00,
    duration: 60, // minutes
    popular: false,
    features: ["Same-day appointments", "Diagnostic services", "Treatment plans"],
    imageUrl: "../images/Sick Pet Visit.jpg"
  },
  {
    _id: "serv4",
    name: "Dental Cleaning",
    description: "Professional teeth cleaning to maintain your pet's oral health and prevent disease.",
    category: "checkup",
    price: 180.00,
    duration: 90, // minutes
    popular: false,
    features: ["Complete dental exam", "Plaque and tartar removal", "Polishing and fluoride treatment"],
    imageUrl: "../images/Dental Cleaning.png"
  },
  {
    _id: "serv5",
    name: "Virtual Consult",
    description: "Convenient online consultations for minor concerns or follow-up appointments.",
    category: "checkup",
    price: 60.00,
    duration: 30, // minutes
    popular: true,
    features: ["24/7 availability", "Video consultation", "Digital prescriptions available"],
    imageUrl: "../images/Virtual Consult.png"
  },
  {
    _id: "serv6",
    name: "Grooming",
    description: "Professional grooming services to keep your pet looking and feeling their best.",
    category: "checkup",
    price: 65.00,
    duration: 60, // minutes
    popular: false,
    features: ["Bathing and drying", "Haircut and styling", "Nail trimming and ear cleaning"],
    imageUrl: "../images/Grooming Pet.png"
  }
];

const appointments = [
  {
    _id: "app1",
    userId: "user1",
    petId: "pet1",
    vetId: "vet2",
    serviceId: "serv1",
    date: new Date("2023-11-15T10:00:00"),
    status: "scheduled",
    notes: "Annual checkup for Max"
  },
  {
    _id: "app2",
    userId: "user1",
    petId: "pet2",
    vetId: null, // For grooming appointments, no vet needed
    serviceId: "serv6",
    date: new Date("2023-11-28T14:30:00"),
    status: "scheduled",
    notes: "Luna needs nail trimming and ear cleaning"
  },
  {
    _id: "app3",
    userId: "user2",
    petId: "pet3",
    vetId: "vet1",
    serviceId: "serv2",
    date: new Date("2023-11-10T13:15:00"),
    status: "completed",
    notes: "Rabies vaccination"
  }
];

const orders = [
  {
    _id: "ord1",
    userId: "user1",
    orderDate: new Date("2023-11-02"),
    status: "delivered",
    shippingAddress: {
      street: "123 Basketball Court",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA"
    },
    items: [
      {
        productId: "prod1",
        quantity: 1,
        price: 49.99
      }
    ],
    subtotal: 49.99,
    tax: 4.12,
    shipping: 5.99,
    discount: 0,
    total: 60.10,
    paymentMethod: "credit_card",
    trackingNumber: "USP12345678"
  },
  {
    _id: "ord2",
    userId: "user1",
    orderDate: new Date("2023-10-28"),
    status: "shipped",
    shippingAddress: {
      street: "123 Basketball Court",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA"
    },
    items: [
      {
        productId: "prod4",
        quantity: 1,
        price: 39.99
      }
    ],
    subtotal: 39.99,
    tax: 3.30,
    shipping: 5.99,
    discount: 0,
    total: 49.28,
    paymentMethod: "credit_card",
    trackingNumber: "USP87654321"
  },
  {
    _id: "ord3",
    userId: "user2",
    orderDate: new Date("2023-11-05"),
    status: "processing",
    shippingAddress: {
      street: "456 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    items: [
      {
        productId: "prod3",
        quantity: 1,
        price: 24.99
      },
      {
        productId: "prod5",
        quantity: 2,
        price: 19.99
      }
    ],
    subtotal: 64.97,
    tax: 5.76,
    shipping: 5.99,
    discount: 0,
    total: 76.72,
    paymentMethod: "paypal",
    trackingNumber: null
  }
];

const healthRecords = [
  {
    _id: "hr1",
    petId: "pet1",
    date: new Date("2023-10-15"),
    type: "examination",
    vetId: "vet1",
    notes: "Annual wellness exam. All vitals normal. Weight: 65.5 lbs.",
    medications: ["Heartgard Plus - monthly"],
    vaccinations: ["Rabies - valid until 10/15/2024"],
    attachments: []
  },
  {
    _id: "hr2",
    petId: "pet1",
    date: new Date("2022-10-20"),
    type: "examination",
    vetId: "vet2",
    notes: "Annual wellness exam. All vitals normal. Weight: 63.2 lbs.",
    medications: ["Heartgard Plus - monthly"],
    vaccinations: ["Rabies - valid until 10/20/2023", "DHPP - valid until 10/20/2023"],
    attachments: []
  },
  {
    _id: "hr3",
    petId: "pet2",
    date: new Date("2023-09-05"),
    type: "examination",
    vetId: "vet3",
    notes: "Checkup for digestive issues. Recommended special diet.",
    medications: ["Probiotic supplement - daily for 2 weeks"],
    vaccinations: [],
    attachments: []
  }
];

const promoCodes = [
  {
    _id: "promo1",
    code: "WELCOME15",
    description: "15% off for first-time buyers",
    discountPercentage: 15,
    maxDiscount: 50,
    minPurchase: 0,
    isActive: true,
    validFrom: new Date("2023-01-01"),
    validTo: new Date("2023-12-31"),
    usageLimit: 1,
    usageCount: 0,
    forFirstTimeOnly: true
  },
  {
    _id: "promo2",
    code: "SUMMER40",
    description: "40% off on selected summer items",
    discountPercentage: 40,
    maxDiscount: 100,
    minPurchase: 50,
    isActive: true,
    validFrom: new Date("2023-06-01"),
    validTo: new Date("2023-08-31"),
    usageLimit: null,
    usageCount: 0,
    forFirstTimeOnly: false,
    applicableCategories: ["cat4", "cat8"] // Grooming and Travel categories
  }
];

// Function to seed the database
async function seedDatabase() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db();
    
    // Drop existing collections to start fresh
    const collections = ['users', 'pets', 'products', 'categories', 'vets', 
                          'services', 'appointments', 'orders', 'healthRecords', 'promoCodes'];
    
    for (const collection of collections) {
      try {
        await db.collection(collection).drop();
        console.log(`Dropped collection: ${collection}`);
      } catch (err) {
        // Collection might not exist, which is fine
        console.log(`Collection ${collection} might not exist, creating it now`);
      }
    }
    
    // Insert all data
    await db.collection('users').insertMany(users);
    await db.collection('pets').insertMany(pets);
    await db.collection('products').insertMany(products);
    await db.collection('categories').insertMany(categories);
    await db.collection('vets').insertMany(vets);
    await db.collection('services').insertMany(services);
    await db.collection('appointments').insertMany(appointments);
    await db.collection('orders').insertMany(orders);
    await db.collection('healthRecords').insertMany(healthRecords);
    await db.collection('promoCodes').insertMany(promoCodes);
    
    console.log("Database seeded successfully!");
    
    // Create indexes for better performance
    await db.collection('products').createIndex({ name: "text", description: "text" });
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('pets').createIndex({ ownerId: 1 });
    await db.collection('appointments').createIndex({ userId: 1 });
    await db.collection('appointments').createIndex({ date: 1 });
    await db.collection('orders').createIndex({ userId: 1 });
    await db.collection('healthRecords').createIndex({ petId: 1 });
    
    console.log("Indexes created successfully!");
    
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

// Run the seed function
seedDatabase().catch(console.error); 