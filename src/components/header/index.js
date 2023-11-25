import React from "react";
import { NavLink } from 'react-router-dom';
import Dotalogo from "./logodota.png"; // Adjust the path based on the actual location of your image
import "./index.css";

export default function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <img
                    src={Dotalogo}
                    alt="Dota 2 Logo"
                    className="logo"
                />
            </div>
            <nav className="navbar">
                <NavLink to="/" className="nav-link">
                    Heroes
                </NavLink>
                <NavLink to="/teams" className="nav-link">
                    Teams
                </NavLink>
                <NavLink to="/profile" className="nav-link">
                    Profile
                </NavLink>
            </nav>
        </header>
    );
}
