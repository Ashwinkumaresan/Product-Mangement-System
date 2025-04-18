import './App.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Signup = ({ notifySignup }) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log("hi")
        axios.post('http://localhost:3000/register', { name, email, password }).then(
            result => {
                //console.log(result);
                navigate("/login");
                notifySignup();
            }
        ).catch(
            error => console.log(error)
        )
    }
    return (
        <>
            <div className="signup">
                <div className="container p-3 p-md-4 border rounded">
                    <h2 className='text-center'>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" className="form-control" id="name" name='name' placeholder="Enter name" onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" name='email' placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" id="password" name='password' placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button className='btn btn-primary w-100 my-2'>Register</button>
                        <p>Already have an account</p>
                    </form>
                    <Link to="/login" className='btn btn-outline-primary w-100'>Login</Link>
                </div>
            </div>
        </>
    )
}
