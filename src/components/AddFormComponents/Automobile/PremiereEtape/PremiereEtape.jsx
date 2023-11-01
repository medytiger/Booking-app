import React, { useContext } from 'react'
import './PremiereEtape.css'
import { CarHomeDataContext } from '../../../../AddDataContext/AddDataContext';


export default function PremiereEtape() {
    const { carData, setCarData } = useContext(CarHomeDataContext)


    return (
        <div className='premiereEtape'>
            <div className="automobilFormGroup">
                <h3>Marque</h3>
                <input
                    type="text"
                    value={carData.marque} onChange={(e) => setCarData({ ...carData, marque: e.target.value })}
                    placeholder='la marque de la voiture (par exemple, Toyota, Ford, etc.)' />
            </div>
            <div className="automobilFormGroup">
                <h3>Modèle</h3>
                <input
                    type="text"
                    value={carData.modele} onChange={(e) => setCarData({ ...carData, modele: e.target.value })}
                    placeholder='le modèle de la voiture (par exemple, Camry, Mustang, etc.)' />
            </div>
            <div className="automobilFormGroup">
                <h3>Année de fabrication</h3>
                <input
                    type="text"
                    value={carData.annee} onChange={(e) => setCarData({ ...carData, annee: e.target.value })}
                    placeholder=' Année de fabrication de la voiture' />
            </div>
            <div className="automobilFormGroup">
                <h3>Nombre de place</h3>
                <input
                    type="text"
                    value={carData.nombrePlaces} onChange={(e) => setCarData({ ...carData, nombrePlaces: e.target.value })}
                    placeholder='Le nombre de place du véhicule' />
            </div>
            <div className="automobilFormGroup">
                <h3>Le pays</h3>
                <input
                    type="text"
                    value={carData.pays} onChange={(e) => setCarData({ ...carData, pays: e.target.value })}
                    placeholder='Dans quel pays pouvons nous vous trouver' />
            </div>
            <div className="automobilFormGroup">
                <h3>la ville</h3>
                <input
                    type="text"
                    value={carData.ville} onChange={(e) => setCarData({ ...carData, ville: e.target.value })}
                    placeholder='Dans quelle ville pouvons nous vous trouver' />
            </div>
            <div className="automobilFormGroup">
                <h3>la commune</h3>
                <input
                    type="text"
                    value={carData.commune} onChange={(e) => setCarData({ ...carData, commune: e.target.value })}
                    placeholder='Dans quelle commune pouvons nous vous trouver' />
            </div>
            <div className="automobilFormGroup">
                <h3>Le quartier</h3>
                <input
                    type="text"
                    value={carData.quartier} onChange={(e) => setCarData({ ...carData, quartier: e.target.value })}
                    placeholder='Dans quel quartier pouvons nous vous trouver' />
            </div>
            <div className="automobilFormGroup">
                <h3>Numéro de la rue</h3>
                <input
                    type="text"
                    value={carData.nomRue} onChange={(e) => setCarData({ ...carData, nomRue: e.target.value })}
                    placeholder='Quelle est la rue de votre quartier' />
            </div>
            <div className="automobilFormGroup">
                <h3>Votre code postal</h3>
                <input
                    type="text"
                    value={carData.codePostal} onChange={(e) => setCarData({ ...carData, codePostal: e.target.value })}
                    placeholder='Le nombre de place du véhicule' />
            </div>
        </div>
    )
}
