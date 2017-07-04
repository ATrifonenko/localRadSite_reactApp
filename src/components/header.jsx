import React from 'react';
import '../css/header.css'

function Header() {
    return (
        <header className="header">
            <div className="logo"></div>
            <h1>Внутренний сайт МВД г.Радужный</h1>
            <nav className="main-nav">
                <a href="">Новости</a>
                <a href="">Справочник</a>
                <a href="">Сервисы ИСОД</a>
            </nav>
        </header>
    );
}

export default Header;