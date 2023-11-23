import styles from '../searchbar/stylessearchbar.module.css';
import { useState } from 'react';

const SearchBar = ({ onSearch, buscados }) => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    const newName = event.target.value;

    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/;
    if (regex.test(newName) || newName === "") {
      setName(newName);
      onSearch(newName, buscados ? "all" : "df");
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
        />
      </form>
    </div>
  );
}

export default SearchBar;

