const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require('./models/Employee');
const ProductModel = require('./models/Product');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee");

// Register
app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then((employee) => res.json(employee))
        .catch((err) => res.status(400).json(err));
});

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email }).then((user) => {
        if (user) {
            if (user.password === password) {
                const token = jwt.sign({ userId: user._id }, 'Ashwin@7852', { expiresIn: '1h' });
                res.json({ message: "Login Success", name: user.name, token });
            } else {
                res.json({ message: "Invalid Password" });
            }
        } else {
            res.json({ message: "Invalid Email" });
        }
    });
});

// Add Product
app.post('/products/add', async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body);
        await newProduct.save();
        res.json({ message: 'Product added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all Products
app.get('/products', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Product
app.delete('/products/delete/:id', async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
});
