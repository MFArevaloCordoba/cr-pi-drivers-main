import styles from '../nav/stylesnav.module.css';
import React, { useState, useEffect } from "react";
import SearchBar from "../homepage/searchbar/search-bar";
import { NavLink } from 'react-router-dom';

const Nav = ({ handleOrder, selectedOrder, seleccionTeams, seleccionOrigen, teams, handleFTeam, handlerReset, hendlerFOrigen, onSearch }) => {
  const [resetSelectOrder, setResetSelectOrder] = useState(false);
  const [encontrados, setEncontrados] = useState(localStorage.getItem("Buscados") === "true");  

  useEffect(() => {
    setResetSelectOrder(false);
  }, [handlerReset]);

 
  const resetHandler = () => {
    if (!resetSelectOrder) {
      setEncontrados(false);
      localStorage.setItem("Buscados", false);
      setResetSelectOrder(true);
      handlerReset(); // Aquí estás usando handlerReset directamente
    }
  };

 

  const handleEncontrados = () => {
    const updated = !encontrados;
    setEncontrados(updated);
    localStorage.setItem("Buscados", updated); 
  };

  return (
    <div className={styles.container} >

<div className={styles.logoContainer}>
        {/* Aquí puedes agregar un div con una imagen */}
        <div className={styles.logo}>
          <img src="https://logodownload.org/wp-content/uploads/2016/11/formula-1-logo-7.png" alt="Logo" style={{ width: '40%' }}/>
        </div>
      </div>
  
      <label className={styles.labelraya}> | </label>
      
      <div className={styles.searchContainer}>
        <SearchBar onSearch={onSearch} encontrados={encontrados} handleEncontrados={handleEncontrados} /> 
      </div>

   
      <button className={styles.buttonLink} onClick={resetHandler}>
       <span>Reset</span> 
      </button>

      
      <select onChange={handleOrder} value={selectedOrder} className={styles.select}>
        <option value="">Alfabetico</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
        <option value="nacA">Dob(Asc)</option>
        <option value="nacD">Dob(Desc)</option>
      </select>

     

     
      <select onChange={handleFTeam} value={seleccionTeams} className={styles.selectTeam} title='Filtros por equipo.'>
        <option value="">Escuderias</option>
        {teams &&
          teams.map((team) => {
            return (
              <option key={team} value={team}>
                {team}
              </option>
            );
          })}
      </select>

 <NavLink to="/create" className={styles.buttonNew}>
       Crear conductor
      </NavLink>

    </div>
  );
};

export default Nav;