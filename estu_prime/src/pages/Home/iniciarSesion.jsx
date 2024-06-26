import { Fragment } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';

const schema = yup.object().shape({
  email1: yup.string().email('Debe ser un Email valido').required('Se requiere Email'),
  password1: yup.string().required('Se requiere Password'),
});

function IniciarSesion() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)});
       
  const onSubmit = async (data) => {
    if (!errors.email1 && !errors.password1) {
      const response = await fetch('http://localhost:80/IngenieriaDeSoftware/estu_prime/src/api/inicioSesion.php', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: data.email1,
          contrasena: data.password1,
        }),
      });
      
      const dataResponse = await response.json();

      if (dataResponse.tipo === 'docente') {
        Swal.fire({
          icon: 'success',
          text: dataResponse.mensaje,
          background:'#F2E9E4',
          confirmButtonColor:'#15292E',
        }).then(respuesta => {
          if (respuesta.isConfirmed) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', 'docente');
            navigate('/LoginDocente', { replace: true });
            window.location.reload();
          }
        });
      } else if (dataResponse.tipo === 'estudiante') {
        Swal.fire({
          icon: 'success',
          text: dataResponse.mensaje,
          background:'#F2E9E4',
          confirmButtonColor:'#15292E',
        }).then(respuesta => {
          if (respuesta.isConfirmed) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', 'estudiante');
            navigate('/LoginEstudiante', { replace: true });
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: dataResponse.mensaje || 'Error al iniciar sesión',
          background:'#F2E9E4',
          confirmButtonColor:'#15292E',
        }).then(respuesta => {
          if (respuesta.isConfirmed) {
            window.location.reload();
          }
        });
      }      
      
      console.log(data);
    }
  };
    
  return (
    <LoginContainer>
        <form action="" id='form_login_c' onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            <label>Email: </label>
            <input type="email" 
            placeholder='ejemplo@gmail.com' 
            className='input_l'
            {...register('email1')}
            />
            <p className='spanA'>{errors.email1?.message}</p>
            <label>Password:  </label>
            <input type="password"   
            className='input_l' 
            {...register('password1')}
            />
            <p className='spanA'>{errors.password1?.message}</p>
            <Link to='www.google.com'>Olvidaste tu Contraseña?</Link>
            <br />
            <button type='submit' id='button100'>Iniciar Sesion</button>
        </form>
    </LoginContainer>
  );
}

export default IniciarSesion;

const LoginContainer = styled.nav`
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8vh;
    margin-bottom: 25vh;
    h1 {
      color: #15292E;
      font-weight: bolder;
      font-size: calc(1vw + .9em);
    }
    label {
      color: #15292E;
      font-weight: 500;
    }
    a {
      text-decoration: none;
      color: #636363;
    }
    a:hover {
      color: #AAC7CE;
    }
    .spanA {
      color: red;
      margin: 0px;
      padding: 0px;
      font-size: calc(0.01vw + 0.8em);
    }
    .input_l {
        background-color: #AAC7CE;
        border: none;
        border-radius: 5px;
        width: 100%;
        height: 30px;
    } 
    #login_title {
        display: inline;
        height: auto;
        width: 100%;
        margin-bottom: 20px;
        padding-bottom: 20px;
    }
    h1.titleMain {
      display: inline;
      color: #F57D0D;
      padding-left: 25px;
      padding-bottom: 0px;
      font-size: calc(1.2vw + 1em);
    }
    h1.title_especial {
      display: inline;
      color: #15292E;
      padding-bottom: 0px;
      font-size: calc(1.2vw + 1em);
    }
    #form_login_c {
        display: block;
        border: #15292E 1px solid;
        padding: 5%;
        border-radius: 1vh;
        padding-top: 10vh;
        padding-bottom: 15vh;
    }
    #button100 {
      background-color: #15292E;
      color: white;
      margin-top: 2vh;
      border:none;
      width: 100%;
      height: 5vh;
      border-radius: 0.7vh;
    }
    #button100:hover {
      background-color: #F2E9E4;
      color: #15292E;
      border: #15292E 1px solid;
    }
`;
