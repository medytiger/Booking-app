import React, { useContext } from 'react'
import './TroisiemeEtape.css'
import { CarHomeDataContext } from '../../../../AddDataContext/AddDataContext'


export default function ToisiemeEtape() {
    const { carData, setCarData } = useContext(CarHomeDataContext)

    return (
        <div className='toisiemeEtape'>
            <div className="automobilFormGroup">
                <h3>Kilométrage</h3>
                <input
                    type="text"
                    value={carData.kilometrage} onChange={(e) => setCarData({ ...carData, kilometrage: e.target.value })}
                    placeholder='le nombre de kilomètres parcourus par la voiture' />
            </div>
            <div className="automobilFormGroup">
                <h3>Vitesse</h3>
                <input
                    type="text"
                    value={carData.vitesse} onChange={(e) => setCarData({ ...carData, vitesse: e.target.value })}
                    placeholder='La vitesse maximale du véhicule' />
            </div>
            <div className="automobilFormGroup">
                <h3>Carburant</h3>
                <input
                    type="text"
                    value={carData.carburant} onChange={(e) => setCarData({ ...carData, carburant: e.target.value })}
                    placeholder='le type de carburant utilisé par la voiture (essence, diesel, hybride, électrique, etc.)' />
            </div>
            <div className="automobilFormGroup">
                <h3>Cylindrée</h3>
                <input
                    type="text"
                    value={carData.cylindree} onChange={(e) => setCarData({ ...carData, cylindree: e.target.value })}
                    placeholder='la taille du moteur en litres ' />
            </div>

        </div>
    )
}
