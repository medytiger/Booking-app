import React, { useContext } from 'react'
import './DeuxiemeEtape.css'
import { CarHomeDataContext } from '../../../../AddDataContext/AddDataContext'

export default function DeuxiemeEtape() {
    const { carData, setCarData } = useContext(CarHomeDataContext)


    return (
        <div className='deuxiemeEtape'>
            <div className="automobilFormGroup">
                <h3>Carrosserie du vehicule</h3>

                <input
                    type="text"
                    value={carData.carrosserie} onChange={(e) => setCarData({ ...carData, carrosserie: e.target.value })}
                    placeholder='la forme de la carrosserie de la voiture (par exemple, berline, coupé, SUV, etc.)' />
            </div>
            <div className="automobilFormGroup">
                <h3>Couleur du vehicule</h3>
                <input
                    type="text"
                    value={carData.couleur} onChange={(e) => setCarData({ ...carData, couleur: e.target.value })}
                    placeholder='la couleur de la voiture' />
            </div>

            <h3>Etat du vehicule</h3>
            <div className="selectContainer">
                <div className="selectGroup">
                    <input
                        type="radio" name="type" id="Neuve"
                        checked={carData.etat === "Neuve"}
                        onChange={(e) => setCarData({ ...carData, etat: "Neuve" })} />
                    <label className="shadow" htmlFor="Neuve">
                        Neuve
                    </label>
                </div>
                <div className="selectGroup">
                    <input
                        type="radio" name="type" id="Occasion"
                        checked={carData.etat === "Occasion"}
                        onChange={(e) => setCarData({ ...carData, etat: "Occasion" })} />
                    <label className="shadow" htmlFor="Occasion">
                        Occasion
                    </label>
                </div>
                <div className="selectGroup">
                    <input
                        type="radio" name="type" id="Endommage"
                        checked={carData.etat === "Endommage"}
                        onChange={(e) => setCarData({ ...carData, etat: "Endommage" })} />
                    <label className="shadow" htmlFor="Endommage">
                        Endommagé
                    </label>
                </div>
            </div>

            <h3>Type de placement</h3>
            <div className="selectContainer">
                <div className="selectGroup">
                    <input
                        type="radio" name="vente" id="vente"
                        checked={carData.typePlacement === "en vente"}
                        onChange={(e) => setCarData({ ...carData, typePlacement: "en vente" })} />
                    <label className="shadow" htmlFor="vente">
                        En vente
                    </label>
                </div>
                <div className="selectGroup">
                    <input
                        type="radio" name="location" id="location"
                        checked={carData.typePlacement === "en location"}
                        onChange={(e) => setCarData({ ...carData, typePlacement: "en location" })} />
                    <label className="shadow" htmlFor="location">
                        En location
                    </label>
                </div>

            </div>


        </div>
    )
}
