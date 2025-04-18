import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './Signup'
import { Login } from './Login'
import { Home } from './Home'
import { ToastContainer, toast } from 'react-toastify';
import ProtectedRoute from './ProtectedRoute'
import Unauthorized from './Unauthorized'
import Products from './Products '

function App() {
  const notify = () => {
    console.log("notify");
    
    toast.success('Successfully logined...', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const notifySignup = () => {
    toast.success('Successfully logined...', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

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
        theme="light"
        style={{
          zIndex:"999"
        }}
      />
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup notifySignup={notifySignup} />} />
          <Route path="/login" element={<Login notify={notify} />} />
          <Route path="/home" element={
            <ProtectedRoute tokenKey="token">
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/product" element={
            <ProtectedRoute tokenKey="token">
              <Products/>
            </ProtectedRoute>
          } />
          <Route path="/unauthorized" element={<Unauthorized/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
