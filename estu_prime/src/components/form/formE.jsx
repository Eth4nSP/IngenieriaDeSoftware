import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import styled from 'styled-components';
import Google from '../../assents/google.jpg'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
/*
At least one upper case English letter, (?=.*?[A-Z])
At least one lower case English letter, (?=.*?[a-z])
At least one digit, (?=.*?[0-9])
At least one special character, (?=.*?[#?!@$%^&*-])
Minimum eight in length .{8,} (with the anchors)
*/
const rulerUpperCase = /(?=.*?[A-Z])/;
const rulerLowerCase = /(?=.*[a-z])/;
const rulerDigit= /(?=.*[0-9])/;
const schema = yup
  .object({
    firstName: yup.string('Nombres: Solo esta permitido letras')
                .required('Nombres: Se requiere Nombres'),
    lastName: yup.string('Apellidos: Solo esta permitido letras')
            .required('Apellidos: Se requiere Apellidos'),
    email: yup.string().email('Email: Ingrese un Email valido')
            .required('Email: Se requiere Email'),
    password: yup.string('Password: Solo esta permitido letras')
            .required('Password: Se requiere Contraseña') 
            .matches(rulerUpperCase,'Password: Una letra mayuscula minimo')
            .matches(rulerLowerCase,'Password: Una letra minuscula minimo')
            .matches(rulerDigit,'Password: Un digito minimo')
            .min(8, 'Password: Contraseña muy corta, minimo 8 caracteres'),
    conditions: yup.boolean()
                .oneOf([true],'Debes aceptar las condiciones')
  })
  .required()



function FormE() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm( {
        resolver: yupResolver(schema),
      } )
      const onSubmit = async (data) => {
        const queryString = `?firstName=${encodeURIComponent(data.firstName)}&lastName=${encodeURIComponent(data.lastName)}&email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(data.password)}`;
        if (!errors.firstName && !errors.lastName && !errors.email && !errors.password && !errors.conditions) {
            const response = await fetch(`http://localhost:80/estu_prime/src/api/registro.php${queryString}`, {
                method: 'GET',
                 // No se necesita especificar 'body' para una solicitud GET
                headers: {
                'Content-Type': 'application/json',
                },
             });
            const dataResponse = await response.json();
            if(dataResponse.mensaje === 'Cuenta Estudiante creada'){
                Swal.fire({
                    buttons: ["ok", "ok uwu"],
                    background:'#F2E9E4' ,
                    confirmButtonColor:'#035058',
                    icon: 'success',
                    text: 'Se creó la cuenta Estudiante correctamente',
                }).then(respuesta => {
                if (respuesta) {
                    window.location.reload();
                } else {
                    window.location.reload();
                }
                });
            }if(dataResponse.mensaje === 'Error al crear la cuenta'){
                Swal.fire({
                    buttons: ["ok", "ok uwu"],
                    background:'#F2E9E4' ,
                    confirmButtonColor:'#035058',
                    icon: 'error',
                    text: 'Error al crear la cuenta',
                })
            }
        }  
        console.log(data)
        
    }
      
  return (
    <FormContainer >
        <form  id='formD'  onSubmit={handleSubmit(onSubmit)}>
            
            <div id ="divLinks">
                <Link className='buttonE' to='/CrearCuentaDoc'>Registro Docente</Link>
                <Link className='buttonEs' to='/CrearCuentaEstu'>Registro Estudiante</Link>
            </div>
            <h1>Registrate como Estudiante</h1>
                <input 
                    type="text" 
                    placeholder='Nombres' 
                    className='caja2' 
                    {...register("firstName")}
                    maxLength={15}
                />
                <span className='spanA'>{errors.firstName?.message}</span>
                <input 
                    type="text" 
                    placeholder='Apellidos' 
                    className='caja2'
                    {...register("lastName")} 
                    maxLength={20}
                />
                <span className='spanA'>{errors.lastName?.message}</span>
                <input 
                    type="email" 
                    placeholder='Email'
                    className='caja2' 
                    {...register("email")}
                />
                <span className='spanA'>{errors.email?.message}</span>
                
                <input 
                    type="password" 
                    placeholder='Contraseña'
                    className='caja2'
                    {...register("password")}

                />
                <span className='spanA'>{errors.password?.message}</span>
                <div className='divBox'>
                    <input 
                        id='checkterms' 
                        type="checkbox"
                        {...register("conditions")} 
                    /> 
                    <span id='pE'>Creando una cuenta significa que estas deacuerdo con nuestros Terminos de servicio, Politicas de Privacidad y nuestra Configuracion Predeterminada de Notificaciones</span>
                </div>
                <span className='spanA'>{errors.conditions?.message}</span>
            
                <button className='buttonG' type='submit' >Crear Cuenta</button>
        </form>
    </FormContainer>
  )
}

export default FormE


const FormContainer = styled.nav`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
  /*   height: calc(80vh); */
    width: calc(98vw);
    min-height: calc(40vw);
    font-size: calc(1em+1vw);
    .spanA{
        color: red;
        display: absolute;
        font-size:calc(0.8vw + .1em);
    }
    .divBox{
        display: flex;
        width: 100%;
        margin-top: 2vh;
        margin-bottom: 2vh;
    }
    #formD{
        position: relative;
        width: 30%;
        padding: 5vh;
        border: 2px solid #15292E;
        border-radius: 1vw;
    }
    #pE{
        
        font-size: calc(0.6vw + .1em);
    }
    #radius{
        width: 10px;
    }
    .caja1{
        width: 91%;
        background-color: #B4D2DA;
        border: none;
        padding: 3%    ;
        border-radius: 0.4em;
        margin-bottom: 1%;
    }
    .caja2{
        width: 94%;
        background-color: #B4D2DA;
        border: none;
        padding: 3%    ;
        border-radius: 0.4em;
        margin-bottom: 1%;
    }
    #divLinks{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    a{
        text-align: center;
        font-size: 1rem;
       text-decoration : none;
       color: #B4D2DA;
    }
    form{
        display: block;
        align-items: center;
        justify-content: center;
        align-content: center;
       /*  height: calc(80vh); */
        width: calc(33vw);
    }
    .buttonEs{
        width: 41%  ;
        color:#035058;
        padding: 2.5%;
        border: none;
       /*  background-color: #035058; */
        border-radius: 5px;
        border: #035058 solid 1px;
        border-width: 2px;
        font-size: calc(1vw + .1em);
        font-weight: bold;
    }
    .buttonE{
        width: 41%  ;
        color: white;
        margin-right: 5%;
        padding: 2.5%;
        border: none;
        background-color: #035058;
        border-radius: 5px;
        border: #035058 solid 1px;
        font-size: calc(1vw + .1em);
    }
    .buttonE:hover{
        background-color: #F2E9E4;
        color: #15292E;
        border: #035058 solid 1px;
    }
    .buttonE:active{
        background-color: #035058;
        color: white;
        border: #035058 solid 1px;
    }
    /* .contenedor{
        width: 100%;
        display: grid;
        justify-content: center;
        align-items: center;
    } */
    .buttonG{
        width: 100%;
        border: none;
        background-color: #15292E;
        color: white;
        display: flex;
        align-content: center;
        justify-content: center;
        border-radius: 5px;
        padding-top: 3.5%;
        padding-bottom: 3.5%;
        border: #035058 solid 1px;
        font-size: calc(1vw + .1em);
    }
    .buttonG:hover{     
        background-color: #F2E9E4;
        color: #15292E;
        border: #035058 solid 1px;
    }
    .buttonG:active{
        background-color: #035058;
        color: white;
        border: #035058 solid 1px;
    }
`