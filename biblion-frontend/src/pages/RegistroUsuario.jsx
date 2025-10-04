import React, { useState } from "react";

export default function RegistroUsuario() {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validarSenha = (senha) => {
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    const temTamanho = senha.length >= 6;

    if (!temMaiuscula)
      return "A senha deve conter pelo menos uma letra maiúscula.";
    if (!temMinuscula)
      return "A senha deve conter pelo menos uma letra minúscula.";
    if (!temTamanho) return "A senha deve ter no mínimo 6 caracteres.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const erroSenha = validarSenha(formData.senha);
    if (erroSenha) {
      setError(erroSenha);
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError("Senhas diferentes.");
      return;
    }

    setError("");
    alert("Usuário cadastrado com sucesso!");
  };

  const temMaiuscula = /[A-Z]/.test(formData.senha);
  const temMinuscula = /[a-z]/.test(formData.senha);
  const temTamanho = formData.senha.length >= 6;

  return (
    <div style={estilos.container}>
      <div style={estilos.logo}>Biblion</div>

      <form style={estilos.formulario} onSubmit={handleSubmit}>
        <h2>Cadastro de Usuário</h2>

        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="sobrenome"
          placeholder="Sobrenome"
          value={formData.sobrenome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmarSenha"
          placeholder="Confirmar Senha"
          value={formData.confirmarSenha}
          onChange={handleChange}
          required
        />

        {/* Agora os requisitos ficam embaixo do campo Confirmar Senha */}
        <div style={estilos.requisitosContainer}>
          <div style={estilos.requisitosTitulo}>Requisitos da senha:</div>
          <ul style={estilos.requisitosLista}>
            <li
              style={temMaiuscula ? estilos.requisitoValido : estilos.requisitoInvalido}
            >
              {temMaiuscula ? "✓" : "✗"} 1 letra maiúscula
            </li>
            <li
              style={temMinuscula ? estilos.requisitoValido : estilos.requisitoInvalido}
            >
              {temMinuscula ? "✓" : "✗"} 1 letra minúscula
            </li>
            <li
              style={temTamanho ? estilos.requisitoValido : estilos.requisitoInvalido}
            >
              {temTamanho ? "✓" : "✗"} pelo menos 6 caracteres
            </li>
          </ul>
        </div>

        {error && <p style={estilos.error}>{error}</p>}

        <button type="submit" style={estilos.botao}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}

const estilos = {
  container: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    position: "relative",
  },
  logo: {
    position: "absolute",
    top: "20px",
    left: "20px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  formulario: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    width: "400px",
    gap: "12px",
  },
  requisitosContainer: {
    backgroundColor: "#fafafa",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #eee",
    fontSize: "14px",
  },
  requisitosTitulo: {
    marginBottom: "6px",
    fontSize: "13px",
    color: "#333",
  },
  requisitosLista: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  requisitoValido: {
    color: "#2e7d32",
    marginBottom: "4px",
    fontSize: "14px",
  },
  requisitoInvalido: {
    color: "#c62828",
    marginBottom: "4px",
    fontSize: "14px",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  botao: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
