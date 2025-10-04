import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginUsuario.css'; 
import livroIcon from '../assets/fotoLivro.png';

const LoginUsuario = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    console.log('Login attempted with:', { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={livroIcon} alt="Book Icon" className="login-icon" />
        <h2>Login</h2>
        <p>Não possui uma conta? <Link to="/registro-usuario">Crie uma conta</Link></p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="login-password">Senha</label>
            <div className="password-input">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Digite sua senha"
                required
              />
              <span className="password-toggle" onClick={toggleShowPassword}>
                👁️
              </span>
            </div>
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginUsuario;
