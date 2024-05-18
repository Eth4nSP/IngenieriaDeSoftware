import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from '../../assents/svg/left.svg';
import { ReactComponent as ArrowRight } from '../../assents/svg/right.svg';
import CardsCursos from '../../components/courseCard/cardCursoDocente';

function TusCursos() {
  const [cursos, setCursos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    peticionDocenteCursosCreados();
  }, []);

  const peticionDocenteCursosCreados = () => {
    fetch('http://localhost:80/IngenieriaDeSoftware/estu_prime/src/api/mostrarCurso.php', {
      method: 'GET',
      credentials: 'include'
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error fetching data');
        }
        return res.json();
      })
      .then((data) => {
        setCursos(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

 const renderCursos = () => {
    const startIndex = currentPage * 10;
    const endIndex = startIndex + 10;
    return cursos.slice(startIndex, endIndex).map((curso) => (
      <CardsCursos key={curso.idCurso} title={curso.titulo} id={curso.idCurso} nombre_docente={curso.nombre_docente} precio={curso.precio} img={curso.ruta}/>
    ));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage === 0 ? prevPage : prevPage - 1));
  };

  return (
    <ListaCrearCursoContainer>
      <div className='cursos'>
        {renderCursos()}
      </div>
      <div className='arrows'>
        <button className='arrows__flecha' onClick={goToPreviousPage}>
          <ArrowLeft className='home__icon' />
        </button>
        <button className='arrows__flecha' onClick={goToNextPage}>
          <ArrowRight className='home__icon' />
        </button>
      </div>
    </ListaCrearCursoContainer>
  );
}


export default TusCursos;

const ListaCrearCursoContainer = styled.nav`
  min-width: 700px;
  .cursos{
    display: flex;
    min-height: 75vh;
    flex-wrap: wrap;
  }
  .arrows {
    display: flex;
    position: relative;
    justify-content: center;
    margin-bottom: 1%;
  }
  .arrows__flecha {
    background: none;
    margin: 0.1em;
    border: none;
  }
  .arrows__flecha svg:hover {
    fill: #b4d2da;
    transition: 100ms;
    stroke: black;
  }
  .arrows__flecha svg:active {
    fill: white;
  }
`
