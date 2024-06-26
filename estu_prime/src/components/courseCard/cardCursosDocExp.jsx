import React from 'react';
import styled from 'styled-components';
import ImgEdit from '../../assents/img/edit.png'
import mano from '../../assents/img/hand.png'
import {useNavigate, Link} from "react-router-dom";

function CardsCursoDocenteExp({ title, id, nombre_docente, precio,img }) {
    const navigate = useNavigate();
  
    return (
      <ContainerCard>
        <div className='card'>
          <img src={img} alt='imgCurso' className='card__img'></img>
          <p className='card__title'><strong>{title}</strong></p>
          <div className='cardFondo'>
            <Link to={`/LoginDocente/Explorar/DetalleCurso/${id}`} className='cardFondo__edit'>
              <img src={mano} alt='' className='cardFondo__img' />
            </Link>
          </div>
          <p className='card__details'>Docente: {nombre_docente}</p>
          <p className='card__details'>Precio: {precio}</p>
        </div>
       
      </ContainerCard>
    );
  }

export default CardsCursoDocenteExp;


const ContainerCard = styled.div`
  display: flex;
  margin-top: 1%;
  margin-left: 3%;
  margin-bottom:1%;
    .card{
      position: relative;
      padding: 1vh;
      text-align: center;
      width: 15vw;
      height: 15vw;
      background-color: #F2E9E4;
      border-radius: 1vw;
      box-shadow: 5px 5px 1px;
      border: #15292E 1px solid;
      overflow: hidden;
    }
    .card__img{
      height: 40%;
      border-radius: 1vw;
    }
    .cardFondo{
        border-radius: 1vw;
        display: flex;
        position: absolute;    
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
    }
    .cardFondo__edit{
      border: none;
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      left: 36%;
      top: 40%;
      height: 28%;
      width: 28%;
      opacity: 0;
      border-radius: 1vw;
    }
    .cardFondo__img{
        height: 95%;
      opacity: 0;
      display: flex;
    }
    .cardFondo:hover{
        transition: 500ms;
        background-color: rgba(21,41,46,0.5);
        .cardFondo__edit{
            transition: 1000ms;
            background-color: #15292E;
            opacity: 1;
        }
        .cardFondo__img{
            transition: 2000ms;
            opacity: 1;
        }
        .cardFondo__edit:hover{
            left: 34%;
            top: 38%;
            padding: 2%;
            transition: 200ms;
            background-color: #D6CDC8;
        }
        .cardFondo__edit:active{
            background-color: #15292E;
        }
    }
    .card__title {
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1.2em;
      margin: 10px;
      display: block;
      max-height: 2.8em;
    }
    .card__details {
      font-size: 0.9em;
      margin: 5px;
      max-height: 1.4em;
      overflow: hidden;
    }
`;