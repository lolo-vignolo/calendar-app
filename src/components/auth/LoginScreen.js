
import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './loginScreen.css';

export const LoginScreen = () => {

    
    const dispatch = useDispatch();
    
    const [formLoginValues , handleLoginInputChange] = useForm({
        lEmail: "",
        lPassword : "",
    });

    const {lEmail, lPassword} = formLoginValues;

    const [formRegisterValues , handleRegisterInputChange] = useForm({
        rName: "",
        rEmail: "",
        rPassword : "",
        rRepeatPassword: ""

    });

    const {rName, rEmail, rPassword, rRepeatPassword} = formRegisterValues;

   

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword))

        /*console.log(formLoginValues);
        ESTE LOG DEVUELVE => {lEmail: 'vignolo_3@hotmail.com', lPassword: '123456'}
        Eso mismo es lo que necesita el back para hacer el login.*/
    }


    const handleRegister = (e)=> {
        e.preventDefault();
        if(rPassword !== rRepeatPassword){
            return Swal.fire("Error", "Your Passwords must be the same.", "error")
        }
        dispatch(startRegister(rEmail, rPassword, rName))
        
    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit = {handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name = "lEmail"
                                value = {lEmail}
                                onChange = {handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name = "lPassword"
                                value = {lPassword}
                                onChange = {handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit= {handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name = "rName"
                                value = {rName}
                                onChange = {handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name = "rEmail"
                                value = {rEmail}
                                onChange = {handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name = "rPassword"
                                value = {rPassword}
                                onChange = {handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name = "rRepeatPassword"
                                value = {rRepeatPassword}
                                onChange = {handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}