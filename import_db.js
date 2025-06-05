// MongoDB Import Script for PawCare Connect
// This script will import JSON files from the PawCare DB folder into MongoDB

// Import required packages
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

// MongoDB connection string - matches the one used in server.js
const uri = "mongodb://localhost:27017/pawcare";

// Function to read and parse JSON files
function readJsonFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return null;
    }
}

// Main import function
async function importDatabase() {
    let client;
    
    try {
        // Connect to MongoDB
        client = new MongoClient(uri);
        await client.connect();
        console.log("Connected to MongoDB");
        
        const db = client.db("pawcare");
        
        // Get all JSON files from the PawCare DB directory
        const dbDirPath = path.join(__dirname, 'PawCare DB');
        const files = fs.readdirSync(dbDirPath).filter(file => file.endsWith('.json'));
        
        console.log(`Found ${files.length} JSON files to import`);
        
        // Track success and failures
        const results = {
            success: 0,
            skipped: 0,
            failed: 0
        };
        
        // Process each file
        for (const file of files) {
            try {
                console.log(`\nProcessing file: ${file}`);
                const filePath = path.join(dbDirPath, file);
                const data = readJsonFile(filePath);
                
                if (!data) {
                    console.log(`  Skipping ${file} due to parsing error`);
                    results.skipped++;
                    continue;
                }
                
                // Extract collection name from filename (e.g., "pawcare.users.json" -> "users")
                const collectionName = file.replace('pawcare.', '').replace('.json', '');
                console.log(`  Target collection: ${collectionName}`);
                
                // Check if the collection already exists and drop it if it does
                const collections = await db.listCollections({ name: collectionName }).toArray();
                if (collections.length > 0) {
                    console.log(`  Dropping existing collection: ${collectionName}`);
                    await db.collection(collectionName).drop();
                }
                
                // Skip empty arrays
                if (Array.isArray(data) && data.length === 0) {
                    console.log(`  Skipping empty collection: ${collectionName}`);
                    results.skipped++;
                    continue;
                }
                
                // Insert the data
                if (Array.isArray(data) && data.length > 0) {
                    console.log(`  Inserting ${data.length} documents into ${collectionName}`);
                    const result = await db.collection(collectionName).insertMany(data);
                    console.log(`  Successfully imported ${result.insertedCount} documents into ${collectionName}`);
                    results.success++;
                } else if (!Array.isArray(data)) {
                    console.log(`  Inserting 1 document into ${collectionName}`);
                    const result = await db.collection(collectionName).insertOne(data);
                    console.log(`  Successfully imported 1 document into ${collectionName}`);
                    results.success++;
                }
            } catch (error) {
                console.error(`  Error processing ${file}:`, error);
                results.failed++;
            }
        }
        
        console.log("\nImport Summary:");
        console.log(`  Success: ${results.success} collections`);
        console.log(`  Skipped: ${results.skipped} collections`);
        console.log(`  Failed: ${results.failed} collections`);
        
        if (results.failed === 0 && results.skipped === 0) {
            console.log("\nDatabase import completed successfully");
        } else if (results.failed === 0) {
            console.log("\nDatabase import completed with some collections skipped");
        } else {
            console.log("\nDatabase import completed with errors");
        }
    } catch (error) {
        console.error("Fatal error during database import:", error);
    } finally {
        if (client) {
            await client.close();
            console.log("MongoDB connection closed");
        }
    }
}

// Run the import function
importDatabase(); 