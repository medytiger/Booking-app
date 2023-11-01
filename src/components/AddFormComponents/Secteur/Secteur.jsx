import React from 'react';
import './Secteur.css';

export default function Secteur({ secteur, setSecteur }) {

    return (
        <div className="secteur">
            <h3>Secteur d'activite</h3>
            <div className="selectContainer">
                <div className="selectGroup automobile card-raduis">
                    <input
                        type="radio"
                        name="type"
                        id="automobile"
                        checked={secteur === "L'industrie automobile"}
                        onChange={(e) => {
                            setSecteur("L'industrie automobile");
                        }}
                    />
                    <label className="card-raduis shadow" htmlFor="automobile">
                        L'industrie automobile
                    </label>
                </div>
                <div className="selectGroup immobilier card-raduis">
                    <input
                        type="radio"
                        name="type"
                        id="immobilier"
                        checked={secteur === "l'immobilier"}
                        onChange={(e) => {
                            setSecteur("l'immobilier");
                        }}
                    />
                    <label className="card-raduis shadow" htmlFor="immobilier">
                        l'immobilier
                    </label>
                </div>
            </div>
        </div>
    );
}
