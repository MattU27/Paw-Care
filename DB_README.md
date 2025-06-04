# PawCare Connect - MongoDB Database Setup

This directory contains scripts to set up and seed the MongoDB database for the PawCare Connect pet shop website.

## Database Structure

The database includes the following collections:

- **users**: Customer and admin user accounts
- **pets**: Pet profiles linked to owners
- **products**: Shop items for sale
- **categories**: Product categories
- **vets**: Veterinarian profiles
- **services**: Veterinary and grooming services
- **appointments**: Scheduled appointments
- **orders**: Customer orders
- **healthRecords**: Pet health history
- **promoCodes**: Discount codes

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)

### Installation

1. Make sure MongoDB is running on your system
2. Install dependencies:
   ```
   npm install
   ```

### Seeding the Database

Run the following command to populate the database with mock data:

```
npm run seed
```

This will:
1. Connect to MongoDB at `mongodb://localhost:27017/pawcare`
2. Drop any existing collections to start fresh
3. Create all collections and populate them with sample data
4. Create indexes for better performance

### Customizing the Connection

To use a different MongoDB connection string, modify the `uri` variable in `db_seed.js`:

```javascript
const uri = "your-mongodb-connection-string";
```

## Mock Data

The seed script includes mock data for:

- 3 users (2 customers, 1 admin)
- 3 pets
- 6 products
- 10 product categories
- 3 veterinarians
- 6 veterinary services
- 3 appointments
- 3 orders
- 3 health records
- 2 promo codes

You can modify or expand this data by editing the arrays in `db_seed.js`.

## Usage in the Application

After seeding the database, the PawCare Connect application can connect to this MongoDB instance to:

- Authenticate users
- Display and manage products
- Book veterinary appointments
- Track orders
- Manage pet profiles and health records

## Development Notes

This is a mock database setup for development purposes. In a production environment, you would:

1. Use a more secure connection string with authentication
2. Implement proper password hashing
3. Set up database backups
4. Consider using a MongoDB Atlas cloud instance 