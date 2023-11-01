import React from 'react'
import './Button.css'

export default function Button(props) {
    return (

        <button
            className={`fancy ${props.className}`}
            onClick={props.onClick}
            type={props.type || 'button'}
        >
            {props.children}
            <span className="top-key"></span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
        </button>
    )
}
