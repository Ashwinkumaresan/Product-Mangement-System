import React, { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

export const Login = ({ notify }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log("hi")
        axios.post('http://localhost:3000/login', { email, password }).then(
            result => {
                console.log(result);
                //console.log(result.data.message);
                if (result.data.message === "Login Success") {
                    console.log(result.data.message);
                    console.log(result.data.token);
                    const token = result.data.token;
                    localStorage.setItem('token', token);
                    const name = result.data.name;
                    localStorage.setItem('name', name);
                    notify();
                    navigate("/home");
                } else {
                    warning(result.data.message);
                }
            }
        ).catch(
            error => console.log(error)
        )
    }
    const warning = (obj) => {
        toast.warn(obj, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="colored"
            />
            <div className="signup">
                <div className="container p-3 p-md-4 border rounded">
                    <h2 className='text-center'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" name='email' placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" id="password" name='password' placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button className='btn btn-primary w-100 my-2'>Login</button>
                        <p>Don't have an account</p>
                    </form>
                    <Link to="/" className='btn btn-outline-primary w-100'>Signup</Link>
                </div>
            </div>
        </>
    )
}
