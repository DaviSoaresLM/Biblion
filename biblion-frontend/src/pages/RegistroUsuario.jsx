import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/RegistroUsuario.css'; 
import livroIcon from '../assets/fotoLivro.png'; 

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasLowerCase = /[a-z]/.test(formData.senha);
    const hasUpperCase = /[A-Z]/.test(formData.senha);
    const hasNumber = /\d/.test(formData.senha);
    const isValidLength = formData.senha.length >= 8;

    if (!hasLowerCase || !hasUpperCase || !hasNumber || !isValidLength) {
      alert('A senha deve ter no mínimo 8 caracteres, incluindo letra minúscula, maiúscula e número.');
      return;
    }
    console.log('Registro com:', formData);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={livroIcon} alt="Book Icon" className="login-icon" />
        <h2>Criar uma conta</h2>
        <p>Já possui uma conta? <Link to="/login-usuario">Login</Link></p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
              required
            />
          </div>
          <div className="input-group">
            <label>Sobrenome</label>
            <input
              type="text"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
              placeholder="Digite seu sobrenome"
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="input-group">
            <label>Senha</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                placeholder="Digite sua senha"
                required
              />
              <span className="password-toggle" onClick={toggleShowPassword}>
                👁️
              </span>
            </div>
            <div className="password-rules">
              <label>
                <input type="checkbox" checked={/[a-z]/.test(formData.senha)} readOnly />
                A senha deve ter uma letra minúscula
              </label>
              <label>
                <input type="checkbox" checked={/[A-Z]/.test(formData.senha)} readOnly />
                A senha deve ter uma letra maiúscula
              </label>
              <label>
                <input type="checkbox" checked={/\d/.test(formData.senha)} readOnly />
                A senha deve ter um número
              </label>
            </div>
          </div>
          <button type="submit">Criar Conta</button>
        </form>
      </div>
    </div>
  );
};

export default RegistroUsuario;