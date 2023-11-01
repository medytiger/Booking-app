import React, { useContext } from 'react'
import './QuatriemeEtape.css'
import { CarHomeDataContext } from '../../../../AddDataContext/AddDataContext'


export default function QuatriemeEtape() {
    const { carData, setCarData } = useContext(CarHomeDataContext)

    return (
        <div className='quatriemeEtape'>

            <h3>Transmission</h3>
            <div className="selectContainer">
                <div className="selectGroup">
                    <input
                        type="radio" name="type" id="Manuelle"
                        checked={carData.transmission === "Manuelle"}
                        onChange={(e) => setCarData({ ...carData, transmission: "Manuelle" })} />
                    <label className="shadow" htmlFor="Manuelle">
                        Manuelle
                    </label>
                </div>
                <div className="selectGroup">
                    <input
                        type="radio" name="type" id="automatique"
                        checked={carData.transmission === "Boite Automatique"}
                        onChange={(e) => setCarData({ ...carData, transmission: "Boite Automatique" })} />
                    <label className="shadow" htmlFor="automatique">
                        Boite automatique
                    </label>
                </div>

            </div>

            <div className="automobilFormGroup">
                <h3>Puissance</h3>
                <input
                    type="text"
                    value={carData.puissance} onChange={(e) => setCarData({ ...carData, puissance: e.target.value })}
                    placeholder='La puissance du moteur en chevaux' />
            </div>

            <div className="automobilFormGroup">
                <h3>Prix</h3>
                <input
                    type="Number"
                    value={carData.prix} onChange={(e) => setCarData({ ...carData, prix: e.target.value })}
                    placeholder='Le prix de vente de la voiture' />
            </div>

            <div className='selectContainer'>
                <div className="selectGroup">
                    <input type="radio" name="" id="kilometre"
                        checked={carData.duree === "au kilometre"}
                        onChange={(e) => setCarData({ ...carData, duree: "au kilometre" })}
                    />
                    <label className='card-raduis shadow' htmlFor="kilometre">
                        au kilomètres
                    </label>
                </div>
                <div className="selectGroup">
                    <input type="radio" name="" id="heure"
                        checked={carData.duree === "L'heure"}
                        onChange={(e) => setCarData({ ...carData, duree: "L'heure" })}
                    />
                    <label className='card-raduis shadow' htmlFor="heure">
                        L'heure
                    </label>
                </div>
                <div className="selectGroup">
                    <input type="radio" name="" id="journee"
                        checked={carData.duree === "La journée"}
                        onChange={(e) => setCarData({ ...carData, duree: "La journée" })}
                    />
                    <label className='card-raduis shadow' htmlFor="journee">
                        La journée
                    </label>
                </div>
                <div className="selectGroup">
                    <input type="radio" name="" id="mois"
                        checked={carData.duree === "Le mois"}
                        onChange={(e) => setCarData({ ...carData, duree: "Le mois" })}
                    />
                    <label className='card-raduis shadow' htmlFor="mois">
                        Le mois
                    </label>
                </div>
            </div>
        </div>
    )
}
