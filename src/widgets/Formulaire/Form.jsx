import React from 'react'
import './Form.css'
import Button from '../Button/Button'

export default function Form(props) {
    return (
        <form onSubmit={props.onSubmit} className='btn-raduis'>
            <h3>Trouvons votre maison</h3>
            <div class="form">
                <input className="input" placeholder="Nom et Prénom(s)" required="" type="text" />
                <span className="input-border"></span>
            </div>
            <div class="form">
                <input className="input" placeholder="Numéro" required="" type="number" />
                <span className="input-border"></span>
            </div>
            <div class="form">
                <input className="input" placeholder="Budget" required="" type="number" />
                <span className="input-border"></span>
            </div>
            <div class="form">
                <input className="input" placeholder="Zone de recherche" required="" type="text" />
                <span className="input-border"></span>
            </div>
            <div class="form">
                <input className="input" placeholder="Nombre de pièce" required="" type="text" />
                <span className="input-border"></span>
            </div>


            <Button className="headFormSubmit">Soumettre</Button>
        </form>
    )
}
