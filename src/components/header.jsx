import React from 'react';
import '../css/header.css';

function Header() {
    return (
        <header className="header">
            <div className="title-block">
                <a href="/" className="link">
                    <img src="https://xserver.a-real.ru/images/gerb-mvd.png" alt="МВД г.Радужный" className="logo"/>
                </a>
                <h1 className="title">Информационный сайт ОМВД по г.Радужному</h1>
            </div>
            <nav className="main-nav">
                <a className="menu-item" href=""><span>Новости</span></a>
                <a className="menu-item" href=""><span>Справочник</span></a>
                <a className="menu-item" href=""><span>Сервисы ИСОД</span></a>
            </nav>
        </header>
    );
}

export default Header;