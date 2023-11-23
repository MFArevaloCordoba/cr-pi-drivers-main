import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../landingpage/styleslandingpage.module.css'

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/home');
    }, 2000); 
  };

  return (
    <div className={styles.home}>
      <div>
        {isLoading ? (
          <div id="loader-wrapper">
            <div className={styles.loader}>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.subline}></div>
              <div className={styles.subline}></div>
              <div className={styles.subline}></div>
              <div className={styles.subline}></div>
              <div className={styles.subline}></div>
              <div className={styles.loadercircle1}><div className={styles.loadercircle2}></div></div>
              <div className={styles.needle}></div>
              <div className={styles.loading}>Loading</div>
            </div>
          </div>
        ) : (
          <Link to="#" onClick={handleClick}>
            Ingresar al sitio
          </Link>
        )}
      </div>
    </div>
  );
};

export default LandingPage;