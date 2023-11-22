import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from '../formulario/stylesform.module.css';
import { validate } from '../../redux/validaciones';
import axios from "axios";
const defaultImage = "https://1000marcas.net/wp-content/uploads/2020/01/logo-F1.png"

const Create = () => {
  const teams = useSelector((state) => state.teams); 
  const drivers = useSelector((state) => state.allDrivers); 
  
  const [selectedTeam, setSelectedTeam] = useState([]); 
  const [customTeam, setCustomTeam] = useState(""); 
  
  const teamInputRef = useRef(null);
  
  const navigate = useNavigate(); 
  
 
  const [newDriver, setNewDriver] = useState({
    forename: "",
    surname: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    teams: ""
  })


  const [errors, setErrors] = useState({
    forename: "Nombre es obligatorio.",
    surname: "Apellido es obligatorio.",
    description: "Una descripcion es obligatoria",
    image: "Proveer una imagen valida.",
    nationality: "Nacionalidad es obligatoria",
    teams: "Escuderia es obligatoria.",
    dob: "Fecha de nacimiento es obligatoria",
    message: "",
    ok: false
  })

  
  const handlerAddTeam = (event) => {
    event.preventDefault();
    const team = teamInputRef.current.value || customTeam;
     if (team && !newDriver.teams.includes(team)) {
      setSelectedTeam([...selectedTeam, team]);
      setCustomTeam("");
      teamInputRef.current.value = "";
    }

  };

 
  const handleTeamChange = (event) => {
    const selectedDriver = event.target.value;
    const isDuplicate = newDriver.teams.includes(selectedDriver);
    
    if (!isDuplicate) {
      setNewDriver((prevState) => ({
        ...prevState,
        teams: [...prevState.teams, selectedDriver]
      }));

      setSelectedTeam((prevState) => [...prevState, selectedDriver]);
    }
  };

 
  useEffect(() => {
    if (selectedTeam) {
      setNewDriver((prevState) => ({
        ...prevState,
        [teams]: selectedTeam
      }))
      validate(newDriver)
    }
  },[selectedTeam])

  const handleCustomTeamChange = (event) => {
    setCustomTeam(event.target.value);
  };


  const handleUndo = (event) => {
    event.preventDefault();
    
    if (selectedTeam.length > 0) {
      const updatedTeam = selectedTeam.slice(0, -1);
      setSelectedTeam(updatedTeam);
    }
  };

 
  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setNewDriver((prevState) => ({
      ...prevState,
      [name]: value
    }))
   
    const updatedErrors = validate({
      ...newDriver,
      [name]: value
    });
    setErrors(updatedErrors);
  }
 
 
  const imageUrlChange = () => {
    const url = document.getElementById("imageUrlInput").value
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    
    if (url && regex.test(url)) {
      setNewDriver({ ...newDriver, image: url });
      setErrors(prevErrors => ({
        ...prevErrors,
        image: ""
      }));
    } else {
      setNewDriver({ ...newDriver, image: "" });
      setErrors(prevErrors => ({
        ...prevErrors,
        image: "URL invalida "
      }));
    }
  }

 
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/home"); 
    return;
  };
  

  const handleSubmit = (e) => {
    
    const errors = validate(newDriver); 

    if (drivers.some(driver => driver.forename.toLowerCase() === newDriver.forename.toLowerCase() && driver.surname.toLowerCase() === newDriver.surname.toLowerCase())){
      setErrors((prevErrors) => ({
        ...prevErrors,
        message: "¡Error: El conductor ya existe!",
      }));
      return; 
    }
   
    if (errors.ok) {
      
      const formattedDriver = {
        forename: newDriver.forename,
        surname: newDriver.surname,
        description: newDriver.description,
        image: newDriver.image,
        nationality: newDriver.nationality,
        dob: newDriver.dob,
        teams: selectedTeam.join(", ")
      };
      
      axios.post('http://localhost:3001/drivers', formattedDriver)
        .then((response) => {
          setErrors(prevErrors => ({
            ...prevErrors,
            ok: false,
            message: "El conductor se creó correctamente."
          }));
          setTimeout(() => {
            navigate.push("/home");
          }, 1500);


        })
        .catch((error) => {

          setErrors(prevErrors => ({
            ...prevErrors,
            message: "¡Error: no se salvó correctamante!"
          }));

        });
    }
  };
 
  return (
    <form className={styles.formulario}>


    <div >
      <div className={styles.formleftcontainer}>
        <h2 style={{ marginTop: "5px", color: "red" }}>Crea un nuevo conductor {errors.ok}</h2>
        

        <div className={styles.campoImagen}>
          {!newDriver.image && <img src={defaultImage} alt="No image" />}
          {newDriver.image && <img src={newDriver.image}  alt="Pic Driver" />}
        </div>
        
   
        <div className={styles.formleft}>
            <label styles={{color:"white"}}>Image URL:</label>
            <input type="text" title="URL" onChange={imageUrlChange} id="imageUrlInput"/>
            {errors.image ? (
              <span className={styles.errorIcon} title={errors.image}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}></span>
            )}
          </div>
      </div>


<div className={styles.formrightcontainer}>

      <div >
      <label style={{ marginLeft: "0px" }}>Nombre: </label>
      <input style={{ width: "150px" }} name="forename" type="text" onChange={handleChangeInput} />
      {errors.forename && <span className={styles.errorText}>{errors.forename}</span>}
      <label style={{ marginLeft: "5px" }}>Apellido: </label>
      <input style={{ width: "120px" }} name="surname" type="text" onChange={handleChangeInput} />
      {errors.surname && <span className={styles.errorText}>{errors.surname}</span>}
    </div>

    <label>Fecha de nacimiento: </label>
    <input style={{ width: "75px" }} name="dob" type="text" onChange={handleChangeInput} />
    {errors.dob && <span className={styles.errorText}>{errors.dob}</span>}

    <div className={styles.formright}>
  <label>Nacionalidad: </label>
  <input style={{ width: "75px" }} name="nationality" type="text" onChange={handleChangeInput} />
  {errors.nationality && <span className={styles.errorText}>{errors.nationality}</span>}
</div>

<div className={styles.formright}>
  <label className={styles.formright}>Descripción: </label>
  <textarea style={{ width: "75%", height: "90px" }} name="description" cols="100" onChange={handleChangeInput} />
  {errors.description && <span className={styles.errorText}>{errors.description}</span>}
</div>

<div className={styles.formright}>
  <label className={styles.formright} style={{ marginLeft: "-46px", marginTop: "23px" }}>Escuderia:</label>
  <select
    name="teams"
    value={newDriver.teams}
    onChange={handleTeamChange}
    className={styles.formright}
  >
    <option value="">Selecciona una escuderia</option>
    {teams.map((team) => (
      <option key={team} value={team}>
        {team}
      </option>
    ))}
  </select>
  {errors.teams && <span className={styles.errorText}>{errors.teams}</span>}
  
  <label className={styles.formright} style={{ marginLeft: "10px", marginTop: "23px" }}>Crea una nueva escuderia:</label>
  <input type="text" ref={teamInputRef} value={customTeam} onChange={handleCustomTeamChange} />
  <button onClick={handlerAddTeam} className={styles.btnIcono} style={{ marginLeft: "40px", marginTop: "8px" }}>+</button>
</div>

<div>
  <textarea
    style={{ marginLeft: "100px", width: "69%", height: "40px" }}
    value={selectedTeam.join(", ")}
    readOnly
  />
  <button className={styles.btnIcono} onClick={handleUndo}>{'\u21A9'}</button>

  {!selectedTeam.length ? (
    <span className={styles.errorText} title="No has seleccionado una escuderia">
      {'\u274C'} {errors.teams}
    </span>
  ) : (
    <span className={styles.validIcon}>✅</span>
  )}

<div className={styles.formright}>
              <div style={{ display: 'inline-block' }}>
                  <button
                      type="submit"
                      style={{ marginTop: '10px', marginLeft: '10px' }}
                      onClick={handleSubmit}
                      // disabled={!errors.ok || selectedTeam.length === 0}


                      className={styles.submitButton}
                  >
                      Crear
                  </button>
              </div>

              <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                  <button
                      onClick={handleCancel}
                      style={{ marginTop: '10px' }}
                      className={styles.cancelButton}
                  >
                      Cancelar
                  </button>
              </div>
          </div>
          <div className={styles.messageContainer}>
                    {errors.message !== "" && errors.message ? (
                        <span className={styles.message}>
                            {errors.message}
                        </span>
                    ) : (
                        <span style={{color:"red"}}>{errors.message}</span>
                    )}
                </div>

                </div>
</div>
</div>
    </form>
  );
};
export default Create; 