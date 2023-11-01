import React from 'react'
import { Link } from 'react-router-dom';
import './Breadcrumbs.css'

export default function Breadcrumbs() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(part => part !== '');

    return (
        <nav className="breadcrumbs">
            <Link className='link' to="/">Accueil</Link>
            {parts.map((part, index) => {
                const path = `/${parts.slice(0, index + 1).join('/')}`;
                const isActive = window.location.pathname === path;
                return (
                    <React.Fragment key={index}>
                        <span className='separateur'>{'/'}</span>
                        <Link className={`link ${isActive ? 'active' : ''}`} to={path}>{part}</Link>
                    </React.Fragment>
                );
            })}
        </nav>
    );
}
