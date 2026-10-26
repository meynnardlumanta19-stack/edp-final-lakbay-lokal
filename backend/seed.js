const mongoose = require('mongoose');

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

// All Maasin City & Southern Leyte Spots Combined
const maasinSpots = [
  // --- Attractions ---
  {
    name: "Monte Cueva Shrine",
    category: "Tourist Spot",
    location: "Maasin City, Southern Leyte",
    description: "A breathtaking sacred pilgrimage site nestled inside a natural cave atop a hill, featuring hundreds of steps and a stunning panoramic view.",
    budget: "Low",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Maasin Cathedral",
    category: "Tourist Spot",
    location: "City Proper, Maasin City",
    description: "A historic Spanish-era heritage landmark and cathedral known for its rich religious significance and colonial architecture.",
    budget: "Low",
    imageUrl: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Camp Danao Forest Park",
    category: "Tourist Spot",
    location: "Maasin City, Southern Leyte",
    description: "A cool nature haven featuring lush forests, hiking trails, ziplining, and scenic eco-tourism landscapes.",
    budget: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1511497584788-876761142212?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Guinsohotan Cave & Waterfalls",
    category: "Tourist Spot",
    location: "Maasin City, Southern Leyte",
    description: "An adventurous outdoor escape featuring cascading cool water, lush green surroundings, and hidden cave formations.",
    budget: "Low",
    imageUrl: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f6?q=80&w=1000&auto=format&fit=crop"
  },

  // --- Hotels ---
  {
    name: "GV Hotel Maasin",
    category: "Hotel",
    location: "T. Opus Street, Maasin City",
    description: "A popular, accessible, and budget-friendly accommodation option right in the heart of downtown with essential amenities.",
    budget: "Low",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Caimito Beach Hotel",
    category: "Hotel",
    location: "Maasin City, Southern Leyte",
    description: "An exceptional beachfront accommodation featuring an outdoor swimming pool, relaxing seaside rooms, and scenic sunset views.",
    budget: "High",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "The Baluarte",
    category: "Hotel",
    location: "Maasin City, Southern Leyte",
    description: "A highly recommended cozy lodging choice known for its comfort, welcoming ambiance, and great customer reviews.",
    budget: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop"
  },

  // --- Beaches ---
  {
    name: "Kuting Reef Resort",
    category: "Beach",
    location: "Macrohon, Southern Leyte",
    description: "A premier coastal destination offering pristine beachfront views, crystal clear waters, and top-tier diving proximity.",
    budget: "High",
    imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Mantahan Beach",
    category: "Beach",
    location: "Mantahan, Maasin City",
    description: "A local coastal spot ideal for afternoon strolls, catching the gorgeous Maasin sunset, and relaxing by the sea breeze.",
    budget: "Low",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop"
  },

  // --- Restaurants ---
  {
    name: "Kinamot Sa Abgao",
    category: "Restaurant",
    location: "Abgao, Maasin City",
    description: "A famous local dining spot specializing in traditional Filipino native dishes, grilled seafood, and boodle-fight style meals.",
    budget: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Alberto's Pizza Maasin",
    category: "Restaurant",
    location: "City Proper, Maasin City",
    description: "A heavily frequented budget-friendly pizzeria loved by students, barkadas, and families for quick bites and affordable boxes.",
    budget: "Low",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Mr. Wok",
    category: "Restaurant",
    location: "Maasin City Proper",
    description: "A popular local restaurant serving savory Asian-inspired stir-fries, rice meals, and comforting comfort food favorites.",
    budget: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1000&auto=format&fit=crop"
  }
];

// Function to seed this data into your MongoDB database
async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lakbay_lokal');
    console.log("Connected to MongoDB for seeding...");

    await Destination.deleteMany({}); // Clears old dummy data
    await Destination.insertMany(maasinSpots); // Inserts real Maasin spots

    console.log("Database successfully seeded with Maasin City spots!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

seedDB();