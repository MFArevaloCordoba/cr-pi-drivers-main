export const validate = (newDriver) => {
  
    
    let errors = {
      forename: "",
      surname: "",
      description: "",
      nationality: "",
      image:"",
      dob: "",
      ok: true
    };
  
    if (!newDriver.image) {
      
      errors.image = "URL image default";
    }
  
  
  
    if (!newDriver.forename) { 
      errors.ok = false;
      errors.forename = "El nombre es obligatorio.";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s¨']*$/u.test(newDriver.forename)) {
      errors.ok = false;
      errors.forename = "El nombre acepta unicamente letras.";
    } else if (newDriver.forename.length > 20) {
      errors.ok = false;
      errors.forename = "El nombre tiene que tener menos de 20 caracteres.";
    }
  

    if (!newDriver.surname) { 
      errors.ok = false;
      errors.surname = "Apellido es obligatorio.";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s¨']*$/u.test(newDriver.surname)) {
      errors.ok = false;
      errors.surname = "El apellido acepta unicamente letras.";
    } else if (newDriver.surname.length > 20) {
      errors.ok = false;
      errors.surname = "El apellido tiene que tener menos de 20 caracteres.";
    }
  
   
    if (!newDriver.dob) { 
      errors.ok = false;
      errors.dob = "Fecha de nacimiento es obligatoria";
    } else if (!/^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/.test(newDriver.dob)){
      errors.ok = false;
      errors.dob = "La fecha de nacimiento solo acepta: dd/mm/aaaa";
    }   
  
   
    if (!newDriver.nationality) { 
      errors.ok = false;
      errors.nationality = "Nacionalidad es obligatoria.";
    } else if (!/^[a-zA-Z]+$/u.test(newDriver.nationality)) {
      errors.ok = false;
      errors.nationality = "La nacionalidad e obligatoria.";
    } else if (newDriver.nationality.length > 20) {
      errors.ok = false;
      errors.nationality = "La nacionalidad tiene que tener menos de 20 caracteres.";
    }
  
    
  
    if (!newDriver.description) { 
      errors.ok = false;
      errors.description = "Una descripcion es obligatoria";
    } 
  
  
    return errors;
  };