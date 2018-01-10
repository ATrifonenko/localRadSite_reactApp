import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";

function Header() {
  return (
    <header className="header">
      <div className="title-block">
        <a href="/" className="link">
          <img
            src="https://xserver.a-real.ru/images/gerb-mvd.png"
            alt="МВД г.Радужный"
            className="logo"
          />
        </a>
        <h1 className="title">Информационный сайт ОМВД по г.Радужному</h1>
      </div>
      <nav className="main-nav">
        <Link className="menu-item" to="/">
          <span>Новости</span>
        </Link>
        <Link className="menu-item" to="/phonebook">
          <span>Справочник</span>
        </Link>
        <a className="menu-item" href="">
          <span>Сервисы ИСОД</span>
        </a>
      </nav>
    </header>
  );
}

export default Header;
