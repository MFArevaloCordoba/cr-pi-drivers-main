import { all } from "axios";
import Cards from "../cards/cards";
import styles from "../card/stylescard.module.css";

const Card = ({ drivers }) => {
    const obtenConductores = drivers;
  
    return (
      <div className={styles.card}>
        {obtenConductores?.map((driver, index) => (<Cards key={index} driver={driver} />))}
      </div>
    );
  };
  
  export default Card;