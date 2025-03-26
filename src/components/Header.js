import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Gestión de Pacientes</h1>
      <nav style={styles.nav}>
        <Link to="/home" style={styles.link}>Inicio</Link> |
        <Link to="/pacientes" style={styles.link}>Pacientes</Link> |
        <Link to="/recetas" style={styles.link}>Recetas</Link> |
        <Link to="/farmacia" style={styles.link}>Farmacia</Link> |
        <Link to="/recordatorios" style={styles.link}>Recordatorios</Link> |
        <Link to="/faq" style={styles.link}>FAQ</Link> |
        <Link to="/logout" style={styles.link}>Log Off</Link>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#a7e7e7",
    padding: "15px",
    textAlign: "center",
  },
  title: {
    margin: "0",
    fontSize: "24px",
  },
  nav: {
    marginTop: "10px",
  },
  link: {
    margin: "0 10px",
    textDecoration: "none",
    fontWeight: "bold",
    color: "#333",
  },
};

export default Header;
