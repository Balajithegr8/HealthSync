import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginRegister.css';
import 'boxicons/css/boxicons.min.css'; // Importing boxicons

function LoginRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [toastMessage, setToastMessage] = useState(''); // Message for toast
  const [toastType, setToastType] = useState(''); // Type of toast

  async function registerUser(e) {
    e.preventDefault();    
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log(data);

  }

  async function LoginUser(e) {
    e.preventDefault();    
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (data.message === 'Login Successful') {
      toast.success('🎉 Login Successful! Redirecting to dashboard...', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'custom-toast',      // Apply custom class for transparency
        bodyClassName: 'custom-toast-body' // Apply custom body styles
      });
      
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 3000);  // Wait for the toast to finish before redirecting
    } else if (data.message === 'User does not exist') {
      toast.error('❌ Login Failed. User does not exist.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'custom-toast',      // Apply custom class for transparency
        bodyClassName: 'custom-toast-body' // Apply custom body styles
      });
    }
    else if (data.message === 'Login Failed') {
      toast.error('❌ Login Failed. Incorrect password.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'custom-toast',      // Apply custom class for transparency
        bodyClassName: 'custom-toast-body' // Apply custom body styles
      });
    }
  }
  

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleRegister = () => {
    setIsLogin(false);
  };

  const [isResponsive, setIsResponsive] = useState(false);

  const toggleMenu = () => {
    setIsResponsive(!isResponsive);
  };

  return (
    <div className="wrapper">
      <nav className="nav">
        <div className="nav-logo">
          <p>LOGO .</p>
        </div>
        <div className={`nav-menu ${isResponsive ? 'responsive' : ''}`} id="navMenu">
          <ul>
            <li><a href="#" className="link active">Home</a></li>
            <li><a href="#" className="link">Blog</a></li>
            <li><a href="#" className="link">Services</a></li>
            <li><a href="#" className="link">About</a></li>
          </ul>
        </div>
        <div className="nav-button">
          <button className={`btn ${isLogin ? 'white-btn' : ''}`} id="loginBtn" onClick={handleLogin}>Sign In</button>
          <button className={`btn ${!isLogin ? 'white-btn' : ''}`} id="registerBtn" onClick={handleRegister}>Sign Up</button>
        </div>
        <div className="nav-menu-btn">
          <i className="bx bx-menu" onClick={toggleMenu}></i>
        </div>
      </nav>
      
      <div className="form-box" >

          {isLogin ?(
            <div className={`login-container ${!isLogin ? 'active' : ''}`}>
            <div className="top">
              <span>Don't have an account? <a href="#" onClick={handleRegister}>Sign Up</a></span>
              <header>Login</header>
            </div>
            <div className="input-box">
              <input value= {email} 
              onChange={(e) => setEmail(e.target.value)}
              type="text" className="input-field" placeholder="Email" />
              <i className="bx bx-user"></i>
            </div>
            <div className="input-box">
              <input value= {password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" className="input-field" placeholder="Password" />
              <i className="bx bx-lock-alt"></i>
            </div>
            <div className="input-box">
              <input type="submit" className="submit" value="Sign In" onClick={LoginUser}/>
            </div>
            <div className="two-col">
              <div className="one">
                <input type="checkbox" id="login-check" />
                <label htmlFor="login-check"> Remember Me</label>
              </div>
              <div className="two">
                <label><a href="#">Forgot password?</a></label>
              </div>
            </div>
          </div>) : (
            <div className={`register-container ${!isLogin ? 'active' : ''}`} >
            <div className="top">
            <span>Have an account? <a href="#" onClick={handleLogin}>Login</a></span>
              <header>Sign Up</header>
            </div>
            <div className="two-forms">
              <div className="input-box">
                <input value ={fname}
                onChange = {(e) => setFname(e.target.value)}
                type="text" className="input-field" placeholder="Firstname" />
                <i className="bx bx-user"></i>
              </div>
              <div className="input-box">
                <input value={lname}
                onChange={(e) => setLname(e.target.value)} 
                type="text" className="input-field" placeholder="Lastname" />
                <i className="bx bx-user"></i>
              </div>
            </div>
            <div className="input-box">
              <input value={email} 
              onChange={(e) => setEmail(e.target.value)}
              type="text" className="input-field" placeholder="Email" />
              <i className="bx bx-envelope"></i>
            </div>
            <div className="input-box">
              <input value ={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" className="input-field" placeholder="Password" />
              <i className="bx bx-lock-alt"></i>
            </div>
            <div className="input-box">
              <input type="submit" className="submit" value="Register" onClick={registerUser} />
            </div>
            <div className="two-col">
              <div className="one">
                <input type="checkbox" id="register-check" />
                <label htmlFor="register-check"> Remember Me</label>
              </div>
              <div className="two">
                <label><a href="#">Terms & conditions</a></label>
              </div>
            </div>
          </div>
          )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginRegister;
