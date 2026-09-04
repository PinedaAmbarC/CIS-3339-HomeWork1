const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    classId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    className: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);