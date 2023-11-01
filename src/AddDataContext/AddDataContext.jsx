import { createContext, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import Secteur from '../components/AddFormComponents/Secteur/Secteur';
import Type from '../components/AddFormComponents/Immobilier/Type/Type';
import Description from '../components/AddFormComponents/Immobilier/Description/Description';
import Equipement from '../components/AddFormComponents/Immobilier/Equipements/Equipement';
import Localisation from '../components/AddFormComponents/Immobilier/Localisation/Localisation';
import Condition from '../components/AddFormComponents/Immobilier/Condition/Condition';
import Permis from '../components/AddFormComponents/Immobilier/Permis/Permis';
import Images from '../components/AddFormComponents/Immobilier/imagesPropritete/Images';

import PremiereEtape from '../components/AddFormComponents/Automobile/PremiereEtape/PremiereEtape';
import DeuxiemeEtape from '../components/AddFormComponents/Automobile/DeuxiemeEtape/DeuxiemeEtape';
import TroisiemeEtape from '../components/AddFormComponents/Automobile/TroisiemeEtape/TroisiemeEtape'
import QuatriemeEtape from '../components/AddFormComponents/Automobile/QuatriemeEtape/QuatriemeEtape';
import CinquiemeEtape from '../components/AddFormComponents/Automobile/CinquiemeEtape/CinquiemeEtape';
import SixiemeEtape from '../components/AddFormComponents/Automobile/SixiemeEtape/SixiemeEtape';
import SeptiemeEtape from '../components/AddFormComponents/Automobile/SeptiemeEtape/SeptiemeEtape';
import Felicitation from '../components/AddFormComponents/Felicitation/Felicitation';
import { UserContext } from '../userContext/userContext';



export const CarHomeDataContext = createContext();

export function CatHomeDataProvider(props) {
    const { user } = useContext(UserContext);
    const { id } = useParams();

    // const Navigate = useNavigate();
    const [secteur, setSecteur] = useState('');
    const [addFormStep, setAddFormStep] = useState(0)
    const [homeLink, setHomeLink] = useState([]);
    const [carLink, setCarLink] = useState([]);
    const [homeVideoData, setHomeVideoData] = useState([]);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [actualiseData, setActualiseData] = useState(false)
    const [like, setLike] = useState(false);


    const [homeData, setHomeData] = useState({
        typePropiete: [],
        typePlacement: '',
        standing: '',
        titre: '',
        description: '',
        commodite: [],
        pays: '',
        ville: '',
        commune: '',
        quartier: '',
        nomRue: '',
        codePostal: '',
        prix: '',
        duree: '',
        condition: [],
        permis: '',
        problemePermis: '',
        images: [],
        video: [],
        homeLink: [],
    })

    const [carData, setCarData] = useState({
        marque: '',
        modele: '',
        annee: '',
        typePlacement: '',
        nombrePlaces: '',
        pays: '',
        ville: '',
        commune: '',
        quartier: '',
        nomRue: '',
        codePostal: '',
        carrosserie: '',
        couleur: '',
        kilometrage: '',
        carburant: '',
        cylindree: '',
        vitesse: '',
        transmission: '',
        puissance: '',
        prix: '',
        duree: '',
        etat: '',
        commodite: [],
        documents: [],
        description: '',
        images: [],
        video: [],
        carLink: [],
    })

    const homeCommoditesChange = (event) => {
        const { name, checked } = event.target;
        setHomeData((prevHomeData) => ({
            ...prevHomeData,
            commodite: {
                ...prevHomeData.commodite,
                [name]: checked,
            },
        }));
    };

    const homeStepVisible = () => {
        switch (addFormStep) {
            case 0:
                return <Secteur secteur={secteur} setSecteur={setSecteur} />;
            case 1:
                return <Type />;
            case 2:
                return <Description />;
            case 3:
                return <Equipement homeCommoditesChange={homeCommoditesChange} />;
            case 4:
                return <Localisation />;
            case 5:
                return <Condition />;
            case 6:
                return <Permis />;
            case 7:
                return <Images
                    homeLink={homeLink}
                    setHomeLink={setHomeLink}
                    homeVideoData={homeVideoData}
                    setHomeVideoData={setHomeVideoData}
                />;
            case 8:
                return <Felicitation />;
            default:
                return null;
        }
    }

    const carStepVisible = () => {
        switch (addFormStep) {
            case 0:
                return <Secteur secteur={secteur} setSecteur={setSecteur} />;
            case 1:
                return <PremiereEtape />;
            case 2:
                return <DeuxiemeEtape />;
            case 3:
                return <TroisiemeEtape />;
            case 4:
                return <QuatriemeEtape />;
            case 5:
                return <CinquiemeEtape />;
            case 6:
                return <SixiemeEtape />;
            case 7:
                return <SeptiemeEtape carLink={carLink} setCarLink={setCarLink} />;
            case 8:
                return <Felicitation />;
            default:
                return null;
        }
    }

    async function addImmobilier(e) {
        e.preventDefault();
        const dataHome = {
            typePropiete: homeData.typePropiete,
            typePlacement: homeData.typePlacement,
            standing: homeData.standing,
            titre: homeData.titre,
            description: homeData.description,
            commodite: homeData.commodite,
            pays: homeData.pays,
            ville: homeData.ville,
            commune: homeData.commune,
            quartier: homeData.quartier,
            nomRue: homeData.nomRue,
            codePostal: homeData.codePostal,
            prix: homeData.prix,
            duree: homeData.duree,
            condition: homeData.condition,
            permis: homeData.permis,
            problemePermis: homeData.problemePermis,
            images: homeData.images,
            video: homeData.video,
            homeLink: homeData.homeLink,
            active: homeData.active
        };

        console.log(homeData.id);
        // Si le bien immobilier existe déjà (contient un ID), mettre à jour le bien immobilier
        if (homeData.id) {
            try {
                const response = await axios.put(`/immobilier/${homeData.id}`, dataHome);

                // Le formulaire a été soumis avec succès
                toast.success('Bien immobilier mis à jour avec succès');
                setAddModalVisible(!addModalVisible);
                setActualiseData(!actualiseData)
                setAddFormStep(0);
                setHomeData({
                    typePropiete: [],
                    typePlacement: '',
                    standing: '',
                    titre: '',
                    description: '',
                    commodite: [],
                    pays: '',
                    ville: '',
                    commune: '',
                    quartier: '',
                    nomRue: '',
                    codePostal: '',
                    prix: '',
                    duree: '',
                    condition: [],
                    permis: '',
                    problemePermis: '',
                    images: [],
                    video: [],
                    homeLink: [],
                }
                )
            } catch (error) {
                if (error.response) {
                    // Si l'erreur provient du serveur (status code >= 400)
                    const errorMessage = error.response.data.error;
                    toast.error(errorMessage);
                } else {
                    // Si une autre erreur se produit (par exemple, une erreur de connexion au serveur)
                    console.error(error);
                    toast.error('Une erreur est survenue. Veuillez réessayer.');
                }
            }
        } else { // Sinon, créer un nouveau bien immobilier
            try {
                const response = await axios.post('/immobilier', dataHome);

                // Le formulaire a été soumis avec succès
                toast.success('Nouveau bien immobilier ajouté avec succès');
                setAddModalVisible(!addModalVisible);
                setActualiseData(!actualiseData)
                setAddFormStep(0);
                setHomeData({
                    typePropiete: [],
                    typePlacement: '',
                    standing: '',
                    titre: '',
                    description: '',
                    commodite: [],
                    pays: '',
                    ville: '',
                    commune: '',
                    quartier: '',
                    nomRue: '',
                    codePostal: '',
                    prix: '',
                    duree: '',
                    condition: [],
                    permis: '',
                    problemePermis: '',
                    images: [],
                    video: [],
                    homeLink: [],
                }
                )
            } catch (error) {
                if (error.response) {
                    // Si l'erreur provient du serveur (status code >= 400)
                    const errorMessage = error.response.data.error;
                    toast.error(errorMessage);
                } else {
                    // Si une autre erreur se produit (par exemple, une erreur de connexion au serveur)
                    console.error(error);
                    toast.error('Une erreur est survenue. Veuillez réessayer.');
                }
            }
        }
    }

    async function addCar(e) {
        e.preventDefault();

        const dataCar = {
            marque: carData.marque,
            modele: carData.modele,
            annee: carData.annee,
            typePlacement: carData.typePlacement,
            nombrePlaces: carData.nombrePlaces,
            pays: carData.pays,
            ville: carData.ville,
            commune: carData.commune,
            quartier: carData.quartier,
            nomRue: carData.nomRue,
            codePostal: carData.codePostal,
            carrosserie: carData.carrosserie,
            couleur: carData.couleur,
            kilometrage: carData.kilometrage,
            carburant: carData.carburant,
            cylindree: carData.cylindree,
            vitesse: carData.vitesse,
            transmission: carData.transmission,
            puissance: carData.puissance,
            prix: carData.prix,
            duree: carData.duree,
            etat: carData.etat,
            commodite: carData.commodite,
            documents: carData.documents,
            description: carData.description,
            images: carData.images,
            video: carData.video,
            carLink: carData.carLink,
            active: carData.active
        };

        // Si la voiture existe déjà (contient un ID), mettre à jour la voiture
        if (carData.id) {
            try {
                const response = await axios.put(`/automobile/${carData.id}`, dataCar);

                // La voiture a été mise à jour avec succès
                toast.success('Voiture mise à jour avec succès');
                setAddModalVisible(!addModalVisible);
                setActualiseData(!actualiseData)
                setAddFormStep(0)
                setCarData({
                    marque: '',
                    modele: '',
                    annee: '',
                    typePlacement: '',
                    nombrePlaces: '',
                    pays: '',
                    ville: '',
                    commune: '',
                    quartier: '',
                    nomRue: '',
                    codePostal: '',
                    carrosserie: '',
                    couleur: '',
                    kilometrage: '',
                    carburant: '',
                    cylindree: '',
                    vitesse: '',
                    transmission: '',
                    puissance: '',
                    prix: '',
                    duree: '',
                    etat: '',
                    commodite: [],
                    documents: [],
                    description: '',
                    images: [],
                    video: [],
                    carLink: [],
                })
            } catch (error) {
                if (error.response) {
                    // Si l'erreur provient du serveur (status code >= 400)
                    const errorMessage = error.response.data.error;
                    toast.error(errorMessage);
                } else {
                    // Si une autre erreur se produit (par exemple, une erreur de connexion au serveur)
                    console.error(error);
                    toast.error('Une erreur est survenue. Veuillez réessayer.');
                }
            }
        } else { // Sinon, créer une nouvelle voiture
            try {
                const response = await axios.post('/automobile', dataCar);

                // La voiture a été ajoutée avec succès
                toast.success('Nouvelle voiture ajoutée avec succès');
                setAddModalVisible(!addModalVisible);
                setActualiseData(!actualiseData)
                setAddFormStep(0)
                setCarData({
                    marque: '',
                    modele: '',
                    annee: '',
                    typePlacement: '',
                    nombrePlaces: '',
                    pays: '',
                    ville: '',
                    commune: '',
                    quartier: '',
                    nomRue: '',
                    codePostal: '',
                    carrosserie: '',
                    couleur: '',
                    kilometrage: '',
                    carburant: '',
                    cylindree: '',
                    vitesse: '',
                    transmission: '',
                    puissance: '',
                    prix: '',
                    duree: '',
                    etat: '',
                    commodite: [],
                    documents: [],
                    description: '',
                    images: [],
                    video: [],
                    carLink: [],
                })
            } catch (error) {
                if (error.response) {
                    // Si l'erreur provient du serveur (status code >= 400)
                    const errorMessage = error.response.data.error;
                    toast.error(errorMessage);
                } else {
                    // Si une autre erreur se produit (par exemple, une erreur de connexion au serveur)
                    console.error(error);
                    toast.error('Une erreur est survenue. Veuillez réessayer.');
                }
            }
        }
    }

    const addHomeToFavorites = async (homeId) => {
        try {
            // Envoyez une requête PATCH vers l'endpoint approprié pour mettre à jour les favoris du bien
            const response = await axios.patch(`/add-home-to-favorites/${homeId}`, {
                userId: user._id, // Supposons que vous avez l'ID de l'utilisateur connecté dans la variable "user"
            });

            // Vérifiez si la mise à jour a réussi
            if (response.status === 200) {
                // La mise à jour des favoris a été effectuée avec succès
                setLike(!like)
            } else {
                toast.error('Une erreur est survenue lors de la mise à jour des favoris.');
            }
        } catch (error) {
            if (error.response) {
                // Si l'erreur provient du serveur (status code >= 400)
                const errorMessage = error.response.data.error;
            } else {
                // Si une autre erreur se produit (par exemple, une erreur de connexion au serveur)
                console.error(error);
            }
        }
    };

    const removeHomeFromFavorites = async (homeId) => {
        try {
            // Envoyez une requête PATCH vers l'endpoint approprié pour supprimer le bien des favoris de l'utilisateur
            const response = await axios.patch(`/remove-home-from-favorites/${homeId}`, {
                userId: user._id,
            });

            // Vérifiez si la mise à jour a réussi
            if (response.status === 200) {
                // La suppression des favoris a été effectuée avec succès
                setLike(!like); // Définissez "like" sur false pour afficher le cœur non rempli
            } else {
                toast.error('Une erreur est survenue lors de la suppression des favoris.');
            }
        } catch (error) {
            if (error.response) {
                // Si l'erreur provient du serveur (status code >= 400)
                const errorMessage = error.response.data.error;
                toast.error(errorMessage);
            } else {
                // Si une autre erreur se produit (par exemple, une erreur de connexion au serveur)
                console.error(error);
            }
        }
    };

    const addCarToFavorites = async (carId) => {
        try {
            // Envoyez une requête PATCH vers l'endpoint approprié pour mettre à jour les favoris du bien
            const response = await axios.patch(`/add-car-to-favorites/${carId}`, {
                userId: user._id, // Supposons que vous avez l'ID de l'utilisateur connecté dans la variable "user"
            });

            // Vérifiez si la mise à jour a réussi
            if (response.status === 200) {
                // La mise à jour des favoris a été effectuée avec succès
                setLike(!like)
            } else {
                toast.error('Une erreur est survenue lors de la mise à jour des favoris.');
            }
        } catch (error) {
            if (error.response) {
                // Si l'erreur provient du serveur (status code >= 400)
                const errorMessage = error.response.data.error;
            } else {
                // Si une autre erreur se produit (par exemple, une erreur de connexion au serveur)
                console.error(error);
            }
        }
    };

    const removeCarFromFavorites = async (carId) => {
        try {
            // Envoyez une requête PATCH vers l'endpoint approprié pour supprimer le bien des favoris de l'utilisateur
            const response = await axios.patch(`/remove-car-from-favorites/${carId}`, {
                userId: user._id,
            });

            // Vérifiez si la mise à jour a réussi
            if (response.status === 200) {
                // La suppression des favoris a été effectuée avec succès
                setLike(!like); // Définissez "like" sur false pour afficher le cœur non rempli
            } else {
                toast.error('Une erreur est survenue lors de la suppression des favoris.');
            }
        } catch (error) {
            if (error.response) {
                // Si l'erreur provient du serveur (status code >= 400)
                const errorMessage = error.response.data.error;
                toast.error(errorMessage);
            } else {
                // Si une autre erreur se produit (par exemple, une erreur de connexion au serveur)
                console.error(error);
            }
        }
    };


    return (
        <CarHomeDataContext.Provider value={{
            carData, setCarData,
            homeData, setHomeData,
            addModalVisible, setAddModalVisible,
            homeCommoditesChange,
            addFormStep, setAddFormStep,
            homeStepVisible,
            carStepVisible,
            addCar,
            addImmobilier,
            secteur,
            setSecteur,
            actualiseData, setActualiseData,
            like, setLike,
            addHomeToFavorites,
            removeHomeFromFavorites,
            addCarToFavorites,
            removeCarFromFavorites,
        }}
        >
            {props.children}
        </CarHomeDataContext.Provider>
    );
}
