import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';


function App() {

  // States de la app
  const [ busqueda, guardarBusqueda ] = useState({
    ciudad: '',
    pais: ''
  });

  const [ consultar, guardarConsultar ] = useState(false)
  const [ resultado, guardarResultado ] = useState({});

  const { ciudad, pais } = busqueda;

  useEffect( () => {

    const consultarAPI = async  () => {
      
      if (consultar) {
        const apiId = '4b5b1fe3a417310326d93c6830cfbb86';
        const url = `api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsultar(false);

        // console.log(resultado);
      }

    }

    consultarAPI();
  }, [consultar] );


  return (
    <Fragment>
      <Header 
        titulo="Clima React App"
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              <Clima 
                resultado={resultado}
              />  
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
