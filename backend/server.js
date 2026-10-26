const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection (Local or Atlas)
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lakbay_lokal')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('DB Connection Error:', err));

// Destination Schema Model
const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: String, required: true, enum: ['Low', 'Medium', 'High'] },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Destination = mongoose.model('Destination', destinationSchema);

// GET: Fetch / Search / Filter Destinations
app.get('/api/destinations', async (req, res) => {
  try {
    const { search, category, budget } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    if (category && category !== 'All') query.category = category;
    if (budget && budget !== 'All') query.budget = budget;

    const destinations = await Destination.find(query).sort({ createdAt: -1 });
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching destinations' });
  }
});

// POST: Create New Destination
app.post('/api/destinations', async (req, res) => {
  try {
    const newItem = new Destination(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create destination' });
  }
});

// PUT: Update Destination
app.put('/api/destinations/:id', async (req, res) => {
  try {
    const updated = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update destination' });
  }
});

// DELETE: Remove Destination
app.delete('/api/destinations/:id', async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: 'Destination deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete destination' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));