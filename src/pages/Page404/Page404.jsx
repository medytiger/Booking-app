import React from 'react'
import './Page404.css'
import Button from '../../widgets/Button/Button'
import { Link } from 'react-router-dom'

export default function Page404() {
    return (
        <div className='pageIntrouvable container'>
            <h1>Page 404</h1>
            <p>Désolé, la page que vous recherchez n'existe pas.</p>
            <Button className='inverted'>
                <Link>
                    <span className='text'>
                        Retour a l'Accueil
                    </span>
                </Link>
            </Button>
        </div>
    )
}
