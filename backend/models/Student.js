const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    studentId: {
        type: String,
        required: true,
        trim: true,
        // tells MongoDB to create a unique index, to prevent duplications
        unique: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    zip: {
        type: String,
        required: true,
        trim: true
    }
    // Good for debugging
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);