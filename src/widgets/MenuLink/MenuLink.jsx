import React from 'react'
import { Link } from 'react-router-dom'
import './MenuLink.css'


export default function MenuLink(props) {
    return (
        <Link
            to={props.to}
            className="menu-link"
        >
            {props.children}
        </Link>
    )
}
