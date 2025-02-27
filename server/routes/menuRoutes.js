const express = require("express");
const router = express.Router();

// Sample menu data (Replace with a database later)
const menu = [
    { id: 1, name: "Burger", price: 5.99 },
    { id: 2, name: "Pizza", price: 9.99 },
    { id: 3, name: "Pasta", price: 7.99 },
];

// 🛑 GET all menu items
router.get("/", (req, res) => {
    res.json(menu);
});

// 🛑 GET a single menu item by ID
router.get("/:id", (req, res) => {
    const item = menu.find((m) => m.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
});

// 🛑 POST a new menu item
router.post("/", (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) return res.status(400).json({ message: "Name and price are required" });

    const newItem = { id: menu.length + 1, name, price };
    menu.push(newItem);
    res.status(201).json(newItem);
});

// 🛑 PUT (Update) a menu item by ID
router.put("/:id", (req, res) => {
    const item = menu.find((m) => m.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.name = req.body.name || item.name;
    item.price = req.body.price || item.price;
    res.json(item);
});

// 🛑 DELETE a menu item
router.delete("/:id", (req, res) => {
    const index = menu.findIndex((m) => m.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Item not found" });

    menu.splice(index, 1);
    res.json({ message: "Item deleted successfully" });
});

module.exports = router;
