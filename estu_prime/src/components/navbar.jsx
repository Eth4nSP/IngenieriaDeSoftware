import React from 'react';

import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home/home.jsx';
import CrearEstu from '../pages/Home/crearCuentaEstudiante.jsx';
import CrearDoc from '../pages/Home/crearCuentaDocente.jsx';
import IniciarS from '../pages/Home/iniciarSesion.jsx' ;
import CrearCurso from '../pages/LoginDoc/crearCurso.jsx';
import TusCursos from '../pages/LoginDoc/tusCursos.jsx';
import HomeDocente from '../pages/LoginDoc/inicioDoc.jsx'
import ListadoCursos from '../pages/LoginEst/ListCursos.jsx'
import ListadoCursosComprados from '../pages/LoginEst/ListCursosComprados.jsx'
import Explorar from '../pages/LoginEst/Explorar.jsx'
import HomeEstudiante from '../pages/LoginEst/inicioEst.jsx'
import DetalleCurso from '../pages/LoginEst/DetalleCurso.jsx'
import ComprarCurso from '../pages/LoginEst/compraCurso.jsx'
import EditCurso from '../pages/LoginDoc/editCurso.jsx'
import ExplorarD from '../pages/LoginDoc/explorar.jsx'
import DetalleCursoDoc from '../pages/LoginDoc/DetalleCursoDoc.jsx'

function Navbar() {
  return ( 
      <Routes>
        <Route path="/IniciarSe" element={<IniciarS/>}/>  
        <Route path="/CrearCuentaDoc" element={<CrearDoc/>}/>
        <Route path="/CrearCuentaEstu" element={<CrearEstu/>}/>
        <Route path="/LoginDocente/CrearCurso" element={<CrearCurso/>}/>  
        <Route path="/LoginDocente" element={<HomeDocente/>}/>  
        <Route path='/LoginDocente/TusCursos'element={<TusCursos/>}/>
        <Route path="/LoginEstudiante" element={<HomeEstudiante/>}/>  
        <Route path="/LoginEstudiante/ListCursos" element={<ListadoCursos/>}/> 
        <Route path="/LoginEstudiante/ListCursosComprados" element={<ListadoCursosComprados/>}/> 
         <Route path="/LoginEstudiante/ComprarCurso" element={<ComprarCurso/>}/>
         <Route path="/home" element={<Home/>}/>
        <Route path="/LoginDocente/TusCursos/editCurso/:id" element={<EditCurso/>}/>  
        <Route path="/detalleCurso/:idCurso" element={<EditCurso/>}/>  
        <Route path="/LoginDocente/Explorar/DetalleCurso/:idCurso" element={<DetalleCursoDoc />} />

        <Route path="/LoginEstudiante/Explorar" element={<Explorar/>}/>
        <Route path="/LoginDocente/Explorar" element={<ExplorarD/>}/>
        <Route path="/LoginEstudiante/ListCursos/DetalleCurso" element={<DetalleCurso/>}/>
        <Route path="/LoginEstudiante/ListCursos/DetalleCurso/:idCurso" element={<DetalleCurso />} />
      </Routes>
  );
}

export default Navbar;
