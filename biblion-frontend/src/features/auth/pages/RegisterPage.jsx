import React, {useState} from 'react';
import logo from "../../../assets/images/logo.png";
import '../styles/AuthStyle.css';
import {useNavigate} from "react-router-dom";

// COMPONENTS
import TextInput from "../../shared/components/inputs/TextInput.jsx";
import PasswordInput from "../../shared/components/inputs/PasswordInput.jsx";
import SubmitButton from "../../shared/components/buttons/SubmitButton.jsx";

// HOOKS
import {usePasswordValidator} from "../hooks/usePasswordValidator.js";
import {useEmailHook} from "../hooks/useEmailHook.js";

// SERVICE
import {authService} from "../services/AuthService.js";
import AlertMessage from "../../shared/components/alert/AlertMessage.jsx";

const registerPage = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);

    const {password, handlePasswordChange, validation} = usePasswordValidator();
    const {email, handleEmailChange} = useEmailHook();

    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({message: "", type: ""});

    const submitData = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const role = "COMMON";
        const userData = {firstName, lastName, email, password, role};

        try {
            const response = await authService.register(userData);

            setAlert({message: response, type: "success"});

            await new Promise(resolve => setTimeout(resolve, 3000));

            navigate("/auth/login");
        } catch (error) {
            setAlert({message: error.message, type: "error"});
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {alert.message && (
                <AlertMessage
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert({message: "", type: ""})}
                />
            )}

            <div className="layout">
                <div className="main-container">
                    <div className="content-container">
                        <div className="auth-container">
                            <form className="auth-form-container" onSubmit={submitData}>
                                <img src={logo} className="logo" alt="logo"/>
                                <h1 className="form-title">Criar conta</h1>
                                <div className="form-footer">
                                <span className="link">
                                    Já possui uma conta? <a href="/auth/login">Login</a>
                                </span>
                                </div>
                                <div className="inputs-container">
                                    <div className="user-fullname-inputs">
                                        <TextInput
                                            type="text"
                                            label="Nome"
                                            value={firstName}
                                            placeholder="Digite seu nome"
                                            onChange={handleFirstNameChange}
                                            isRequired={true}
                                        />
                                        <TextInput
                                            type="text"
                                            label="Sobrenome"
                                            value={lastName}
                                            placeholder="Digite seu sobrenome"
                                            onChange={handleLastNameChange}
                                            isRequired={true}
                                        />
                                    </div>
                                    <TextInput
                                        type="email"
                                        label="E-mail"
                                        value={email}
                                        placeholder="Digite seu e-mail"
                                        onChange={handleEmailChange}
                                        isRequired={true}
                                    />

                                    <PasswordInput
                                        label="Senha"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        isRequired={true}
                                    />
                                </div>
                                <div className="password-roles">
                                    <label>
                                        <input type="checkbox" checked={validation.hasLowerCase} readOnly/>A senha
                                        contém
                                        uma letra minúscula
                                    </label>
                                    <label>
                                        <input type="checkbox" checked={validation.hasUpperCase} readOnly/>A senha
                                        contém
                                        uma letra maiúscula
                                    </label>
                                    <label>
                                        <input type="checkbox" checked={validation.hasNumber} readOnly/>A senha contém
                                        um número
                                    </label>
                                    <label>
                                        <input type="checkbox" checked={validation.isValidLength} readOnly/>A senha
                                        contém 8
                                        caracteres
                                    </label>
                                </div>
                                <SubmitButton
                                    text={isLoading ? "Enviando..." : "Criar conta"}
                                    type="submit"
                                    disabled={isLoading}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default registerPage;