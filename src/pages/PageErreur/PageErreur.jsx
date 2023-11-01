import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function PageErreur() {
    const erreur = useRouteError();
    return (
        <div>
            <h2>C'est gaté mon veux !!!</h2>
            <p> {erreur.statusText || erreur} </p>
        </div>
    )
}
