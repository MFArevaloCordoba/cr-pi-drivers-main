import styles from '../searchbar/stylessearchbar.module.css';
import { useState } from 'react';

const SearchBar = ({ onSearch, buscados, handleCheckboxChange }) => {
  const [name, setName] = useState("");

 
  const handleSearch = (event) => {

    event.preventDefault();
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/;
    if (regex.test(name)) {
      onSearch(name, buscados ? "all" : "df");
      setName("");
    } else {
      alert("Busque un nombre valido.");
    }
  };


  const handleChange = (event) => {
    setName(event.target.value);
  };

  
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {

      handleSearch(event);
    }
  };

  return (
    <div className={styles['search-container']}>
      <form className={styles['search-box']}>
        
        
        <input
          placeholder="Search"
          type='search'
          value={name}
          className={styles['input']}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

      
        <button
          className={styles['buttonLink']}
          onClick={handleSearch}
        >
          <span style={{marginLeft:"-10px"}} role="img" aria-label="Buscar">🔍</span>
        </button>

      

        <label className={styles.labelraya2}> | </label>
      </form>
    </div>
  );
}

export default SearchBar;