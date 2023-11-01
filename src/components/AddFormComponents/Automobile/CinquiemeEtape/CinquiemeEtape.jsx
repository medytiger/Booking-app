import React, { useContext } from 'react'
import './CinquiemeEtape.css'
import { CarHomeDataContext } from '../../../../AddDataContext/AddDataContext';

export default function CinquiemeEtape() {
    const { carData, setCarData } = useContext(CarHomeDataContext)


    const commoditesOptions = [

        'Système de climatisation',
        'Sièges chauffants',
        'Sièges ventilés',
        'Sièges en cuir',
        'Toit ouvrant',
        'Système de navigation GPS',
        'Système audio haut de gamme',
        'Connectivité Bluetooth',
        'Musique en streaming',
        'Caméra de recul',
        'Capteurs de stationnement',
        'Régulateur de vitesse adaptatif',
        'Système de freinage automatique d\'urgence',
        'Système d\'assistance au maintien de la voie',
        'Phares automatiques',
        'Démarrage sans clé',
        'Système de surveillance angles morts',
        'Assistance stationnement automatique',
        'Poignées de porte pouvant être électrifiées',
        'Fonction spray au poivre',
        'un sous - plancher protégé',
        'un pare - chocs avant Ram renforcé en acier',
        'Fonction de vision nocturne',
        'poignées de porte magnétiques',
        'enregistrement vidéo permanent',
        'Lumières stroboscopiques et éblouissantes',

        'Écrans tactiles pour la navigation.',
        'Systèmes appels.',
        'Systèmes audio haute qualité avec connectivité Bluetooth,USB et auxiliaire.',
        'Intégration smartphone.',
        'Sièges chauffants et ventilés.',
        'Climatisation automatique ou à zones multiples.',
        'Sièges ajustables électriquement avec mémoire de position.',
        'Éclairage d\'ambiance.',
        'Sièges en cuir ou en similicuir',
        'Système de freinage antiblocage (ABS)',
        'Répartiteur électronique de freinage (EBD)',
        'Assistance au freinage d\'urgence (AEB)',
        'Régulateur de vitesse adaptatif (ACC)',
        'Aide au maintien de voie (LKA)',
        'Surveillance des angles morts (BSM)',
        'Alerte de collision arrière (RCA)',
        'Airbags frontaux, latéraux et rideaux',
        'Ceintures de sécurité à prétensionneur',
        'Appuie-têtes actifs',
        'Caméras de recul',
        'Caméras à 360 degrés',
        'Capteurs de stationnement',
        'Structure de carrosserie déformable',
        'Système de gestion de l\'énergie en cas de collision (EMS)',
        'Système de désactivation du moteur en cas de collision (ECM)',
        'Alerte de franchissement de ligne (LDW)',
        'Alerte de collision frontale (FCW)',
        'Avertissement de fatigue du conducteur (DAA)',
        'Appels d\'urgence automatiques (eCall)',
        'Systèmes d\'infodivertissement avec écran tactile',
        'Connectivité Bluetooth pour les appels et la musique',
        'Contrôle électronique de la stabilité (ESC)',
        'Contrôle de traction (TC)',
        'Ancrages ISOFIX pour les sièges pour enfants',
        'Systèmes de verrouillage des portes arrière',
        'Systèmes de surveillance de la pression des pneus (TPMS)',
        'Assistance au stationnement automatique.',
        'Commandes vocales',
        'Caméras panoramiques pour une meilleure vue autour du véhicule.',
        'Commande vocale pour contrôler diverses fonctions du véhicule.',
        'Toit ouvrant panoramique.',
        'Coffre à commande électrique.',
        'Démarrage sans clé avec bouton-poussoir.',
        'Systèmes de surveillance de la pression des pneus.',
        'Systèmes d\'antidérapage et de contrôle de stabilité.',
        'Systèmes de freinage antiblocage (ABS).',
        'Hotspot Wi-Fi embarqué.',
        'Prises de charge USB pour les passagers.',
        'Points de charge sans fil pour les appareils compatibles.',
        'Espaces de rangement astucieusement conçus dans tout le véhicule.',
        'Sièges arrière rabattables pour augmenter l\'espace de chargement.',
        'Phares à LED ou à décharge haute intensité pour une meilleure visibilité nocturne.',
        'Feux de jour à LED pour une meilleure visibilité diurne.',

        'Casques et gilets pare - balles',
        'disques pare - balles',
        'une armure',
        'Machine à fumée',
        'Pneus runflat de qualité militaire',
    ];

    // <>
    //     Systèmes de divertissement et de communication :

    //     Écrans tactiles pour la navigation.
    //     Systèmes appels.
    //     Systèmes audio haute qualité avec connectivité Bluetooth,USB et auxiliaire.
    //     Intégration smartphone.

    //     Confort intérieur :

    //     Sièges chauffants et ventilés.
    //     Climatisation automatique ou à zones multiples.
    //     Sièges ajustables électriquement avec mémoire de position.
    //     Éclairage d'ambiance.
    //     Sièges en cuir ou en similicuir

    //     Sécurité :

    //     Système de freinage antiblocage (ABS)
    //     Répartiteur électronique de freinage (EBD)
    //     Assistance au freinage d'urgence (AEB)
    //     Régulateur de vitesse adaptatif (ACC)
    //     Aide au maintien de voie (LKA)
    //     Surveillance des angles morts (BSM)
    //     Alerte de collision arrière (RCA)
    //     Airbags frontaux, latéraux et rideaux
    //     Ceintures de sécurité à prétensionneur
    //     Appuie-têtes actifs
    //     Caméras de recul
    //     Caméras à 360 degrés
    //     Capteurs de stationnement
    //     Structure de carrosserie déformable
    //     Système de gestion de l'énergie en cas de collision (EMS)
    //     Système de désactivation du moteur en cas de collision (ECM)
    //     Alerte de franchissement de ligne (LDW)
    //     Alerte de collision frontale (FCW)
    //     Avertissement de fatigue du conducteur (DAA)
    //     Appels d'urgence automatiques (eCall)
    //     Systèmes d'infodivertissement avec écran tactile
    //     Connectivité Bluetooth pour les appels et la musique
    //     Contrôle électronique de la stabilité (ESC)
    //     Contrôle de traction (TC)
    //     Ancrages ISOFIX pour les sièges pour enfants
    //     Systèmes de verrouillage des portes arrière
    //     Systèmes de surveillance de la pression des pneus (TPMS)

    //     Technologie avancée :

    //     Assistance au stationnement automatique.
    //     Commandes vocales
    //     Caméras panoramiques pour une meilleure vue autour du véhicule.
    //     Commande vocale pour contrôler diverses fonctions du véhicule.

    //     Commodités pratiques :

    //     Toit ouvrant panoramique.
    //     Coffre à commande électrique.
    //     Démarrage sans clé avec bouton-poussoir.

    //     Systèmes de sécurité avancés :

    //     Systèmes de surveillance de la pression des pneus.
    //     Systèmes d'antidérapage et de contrôle de stabilité.
    //     Systèmes de freinage antiblocage (ABS).

    //     Options de connectivité :

    //     Hotspot Wi-Fi embarqué.
    //     Prises de charge USB pour les passagers.
    //     Points de charge sans fil pour les appareils compatibles.

    //     Espace de rangement :

    //     Espaces de rangement astucieusement conçus dans tout le véhicule.
    //     Sièges arrière rabattables pour augmenter l'espace de chargement.

    //     Éclairage extérieur :

    //     Phares à LED ou à décharge haute intensité pour une meilleure visibilité nocturne.
    //     Feux de jour à LED pour une meilleure visibilité diurne.
    // </>


    // const handleCommoditeChange = (commoditeName) => {
    //     const updatedCommodites = [...carData.commodite]; // Copie du tableau commodite
    //     const index = updatedCommodites.indexOf(commoditeName);

    //     if (index !== -1) {
    //         // Si la commodité est déjà présente dans la liste, on la supprime
    //         updatedCommodites.splice(index, 1);
    //     } else {
    //         // Sinon, on l'ajoute à la liste
    //         updatedCommodites.push(commoditeName);
    //     }

    //     // Mettre à jour le state avec la nouvelle liste de commodités
    //     setCarData({ ...carData, commodite: updatedCommodites });
    // };

    const handleCommoditeChange = (commoditeName) => {
        const updatedCommodites = [...carData.commodite]; // Copie du tableau commodite
        const index = updatedCommodites.indexOf(commoditeName);

        if (index !== -1) {
            // Si la commodité est déjà présente dans la liste, on la supprime
            updatedCommodites.splice(index, 1);
        } else {
            // Sinon, on l'ajoute à la liste
            updatedCommodites.push(commoditeName);
        }

        // Mettre à jour le state avec la nouvelle liste de commodités
        setCarData((prevData) => ({
            ...prevData,
            commodite: updatedCommodites,
        }));
    };


    return (

        <div className='cinquiemeEtape'>
            <h3>Commodité</h3>

            <div className="selectContainer">

                {commoditesOptions.map((commodite, index) => (
                    <div className="selectGroup" key={`${commodite.id}-${index}`}>
                        <input
                            type="checkbox"
                            name={commodite}
                            id={commodite}
                            checked={carData.commodite.includes(commodite)}
                            onChange={() => handleCommoditeChange(commodite)}
                        />
                        <label className="shadow" htmlFor={commodite}>
                            {commodite}
                        </label>
                    </div>
                ))}

            </div>

        </div>
    )
}
