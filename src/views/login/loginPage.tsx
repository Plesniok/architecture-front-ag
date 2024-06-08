// src/Login.tsx
import React, { useState } from 'react';
import RequestSender from '../../services/requestSender';
import { ServiceResponse } from '../../models/responseData';
import { LoginResponse } from '../../models/loginResponse';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const salt = bcrypt.genSaltSync(10)

  const hashPassword = (passwordToHash: string) => {

    const hash = bcrypt.hashSync(passwordToHash, '$2a$10$CwTycUXWue0Thq9StjUM0u');
    console.log(hash);
    return hash
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const loginResponse: ServiceResponse<LoginResponse> | null = 
      await RequestSender.put<LoginResponse>(
        "login",
        {
          "email": email,
          "password": hashPassword(password)
        } 
      );

      if (loginResponse?.httpStatus !== 200 && loginResponse?.data.token !== undefined){
        alert("Error during login: " + loginResponse?.httpStatus)
      }

      localStorage.setItem("token", loginResponse?.data.token!)
      navigate("/products")
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
