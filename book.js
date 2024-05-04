import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    publisher: { type: String, required: true }
});

export const Book = mongoose.model('Book', bookSchema);
