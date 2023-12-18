import "./HeaderComponent.css";
import { Link } from "react-router-dom";
const HeaderComponent = () => {
  return (
    <header className="header">
      <nav>
        <div className="logo">To-do Application</div>
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">
          &#9776;
        </label>
        <ul className="menu">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/users"}>Users</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
