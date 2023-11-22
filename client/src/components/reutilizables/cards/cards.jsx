import styles from "../cards/stylescards.module.css";
import { NavLink } from "react-router-dom";

const defaultImage = "https://1000marcas.net/wp-content/uploads/2020/01/logo-F1.png";

const Cards = ({ driver }) => {
  const { id, forename, surname, image, teams, dob } = driver;

  const driverTeams = (teams) => {
    if (typeof teams === 'string') {
      return teams;
    } else if (Array.isArray(driver.Teams)) {
      return driver.Teams.map(team => team.name).join(', ');
    } else {
      return '';
    }
  };

  return (
    <div className={styles.card_container} title={`Mas info de: ${driver.forename} ${driver.surname}`}>
      <NavLink
        to={`/home/${id}`}
        style={{ textDecoration: "none"}}
      >
        <h3 className={styles.nombre}>{`${forename} ${surname}`}</h3>
        <img src={driver.image? driver.image : defaultImage} alt="Driver" className={styles.image} />

        <div>
          <h4 className={styles.teams}>{driverTeams(teams)}</h4>
          <h4 className={styles.fecha}>{dob}</h4>
        </div>
      </NavLink>
    </div>
  );
};

export default Cards;