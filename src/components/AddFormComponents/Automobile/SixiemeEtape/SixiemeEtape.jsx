import React, { useContext } from 'react'
import './SixiemeEtape.css'
import { CarHomeDataContext } from '../../../../AddDataContext/AddDataContext'



export default function SixiemeEtape() {
    const { carData, setCarData } = useContext(CarHomeDataContext)


    const documentsOptions = [
        "La carte grise",
        "L'assurance automobile",
        "La visite technique",
        "La vignette",
        "Le certificat de non - gage"
    ]


    const handleDocumentChange = (documentName) => {
        const updatedDocuments = [...carData.documents]; // Copie du tableau documents
        const index = updatedDocuments.indexOf(documentName);

        if (index !== -1) {
            // Si le document est déjà présent dans la liste, on le supprime
            updatedDocuments.splice(index, 1);
        } else {
            // Sinon, on l'ajoute à la liste
            updatedDocuments.push(documentName);
        }

        // Mettre à jour le state avec la nouvelle liste de documents
        setCarData({ ...carData, documents: updatedDocuments });
    };


    return (
        <div className='sixiemeEtape'>
            <h3>Voyez selectionnez les documents que pocède votre vehicule</h3>

            <div className="selectContainer">

                {documentsOptions.map((documents) => (
                    <div className="selectGroup" key={documents}>
                        <input
                            type="checkbox"
                            name={documents}
                            id={documents}
                            checked={carData.documents.includes(documents)}
                            onChange={() => handleDocumentChange(documents)}
                        />
                        <label className="shadow" htmlFor={documents}>
                            {documents}
                        </label>
                    </div>
                ))}

            </div>



            <h3 className='titreTextarea'>description supplementaire</h3>
            <textarea name=""
                value={carData.description} onChange={(e) => setCarData({ ...carData, description: e.target.value })}
                className='card-raduis' id="" rows="8" cols="50" placeholder='Entrez une description du véhicule'>
            </textarea>

        </div>
    )
}

