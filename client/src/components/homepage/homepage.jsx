import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrivers,
  orderDrivers,
  getTeams,
  filterTeams,
  reset,
  filterOrigin,
  searchDrivers,
  setError,
} from "../../redux/actions";
import Nav from "../nav/nav";
import Paginado from "../paginado/paginado";
import Card from "../reutilizables/card/card";
import styles from "../homepage/styleshomepage.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const conductoresFiltrados = useSelector((state) => state.conductoresFiltrados);
  const teams = useSelector((state) => state.teams);
  const error = useSelector((state) => state.error);
  const allDriversCount = conductoresFiltrados ? conductoresFiltrados.length : 0;

  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );
  const driversPerPage = 9;
  const indexLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexLastDriver - driversPerPage;

  const [selectedOrder, setSelectedOrder] = useState(
    localStorage.getItem("selectedOrder") || ""
  );
  const [selectedTeam, setSelectedTeam] = useState(
    localStorage.getItem("selectedTeam") || ""
  );
  const [selectedOrigin, setSelectedOrigin] = useState(
    localStorage.getItem("selectedOrigin") || ""
  );
  const [checkedSearch, setCheckedSearch] = useState(
    localStorage.getItem("checkedSearch") === "true"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getDrivers());
      } catch (error) {
        dispatch(setError("Error fetching drivers"));
      }
    };

    if (!conductoresFiltrados.length) {
      fetchData();
    }
  }, [dispatch, conductoresFiltrados]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        await dispatch(getTeams());
      } catch (error) {
        dispatch(setError("Error fetching teams"));
      }
    };

    if (!teams.length) {
      fetchTeams();
    }
  }, [dispatch, teams]);

  useEffect(() => {
    const storedCurrentPage = localStorage.getItem("currentPage");
    if (storedCurrentPage) {
      setCurrentPage(parseInt(storedCurrentPage));
      localStorage.removeItem("currentPage");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOrder = (event) => {
    const orderType = event.target.value;
    setSelectedOrder(orderType);
    localStorage.setItem("selectedOrder", orderType);
    dispatch(orderDrivers(orderType));
  };

  const handleFTeam = (event) => {
    const team = event.target.value;
    setSelectedTeam(team);
    localStorage.setItem("selectedTeam", team);
    dispatch(filterTeams(team));
    setCurrentPage(1);
  };

  const handleSearch = (name, isChecked) => {
    setCheckedSearch(isChecked);
    localStorage.setItem("checkedSearch", isChecked.toString());
    dispatch(searchDrivers(name, isChecked));
    setCurrentPage(1);
  };

  const handlerReset = () => {
    setCurrentPage(1);
    setSelectedOrder("");
    setSelectedTeam("");
    setSelectedOrigin("");
    setCheckedSearch(false);
    localStorage.removeItem("selectedOrder");
    localStorage.removeItem("selectedTeam");
    localStorage.removeItem("selectedOrigin");
    localStorage.removeItem("checkedSearch");
    dispatch(reset());
  };

  const handleFilterOrigin = (event) => {
    const origin = event.target.value;
    setSelectedOrigin(origin);
    localStorage.setItem("selectedOrigin", origin);
    dispatch(filterOrigin(origin));
  };

  return (
    <div className={styles.home}>
      <div className={styles.navBar}>
        <Nav
          onSearch={handleSearch}
          handleOrder={handleOrder}
          teams={teams}
          handleFTeam={handleFTeam}
          handlerReset={handlerReset}
          handlerFilterOrigin={handleFilterOrigin}
          selectedOrder={selectedOrder}
          selectedTeam={selectedTeam}
          selectedOrigin={selectedOrigin}
          checkedSearch={checkedSearch}
        />
        {error && <p className={styles.errores}>{error}</p>}
      </div>
      <div className={styles.paginadoContainer}>
        <Paginado
          driversPerPage={driversPerPage}
          allDrivers={allDriversCount}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
      <Card drivers={conductoresFiltrados ? conductoresFiltrados.slice(indexOfFirstDriver, indexLastDriver) : []} />
    </div>
  );
};

export default Home;