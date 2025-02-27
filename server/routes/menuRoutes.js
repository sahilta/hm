import express from "express";
import Menu from "../models/Menu.js"; // Import Mongoose model

const router = express.Router();

// 🍽️ Sample menu data
const sampleMenu = [
    { name: "Burger", category: "Fast Food", price: 5.99 },
    { name: "Pizza", category: "Fast Food", price: 9.99 },
    { name: "Pasta", category: "Italian", price: 7.99 },
    { name: "Sushi", category: "Japanese", price: 12.99 },
    { name: "Salad", category: "Healthy", price: 6.49 },
];

// ✅ Function to seed sample data
const seedMenu = async () => {
    try {
        const count = await Menu.countDocuments();
        if (count === 0) {
            await Menu.insertMany(sampleMenu);
            console.log("✅ Sample menu items added to the database!");
        }
    } catch (error) {
        console.error("⚠️ Error seeding menu:", error.message);
    }
};

// ✅ Call the seed function on startup
seedMenu();

// ✅ GET all menu items from DB
router.get("/", async (req, res) => {
    try {
        const menu = await Menu.find();
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ GET a single menu item by ID from DB
router.get("/:id", async (req, res) => {
    try {
        const item = await Menu.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: "Invalid ID format", error: error.message });
    }
});

// ✅ POST a new menu item to DB
router.post("/", async (req, res) => {
    try {
        const { name, category, price } = req.body;
        if (!name || !category || !price) {
            return res.status(400).json({ message: "Name, category, and price are required" });
        }

        const newItem = new Menu({ name, category, price });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: "Error adding item", error: error.message });
    }
});

// ✅ PUT (Update) a menu item by ID in DB
router.put("/:id", async (req, res) => {
    try {
        const { name, category, price } = req.body;
        const item = await Menu.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });

        if (name) item.name = name;
        if (category) item.category = category;
        if (price) item.price = price;

        await item.save();
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
});

// ✅ DELETE a menu item from DB
router.delete("/:id", async (req, res) => {
    try {
        const item = await Menu.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });

        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed", error: error.message });
    }
});

export default router;
