import {
  GET_DRIVERS,
  BUSCA_DRIVERS,
  FILTER_ORIGIN,
  RESET_ALL,
  SET_ERROR,
  GET_TEAMS,
  ORDER,
  FILTER_BY_TEAMS,
} from './actions';

const initialState = {


  allDrivers: [],
  conductoresFiltrados: [],
  teams: [],
  error: null,

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
        conductoresFiltrados: action.payload.map(driver => ({ ...driver })),
      };

    case ORDER:
      const orderType = action.payload;
      let sortedDrivers = [...state.conductoresFiltrados]
      if (orderType === "asc") {
        sortedDrivers.sort((a, b) => a.forename.localeCompare(b.forename))
      } else if (orderType === "desc") {
        sortedDrivers.sort((a, b) => b.forename.localeCompare(a.forename))
      } else if (orderType === "nacA") {
        sortedDrivers.sort((a, b) => {
          const dateA = new Date(a.dob);
          const dateB = new Date(b.dob);
          return dateA - dateB;
        })
      } else if (orderType === "nacD") {
        sortedDrivers.sort((a, b) => {
          const dateA = new Date(a.dob);
          const dateB = new Date(b.dob);
          return dateB - dateA;
        })
      }
      return {
        ...state,
        conductoresFiltrados: sortedDrivers
      }

    case GET_TEAMS:

      return {
        ...state,
        teams: action.payload
      }

   


    case FILTER_BY_TEAMS:
      const team = action.payload;

      const filteredTeam = state.conductoresFiltrados.filter((ta) => {
        const teamsArray = ta.teams && ta.teams.split(",").map((team) => team.trim());
        return teamsArray && teamsArray.includes(team);
      });
      if (!filteredTeam || filteredTeam.length === 0) {
        throw new Error("No hay condutores con este equipo, apriete RESET y intente nuevamente");
      }
      return {
        ...state,
        conductoresFiltrados: filteredTeam
      }



    
    case RESET_ALL:
       
      return {
        ...state,
        conductoresFiltrados: [...state.allDrivers]
      }




    case FILTER_ORIGIN:
      const origin = action.payload;
      let driversFiltrados = [...state.conductoresFiltrados];


      if (origin === "api") {
        driversFiltrados = state.conductoresFiltrados.filter((driver) => !('createInDb' in driver));
      } 
      
      else if (origin === "db") {
        driversFiltrados = state.conductoresFiltrados.filter((driver) => 'createInDb' in driver);
      }

      if (!driversFiltrados || driversFiltrados.length === 0) {
        throw new Error("No hay conductores con este filtro, prueba con otro.");
      }
      return {
        ...state,
        conductoresFiltrados: driversFiltrados
      }


      
      
      case BUSCA_DRIVERS:
      const buscados = action.payload.buscados;
      const name = action.payload.name;

      let searchResult = []
      if (buscados === "all") {
        searchResult = state.allDrivers.filter((driver) => {
          return driver.forename.toLowerCase().startsWith(name.toLowerCase());
        })

      } else {
        searchResult = state.conductoresFiltrados.filter((driver) => {
          return driver.forename.toLowerCase().startsWith(name.toLowerCase());
        })
      }

      if (searchResult.length === 0) {
          
        return {
          ...state,
          conductoresFiltrados: [],
          error: 'No tenemos connductores con ese nombre, prueba con otro.',
        };
      }
    
      return {
        ...state,
        conductoresFiltrados: searchResult,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;

