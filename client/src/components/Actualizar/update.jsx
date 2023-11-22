import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
// import styles from './update.module.css';
import { validate } from './vallidacionesUp';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const noImage = "https://1000marcas.net/wp-content/uploads/2020/01/logo-F1.png"

function Create() {
  const teams = useSelector((state) => state.teams); // Todos los teams del estado global 
  const drivers = useSelector((state) => state.allDrivers); // Todos los drivers del estado global
  const { id } = useParams();
 
  const [selectedTeam, setSelectedTeam] = useState([]); //Teams seleccionados
  const [customTeam, setCustomTeam] = useState(""); //Team personalizado
  
  const teamInputRef = useRef(null);
  
  const navigate = useNavigate(); 
  
  
  /*****   ESTADO NEW DRIVER   *****/
  const [newDriver, setNewDriver] = useState({
    forename: "",
    surname: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    teams: ""
  })

  /*****   ESTADO DE ERRORES   *****/
  const [errors, setErrors] = useState({
    forename: "Forename is required",
    surname: "Surname is required",
    description: "Description is required",
    image: "No Image default",
    nationality: "Nationality is required",
    dob: "Dob is required",
    teams: "Teams is required",
    message: "",
    ok: false
  })

  useEffect(() => {
    let formattedData={}
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/drivers/${id}`);
        const data = response.data;
       
        if (Object.keys(data).length === 0) {
          setNewDriver(null);
        } else {
          if (data.createInDb) {
             formattedData = {
              ...data,
              image: data.image
            };
          } else {
            formattedData = {
              ...data,
              image: data.image.url
            };
          }
          setErrors({ok:true})
          setNewDriver(formattedData);
          setSelectedTeam(formattedData.Teams);
          
        }
        
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, [id]);

  /*****   AGREGAR UN TEAM AL TEXTAREA TEAMS   *****/
  const handlerAddTeam = (event) => {
    event.preventDefault();
    const team = teamInputRef.current.value || customTeam;
     if (team && !newDriver.teams.includes(team)) {
      setSelectedTeam([...selectedTeam, team]);
      setCustomTeam("");
      teamInputRef.current.value = "";
    }

  };

  /*****   VALIDACION TEXTAREA DE TEAMS   *****/
  const handleTeamChange = (event) => {
    const selectedDriver = event.target.value;
    const isDuplicate = selectedTeam.some((team) => team.name === selectedDriver);
  
    if (!isDuplicate) {
      setNewDriver((prevState) => ({
        ...prevState,
        teams: [...prevState.teams, selectedDriver],
      }));
  
      setSelectedTeam((prevState) => [...prevState, { name: selectedDriver }]);
    }
  };
  useEffect(() => {
    if (selectedTeam) {
      setNewDriver((prevState) => ({
        ...prevState,
        teams: selectedTeam.map((team) => team.name),
      }));
      validate(newDriver);
    }
  }, [selectedTeam]);

  /*****   INPUT TEAM PERSONALIZADO (estado)   *****/
  const handleCustomTeamChange = (event) => {
    setCustomTeam(event.target.value);
  };

  /*****   HANDLE BOTON UNDO DE TEAMS   *****/
  const handleUndo = (event) => {
    event.preventDefault();
    
    if (selectedTeam.length > 0) {
      const updatedTeam = selectedTeam.slice(0, -1);
      setSelectedTeam(updatedTeam);
    }
  };

  /*****   VALIDACION DE LOS INPUTS   *****/
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
 
  /*****   VALIDO LA CARGA DE IMAGEN   *****/
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
        image: "Invalid URL, please correct"
      }));
    }
  }

  /*****   HANDLE BOTON CANCEL  *****/
  const handleCancel = (event) => {
    event.preventDefault()
    navigate.push("/home");
    return 
  }
  
  const handleSubmit = (e) => {
    
    const errors = validate(newDriver); //Valido antes de grabar

    if (drivers.some(driver => driver.forename.toLowerCase() === newDriver.forename.toLowerCase() && driver.surname.toLowerCase() === newDriver.surname.toLowerCase())){
      setErrors((prevErrors) => ({
        ...prevErrors,
        message: "Error: Driver exists!",
      }));
      return; // Evitar la ejecución del resto del código
    }
   
    if (errors.ok) {
      //Aseguro el formato JSON para que se guarde en la BD
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
            message: "The driver was saved correctly"
          }));
          setTimeout(() => {
            navigate.push("/home");
          }, 1500);


        })
        .catch((error) => {

          setErrors(prevErrors => ({
            ...prevErrors,
            message: "Error: NOT saved correctly"
          }));

        });
    }
  };
 
  return (
    <div className={styles.container}>

      {/***** COLUMNA IZQUIERDA *****/}
      <div className={styles.sidebar}>
        <h2 style={{ marginTop: "5px", color: "red" }}>Create New Driver {errors.ok}</h2>
        
        {/***** IMAGEN *****/}
        <div className={styles.campoImagen}>
          {!newDriver.image && <img src={noImage} alt="No image" />}
          {newDriver.image && <img src={newDriver.image}  alt="Pic Driver" />}
        </div>
        
        {/***** CARGA DE URL DE IMAGEN *****/}
        <div className={styles.formField}>
            <label styles={{color:"white"}}>Image URL:</label>
            <input type="text" title="URL" defaultValue={newDriver.image} onChange={imageUrlChange} id="imageUrlInput"/>
            {errors.image ? (
              <span className={styles.errorIcon} title={errors.image}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          </div>
      </div>

      {/***** COLUMNA DERECHA *****/}
      <div className={styles.main}>
        <form className={styles.form}>
        <h2 style={{ marginTop: "-5px", marginBottom: "35px", color: "white" }}>{errors.ok}</h2>
          
          {/***** CARGA DE NOMBRE; APELLIDO Y F. NAC *****/}
          <div className={styles.formField}>
            <label style={{marginLeft:"0px"}}>Forename: </label>
            <input style={{width:"150px"}} name="forename" type="text" defaultValue={newDriver.forename} onChange={handleChangeInput}/>
            {errors.forename ? (
              <span className={styles.errorIcon} title={errors.forename}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
            <label style={{marginLeft:"5px"}}>Surname: </label>
            <input style={{width:"120px"}} name="surname" defaultValue={newDriver.surname} type="text" onChange={handleChangeInput}/>
            {errors.surname ? (
              <span className={styles.errorIcon} title={errors.surname}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          
            <label >Dob: </label>
            <input style={{width:"75px"}} defaultValue={newDriver.dob} name="dob" type="text" onChange={handleChangeInput}/>
            {errors.dob ? (
              <span className={styles.errorIcon} title={errors.dob}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          </div>
          
          {/***** CARGA DE NACIONALIDAD *****/}
          <div className={styles.formField}>
            <label >Nationality: </label>
            <input style={{ width: "75px" }} defaultValue={newDriver.nationality} name="nationality" type="text" onChange={handleChangeInput} />
            {errors.nationality ? (
              <span className={styles.errorIcon} title={errors.nationality}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          </div>

          {/***** CARGA DE DESCRIPCION *****/}
          <div className={styles.formField}>
            <label className={styles.formField}>Description: </label>
            <textarea style={{width:"75%", height:"90px"}} defaultValue={newDriver.description} name="description" cols="100" onChange={handleChangeInput}/>
            {errors.description ? (
              <span className={styles.errorIcon} title={errors.description}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          </div>

          {/***** CARGA DE TEAMS *****/}
          <div className={styles.formField}>
            <label className={styles.formField} style={{marginLeft:"-46px", marginTop:"23px"}}>Teams:</label>
            <select
              name="teams"
              value={newDriver.teams}
              onChange={handleTeamChange}
              className={styles.formField}
            >
              <option value="">Select teams</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
            
            <label className={styles.formField} style={{marginLeft:"10px", marginTop:"23px"}}>Custom Team:</label>
            <input type="text" ref={teamInputRef} value={customTeam} onChange={handleCustomTeamChange} />
            <button onClick={handlerAddTeam} className={styles.btnIcono} style={{marginLeft:"40px", marginTop:"8px"}}>+</button>
            </div>
            <div>
              <textarea
                style={{marginLeft:"100px", width:"69%", height:"40px"}}
                
                value={selectedTeam.map(team => team.name).join(", ")}
           
                readOnly
              />
              <button className={styles.btnIcono} onClick={handleUndo}>{'\u21A9'}</button>

              {!selectedTeam.length ? (
                <span className={styles.errorIcon} title="No teams selected, one required">
                  {'\u274C'}
                </span>
              ) : (
                <span className={styles.validIcon}>✅</span>
                
              )}
          </div>
          
          {/***** BOTON GRABAR & CANCELAR *****/}
          <div className={styles.formField}>
              <div style={{ display: 'inline-block' }}>
                  <button
                      type="submit"
                      style={{ marginTop: '10px', marginLeft: '10px' }}
                      onClick={handleSubmit}
                      disabled={!errors.ok || selectedTeam.length === 0}


                      className={styles.submitButton}
                  >
                      Save
                  </button>
              </div>

              <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                  <button
                      onClick={handleCancel}
                      style={{ marginTop: '10px' }}
                      className={styles.cancelButton}
                  >
                      Cancel
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
        </form>
      </div>
    </div>
  );
}

export default Create;