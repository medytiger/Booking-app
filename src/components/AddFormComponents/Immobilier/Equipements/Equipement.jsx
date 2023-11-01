import React, { useContext } from "react";
import "./Equipement.css";
import { CarHomeDataContext } from '../../../../AddDataContext/AddDataContext';


export default function Equipement() {
    const { homeData, setHomeData } = useContext(CarHomeDataContext)


    const commoditesOptions = [
        'Télévision (TV)',
        'Accès Internet sans fil (Wi-Fi)',
        'Camera extèrne',
        'Climatisation',
        'Réfrigérateur/Minibar',
        'Coffre-fort',
        'Salle de bains privative avec articles de toilette',
        'Serviettes et linge de lit',
        'Service de chambre',
        'Petit-déjeuner inclus',
        'Piscine',
        'Centre de remise en forme',
        'Restaurant',
        'Service de blanchisserie',
        'Réception 24h/24',
        'Parking',
        'Service de navette',
        'Cuisine équipée (réfrigérateur, cuisinière, four, micro-ondes)',
        'Machine à laver',
        'Sèche-linge',
        'Fer et planche à repasser',
        'Linge de lit et serviettes',
        'Jardin ou terrasse',
        'Barbecue',
        'Espace de stationnement (garage ou parking)',
        'Jacuzzi ou bain à remous',
        'Système de sécurité (alarme, caméras)',
        'Bureau et chaise de travail',
        'Téléphone',
        'Salle de réunion ou salle de conférence',
        'Espace de rangement (armoires, étagères)',
        'Imprimante, scanner ou photocopieuse',
        'Kitchenette ou espace pour préparer les repas rapides',
        'Espace de détente (canapé, fauteuils)',
        'Toilettes et lavabo privés',
        'Services de secrétariat (réceptionniste, service de courrier)',
        'Accès facile aux transports en commun',
        'Espace extérieur (balcon, terrasse)'
    ];

    const handleCommoditeChange = (commoditeName) => {
        const updatedCommodites = [...homeData.commodite]; // Copie du tableau commodite
        const index = updatedCommodites.indexOf(commoditeName);

        if (index !== -1) {
            // Si la commodité est déjà présente dans la liste, on la supprime
            updatedCommodites.splice(index, 1);
        } else {
            // Sinon, on l'ajoute à la liste
            updatedCommodites.push(commoditeName);
        }

        // Mettre à jour le state avec la nouvelle liste de commodités
        setHomeData({ ...homeData, commodite: updatedCommodites });
    };

    return (
        <div className="equipement">
            <h2>COMMODITES ET EQUIPEMENTS</h2>

            <div className="selectContainer">

                {commoditesOptions.map((commodite) => (
                    <div className="selectGroup" key={commodite}>
                        <input
                            type="checkbox"
                            name={commodite}
                            id={commodite}
                            checked={homeData.commodite.includes(commodite)}
                            onChange={() => handleCommoditeChange(commodite)}
                        />
                        <label className="shadow" htmlFor={commodite}>
                            {commodite}
                        </label>
                    </div>
                ))}

            </div>

        </div>
    );
}
