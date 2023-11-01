import React from 'react'
import './ButtonFondColeur.css'

export default function ButtonFondColeur(props) {
    return (

        <button
            className={`ButtonFondColeur ${props.className}`}
            onClick={props.onClick}
            type={props.button || 'button'}
        >
            {props.children}
            <span className="bord1"></span>
            <span className="bord2"></span>
            <span className="bord3"></span>
        </button>
    )
}
