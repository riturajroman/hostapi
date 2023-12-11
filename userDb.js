const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs/promises'); // Using fs.promises for async file read

dotenv.config();

const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Step 1: Define Mongoose Schema
const userSchema = new mongoose.Schema({
    name: String,
    team: String,
    role: String,
    age: Number,
});

const User = mongoose.model('User', userSchema);

// Step 2: Read Local JSON File
async function readJsonFile(filePath) {
    try {
        const jsonData = await fs.readFile(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        throw error;
    }
}

// Step 3: Insert Data into MongoDB using create method
async function insertData() {
    try {
        const filePath = './users.json';
        const users = await readJsonFile(filePath);

        await User.create(users);
        console.log('Data inserted successfully!');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        mongoose.connection.close(); // Close the connection after inserting data or on error
    }
}

// Call the insertData function
insertData();