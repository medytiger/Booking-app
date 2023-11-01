import React, { useContext } from 'react';
import './Type.css';
import { CarHomeDataContext } from '../../../../AddDataContext/AddDataContext';



export default function Type() {
    const { homeData, setHomeData } = useContext(CarHomeDataContext)


    const propertyTypes = [
        "Maison",
        "Appartement",
        "Appartement meublé",
        "Bureau",
        "Co-working",
        "Hôtel",
        "Motel",
        "Salle d'évènement",
        "Entrepôt",
        "Magasin",
        "Restaurant",
        "Parc",
        "Salle de sport",
        "Terrain",
    ];

    const handleTypeChange = (typeName) => {
        const updatedType = [...homeData.typePropiete]; // Copie du tableau typePropiete
        const index = updatedType.indexOf(typeName);

        if (index !== -1) {
            // Si la commodité est déjà présente dans la liste, on la supprime
            updatedType.splice(index, 1);
        } else {
            // Sinon, on l'ajoute à la liste
            updatedType.push(typeName);
        }

        // Mettre à jour le state avec la nouvelle liste de commodités
        setHomeData({ ...homeData, typePropiete: updatedType });
    };

    const placementTypes = [
        { id: 'vente', label: 'En vente' },
        { id: 'location', label: 'En location' },
        { id: 'séjour', label: 'Pour séjour' },
    ];

    const standingTypes = [
        { id: 'ordinaire', label: 'Ordinaire' },
        { id: 'moyen', label: 'Moyen Standing' },
        { id: 'haut', label: 'Haut Standing' },
    ];


    const handleRadioChange = (name, value) => {
        setHomeData({ ...homeData, [name]: value });
    };

    return (
        <div className="typeDePropriete">
            <h2>type de propriete</h2>

            <div className="selectContainer">

                {propertyTypes.map((typePropiete) => (
                    <div className="selectGroup" key={typePropiete}>
                        <input
                            type="checkbox"
                            name={typePropiete}
                            id={typePropiete}
                            checked={homeData.typePropiete.includes(typePropiete)}
                            onChange={() => handleTypeChange(typePropiete)}
                        />
                        <label className="shadow" htmlFor={typePropiete}>
                            {typePropiete}
                        </label>
                    </div>
                ))}

            </div>

            <h2 className="bottomBox">type de placement</h2>
            <div className="selectContainer">
                {placementTypes.map((placementType) => (
                    <div className="selectGroup" key={placementType.id}>
                        <input
                            type="radio"
                            id={placementType.id}
                            checked={homeData.typePlacement === placementType.label}
                            onChange={() => handleRadioChange('typePlacement', placementType.label)}
                        />
                        <label className="card-raduis shadow" htmlFor={placementType.id}>
                            {placementType.label}
                        </label>
                    </div>
                ))}
            </div>

            <h2 className="bottomBox">Standing</h2>
            <div className="selectContainer">
                {standingTypes.map((standingType) => (
                    <div className="selectGroup" key={standingType.id}>
                        <input
                            type="radio"
                            id={standingType.id}
                            checked={homeData.standing === standingType.label}
                            onChange={() => handleRadioChange('standing', standingType.label)}
                        />
                        <label className="card-raduis shadow" htmlFor={standingType.id}>
                            {standingType.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
