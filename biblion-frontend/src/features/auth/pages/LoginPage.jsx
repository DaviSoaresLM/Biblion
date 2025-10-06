import React, {useState} from 'react';
import '../styles/LoginStyle.css';
import '../styles/AuthStyle.css';

// COMPONENTS
import logo from "../../../assets/images/logo.png";
import TextInput from "../../shared/components/inputs/TextInput.jsx";
import PasswordInput from "../../shared/components/inputs/PasswordInput.jsx";
import SubmitButton from "../../shared/components/buttons/SubmitButton.jsx";
import AlertMessage from "../../shared/components/alert/AlertMessage.jsx";

// SERVICE
import {authService} from "../services/AuthService.js";

// Hooks
import {useEmailHook} from "../hooks/useEmailHook.js";
import {usePasswordValidator} from "../hooks/usePasswordValidator.js";

const LoginPage = () => {
    const {email, handleEmailChange} = useEmailHook();
    const {password, handlePasswordChange} = usePasswordValidator();

    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({message: "", type: ""});

    const submitData = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const userData = {email, password};

        try {
            const response = await authService.authenticate(userData);

            localStorage.setItem('token', response.token);
            localStorage.setItem('userEmail', response.userEmail);
            localStorage.setItem('userRole', response.userRole);

            setAlert({message: "Login realizado com sucesso", type: "success"});
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
                                <h1 className="form-title">Login</h1>
                                <div className="form-footer">
                                <span className="link">
                                    Não possui uma conta? <a href="/auth/register">Criar uma conta</a>
                                </span>
                                </div>
                                <div className="inputs-container">
                                    <TextInput
                                        type="email"
                                        label="E-mail"
                                        value={email}
                                        placeholder="Digite seu email"
                                        onChange={handleEmailChange}/>

                                    <PasswordInput
                                        label="Senha"
                                        value={password}
                                        onChange={handlePasswordChange}/>
                                </div>

                                <SubmitButton
                                    text={isLoading ? "Enviando..." : "Entrar"}
                                    type="submit"
                                    disabled={isLoading}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default LoginPage;
