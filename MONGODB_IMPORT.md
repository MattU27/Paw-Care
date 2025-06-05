# PawCare MongoDB Import

This document explains how to import the JSON data from the `PawCare DB` folder into a MongoDB database.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher) installed and running
- MongoDB Node.js driver (included in package.json)

## Import Process

The `import_db.js` script has been created to automate the import process. It:

1. Connects to the MongoDB server running at `mongodb://localhost:27017/pawcare`
2. Reads all JSON files from the `PawCare DB` directory
3. For each file, it extracts the collection name from the filename
4. Drops the existing collection if it exists
5. Imports the data into the appropriate collection

## Running the Import

To import the data:

1. Make sure MongoDB is running on your system
2. Run the import script:
   ```
   node import_db.js
   ```

## Imported Collections

The following collections have been imported:

- `appointments`: Pet appointment records
- `categories`: Product categories
- `healthRecords`: Pet health records
- `orders`: Customer orders
- `pets`: Pet profiles
- `products`: Shop items for sale
- `promoCodes`: Discount promo codes
- `services`: Veterinary and grooming services
- `vets`: Veterinarian profiles

The `users` collection was skipped because the JSON file contained an empty array.

## Verification

You can verify the import by connecting to the MongoDB database:

```
mongosh "mongodb://localhost:27017/pawcare"
```

And listing the collections:

```
db.getCollectionNames()
```

To view the data in a specific collection:

```
db.collectionName.find().toArray()
```

## Customization

If you need to connect to a different MongoDB instance, modify the `uri` variable in `import_db.js`:

```javascript
const uri = "your-mongodb-connection-string";
``` 