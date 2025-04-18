import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
import { Link } from 'react-router-dom';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: ''
    });

    // Fetch products from backend
    const fetchProducts = () => {
        axios.get('http://localhost:3000/products')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Add new product
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/products/add', formData)
            .then(res => {
                fetchProducts(); // Refresh list
                setFormData({ name: '', price: '', description: '' }); // Clear form
                setOpen(false) // Close pop up
            })
            .catch(err => {
                console.error('Error adding product:', err);
            });
    };

    // Delete product
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/products/delete/${id}`)
            .then(() => {
                fetchProducts();
            })
            .catch(err => {
                console.error('Error deleting product:', err);
            });
    };

    return (
        <div className='container'>
            <div className='d-flex justify-content-around align-items-center mt-2'>
                <Link to="/home" className='btn'>Home</Link>
                <h2>Product Page</h2>
                <button onClick={() => setOpen(true)} className='btn btn-primary px-5 py-1' >Add</button>
            </div>
            <hr />

            {/* Product List */}
            <div className="container">
                <div className="row m-1 m-md-5">
                    {products.map((product) => (
                        <div key={product._id} className="col-6 col-md-4 col-lg-3 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <strong>{product.name}</strong> - ₹{product.price}
                                    <br />
                                    {product.description}
                                    <br />
                                    <button
                                        className="btn btn-danger btn-sm mt-2"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {
                open && (
                    <div className="open_popup">
                        {/* Add Product Form */}
                        <form onSubmit={handleSubmit} className=' p-3 p-md-4 border rounded' >
                            <div>
                                <span className='fs-2 close d-flex' onClick={() => setOpen(false)}>&times;</span>
                            </div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit" className='btn btn-primary'>Add Product</button>
                        </form>
                    </div>
                )
            }
        </div>
    );
};

export default Product;
