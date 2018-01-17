import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import logo from "../media/gerb-mvd.png";

function Header() {
  return (
    <header className="header">
      <div className="title-block">
        <Link to="/" className="link">
          <img
            src={logo}
            alt="МВД г.Радужный"
            className="logo"
          />
        </Link>
        <h1 className="title">Информационный сайт ОМВД по г.Радужному</h1>
      </div>
      <nav className="main-nav">
        <Link className="menu-item" to="/">
          <span>Новости</span>
        </Link>
        <Link className="menu-item" to="/phonebook">
          <span>Справочник</span>
        </Link>
        <Link className="menu-item" to="/">
          <span>Сервисы ИСОД</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
