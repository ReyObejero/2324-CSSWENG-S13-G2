import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { USERS_URL } from '../../API/constants.js';
import axiosInstance from '../../API/axiosInstance.js'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosInstance.post(`${USERS_URL}/authenticate`, JSON.stringify({ email, password }), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                const authentication = response.data.token;
                localStorage.setItem('jwt', authentication);
                setTimeout(() => {
                    redirectTo('/')
                }, 3000);
                setSuccessMessage(response.data.message)
                
            }

            
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setLoginError(error.response.data.message);
                setTimeout(() => {
                    setLoginError('');
                }, 3000);
                
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <section className="login-section">
                    <h2>LOG IN</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="login-input-group">
                            <label htmlFor="email">EMAIL ADDRESS *</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className="login-input-group">
                            <label htmlFor="password">PASSWORD *</label>
                            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="login-button">LOG IN</button>
                        <a href="/forgot-password" className="forgot-password">Forgot password?</a>
                        {loginError && <p className="p-error-bubble">{loginError}</p>}
                        {successMessage && <p className="p-success-message">{successMessage}</p>}
                    </form>
                </section>
                <section className="new-customer-section">
                    <h2>NEW CUSTOMER</h2>
                    <p>Create an account with us and you'll be able to:</p>
                    <ul className="benefits-list">
                        <li>Check out faster</li>
                        <li>Save multiple shipping addresses</li>
                        <li>Access your order history</li>
                        <li>Track new orders</li>
                    </ul>
                    <button onClick={() => redirectTo('/register')} className="create-account-button">CREATE ACCOUNT</button>
                </section>
            </div>
        </div>
    );
};

const redirectTo = (route) => {
    window.location.href = route;
};


export default Login;
