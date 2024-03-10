const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB (make sure to install and run MongoDB locally or use a cloud-based service)
mongoose.connect('mongodb://localhost/file-upload', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for storing file information
const fileSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
    mimetype: String,
    size: Number,
    timestamp: { type: Date, default: Date.now }
});

const File = mongoose.model('File', fileSchema);

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;

    // Store file information in the database
    const newFile = new File({
        filename: file.fieldname,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size
    });

    newFile.save((err, savedFile) => {
        if (err) {
            console.error('Error saving file information to the database:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Log the file information to the console
            console.log('File information:', savedFile);

            // Send a response to the front-end
            res.json({ message: 'File uploaded successfully', file: savedFile });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


