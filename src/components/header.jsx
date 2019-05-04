import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "semantic-ui-react";
import "../css/header.css";
import logo from "../media/gerb-mvd.png";

// ссылки на сервисы ИСОД
const links = [{ title: "Почта", link: "#" }, { title: "СЭД", link: "#" }];

function Header() {
  const dropMenu = links.map(link => (
    <Dropdown.Item key={link.title} as="a" href={link.link} target="_blank">
      {link.title}
    </Dropdown.Item>
  ));

  return (
    <header className="header">
      <div className="title-block">
        <Link to="/" className="link">
          <img src={logo} alt="ОМВД г.Радужный" className="logo" />
        </Link>
        <h1 className="title">Информационный сайт ОМВД по г.Радужному</h1>
      </div>

      <nav className="main-nav">
        <Menu color="blue" inverted fluid widths={3} size="huge">
          <Menu.Item name="editorials" as={Link} to="/">
            Новости
          </Menu.Item>
          <Menu.Item name="reviews" as={Link} to="/phonebook">
            Справочник
          </Menu.Item>
          <Dropdown
            simple
            item
            text="Сервисы ИСОД"
            as="a"
            href="#" // main link
            target="_blank"
          >
            <Dropdown.Menu color="blue">{dropMenu}</Dropdown.Menu>
          </Dropdown>
        </Menu>
      </nav>
    </header>
  );
}

export default Header;
