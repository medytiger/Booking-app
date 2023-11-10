import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './CarDetails.css'
import axios from "axios";
import { UserContext } from "../../userContext/userContext";
import { ToastContainer, toast } from "react-toastify";
import { motion } from 'framer-motion';
import numeral from "numeral";
import Navbar from '../../components/Navbar/Navbar'
import ProductCard from '../../widgets/ProductCard/ProductCard'
import Footer from '../../components/Footer/Footer'
import Button from '../../widgets/Button/Button'
import avatar from '../../assets/avatar.jpg'
import Loader from "../../components/Loader/Loader";
import { EMAIL, ORANGE, MTN } from '../../App'



export default function CarDetails() {

    const { user, ready } = useContext(UserContext)
    if (!ready) {
        return <Loader />
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const containerVariants = {
        offscreen: { y: 20, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                duration: 1
            }
        }
    };

    const { carId } = useParams(); // Récupère l'ID du bien immobilier à partir de l'URL

    const refreshPage = () => {
        setInterval(() => {
            window.location.reload()

        }, 1000);
    }

    const [images, setImage] = useState(false)
    const [carDetails, setCarDetails] = useState(null);
    const [allCars, setAllCars] = useState([]);

    const [commentaires, setCommentaires] = useState([]);
    const [contenuCommentaire, setContenuCommentaire] = useState('');
    const [actualiseCommentaire, setActualiseCommentaire] = useState(false)

    const [isUserDetailOpen, setIsUserDetailOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null);

    const [carBookingData, setCarBookingData] = useState({
        nom: user ? user.nom : '',
        numero: user ? user.numero : '',
        email: user ? user.email : '',
        dateOccupation: '',
        dateDepot: '',
        chauffeur: '',
    });

    const showImages = (e) => {
        e.preventDefault()
        setImage(!images)
    }

    // Obtenir l'URL actuelle de la page
    const currentURL = window.location.href;

    // Construisez le lien WhatsApp en incluant l'URL de la page
    const whatsappLink = `https://api.whatsapp.com/send?phone=2250706223380&text=Je suis intéressé par le produit sur cette page : ${encodeURIComponent(currentURL)}`;


    useEffect(() => {
        async function fetchCarDetails() {
            try {
                const response = await axios.get(`/automobile/${carId}`);
                setCarDetails(response.data);
            } catch (error) {
                console.error('Une erreur est survenue lors de la récupération des détails du bien immobilier :', error);
            }
        }

        if (!carId) {
            window.location.reload()
        }

        fetchCarDetails();
    }, [carId]);

    useEffect(() => {
        async function fetchCarsData() {
            try {
                // Récupération des biens automobiles
                const carsResponse = await axios.get("/automobiles");

                if (carsResponse.status === 200) {
                    const Cars = carsResponse.data;

                    // Filtrer les biens qui ont au moins un titre similaire
                    const similarCars = Cars.filter((car) => {
                        // Remplacez 'typePlacement' par la propriété que vous utilisez pour stocker le type de placement du bien
                        return (
                            car.typePlacement.includes(carDetails.typePlacement) &&
                            car._id !== carDetails?._id
                        );
                    });

                    // Vous pouvez effectuer d'autres filtrages ou opérations sur les données des voitures ici si nécessaire
                    const randomSimilarCars = similarCars.sort(() => Math.random() - 0.5).slice(0, 8);
                    setAllCars(randomSimilarCars);

                    window.scrollTo(0, 0);
                } else {
                    toast.error("Une erreur est survenue lors de la récupération des biens automobiles");
                }
            } catch (error) {
                console.error("Une erreur est survenue lors de la récupération des données");
            }
        }

        fetchCarsData()
    }, [carDetails]);


    const carBooking = async (e) => {
        e.preventDefault();

        if (!user) {
            // L'utilisateur n'est pas connecté, afficher un message ou rediriger vers la page de connexion
            // Par exemple, vous pouvez utiliser une bibliothèque de notifications comme toast pour afficher un message.
            toast.error('Veuillez vous connecter ou créer un compte pour effectuer une réservation.');
            // Vous pouvez également rediriger l'utilisateur vers la page de connexion ou d'inscription ici.
            return;
        }

        try {
            if (carDetails.typePlacement !== 'en vente') {
                // Si le type de placement n'est pas 'en vente', vérifiez que les deux dates sont remplies
                if (!carBookingData.dateOccupation || !carBookingData.dateDepot) {
                    // Si l'une des dates n'est pas remplie, affichez une erreur
                    toast.error('Veuillez remplir à la fois les dates d\'occupation et de dépôt.');
                    return; // Arrêtez la fonction ici pour éviter la soumission
                }
            }

            const response = await axios.post('/carBooking', {
                automobile: carDetails._id,
                owner: user._id,
                nom: carBookingData.nom,
                numero: carBookingData.numero,
                email: carBookingData.email,
                dateOccupation: carBookingData.dateOccupation,
                dateDepot: carBookingData.dateDepot,
                chauffeur: carBookingData.chauffeur,
            });

            const carId = response.data._id;
            // Le formulaire a été soumis avec succès
            toast.success('Votre réservation de voiture a été effectuée avec succès.');

            // Réinitialiser les valeurs du formulaire après la soumission réussie
            setCarBookingData({
                dateOccupation: '',
                dateDepot: '',
                chauffeur: '',
            });
        } catch (error) {
            if (error.response) {
                // Si l'erreur provient du serveur (status code >= 400)
                const errorMessage = error.response.data.error;
                toast.error(`Erreur lors de la réservation de la voiture : ${errorMessage}`);
            } else {
                // Si une autre erreur se produit (par exemple, une erreur de connexion au serveur)
                console.error(error);
                toast.error('Une erreur est survenue lors de la réservation de la voiture. Veuillez réessayer plus tard.');
            }
        }
    }


    const handleInputChange = (event) => {
        setContenuCommentaire(event.target.value);
    };

    const ajouterCommentaire = async (event) => {
        event.preventDefault();
        if (!user) {
            toast.error('Veuillez vous connecter !!!');
            return; // Arrête l'exécution de la fonction si l'utilisateur n'est pas connecté
        }
        const nouveauCommentaire = {
            owner: user._id,
            car: carDetails._id,
            content: contenuCommentaire,
            createdAt: new Date() // Utilisez la date réelle ici
        };
        try {
            const response = await axios.post(`/car-commentaires`, nouveauCommentaire);
            if (response.status === 201) {
                setContenuCommentaire('');
                setActualiseCommentaire(!actualiseCommentaire)
            } else {
                toast.error('Une erreur est survenue lors de l\'ajout du commentaire');
            }
        } catch (error) {
            toast.error('Une erreur est survenue lors de l\'ajout du commentaire',);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const commentairesResponse = await axios.get(`/car-commentaires/${carDetails._id}`
                );

                const lesCommentaires = commentairesResponse.data;

                // Triez les commentaires si nécessaire
                const sortedCommentaires = lesCommentaires.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setCommentaires(sortedCommentaires);
            } catch (error) {
                console.error('Une erreur est survenue :', error.message);
            }
        };

        fetchData();
    }, [carDetails, actualiseCommentaire]);


    const deleteComment = async ({ commentId }) => {
        try {
            const response = await axios.delete(`/car-commentaires/${commentId}`);

            // Filtrer le commentaire supprimé du tableau des commentaires
            const nouveauxCommentaires = commentaires.filter(commentaire => commentaire._id !== commentId);
            setCommentaires(nouveauxCommentaires);
            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }


    // Fonction pour ouvrir/fermer le modal utilisateur
    function toggleUserDetail(user) {
        setSelectedUser(user);
        setIsUserDetailOpen(!isUserDetailOpen);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <>
            <Navbar />

            {carDetails && (
                <motion.div className='container carDetails'
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />

                    <motion.div className="productHead"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.h1> {carDetails.marque}  {carDetails.modele} {carDetails.annee} - {carDetails.typePlacement} </motion.h1>
                        <motion.div className="sousTitre"
                            initial='offscreen'
                            animate='onscreen'
                            viewport={{ once: false, amount: 0.2 }}
                            variants={containerVariants}
                            transition={{ staggerChildren: 0.5 }}
                        >
                            <motion.div className="left-box"
                                initial='offscreen'
                                animate='onscreen'
                                viewport={{ once: false, amount: 0.2 }}
                                variants={containerVariants}
                                transition={{ staggerChildren: 0.5 }}
                            >
                                <motion.a href={`https://maps.google.com/?q=${carDetails.ville} ${carDetails.commune} ${carDetails.quartier} ${carDetails.nomRue}`} target='_blank'>
                                    <ion-icon name="location-outline"></ion-icon>
                                    {carDetails.ville}s {` - ${carDetails.commune}`} {carDetails.quartier} {carDetails.nomRue} {` | ${carDetails.pays}`}
                                </motion.a>
                                {/* <span><ion-icon name="share-outline"></ion-icon>Partager</span> */}
                                <motion.span className="nombreDeLike">
                                    {carDetails.favories.length}
                                    <ion-icon name="heart"></ion-icon>
                                    Likes
                                </motion.span>
                            </motion.div>
                            <motion.div className="right-box"
                                initial='offscreen'
                                animate='onscreen'
                                viewport={{ once: false, amount: 0.2 }}
                                variants={containerVariants}
                                transition={{ staggerChildren: 0.5 }}
                            >
                                <motion.div className="commentaire">
                                    <span>{commentaires.filter(commentaire => commentaire.owner).length}</span><ion-icon name="chatbubbles"></ion-icon> Commentaires
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    <motion.div className=" grid-container card-raduis"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        <motion.div className="productImg big">
                            <img src={`http://localhost:5000/medias/${carDetails.images[0]}`} alt={carDetails.titre} loading="lazy" />
                        </motion.div>
                        <motion.div className="productImg small">
                            <img src={`http://localhost:5000/medias/${carDetails.images[1]}`} alt={carDetails.titre} loading="lazy" />
                        </motion.div>
                        <motion.div className="productImg small">
                            <img src={`http://localhost:5000/medias/${carDetails.images[2]}`} alt={carDetails.titre} loading="lazy" />
                        </motion.div>
                        <motion.div className="productImg small">
                            <img src={`http://localhost:5000/medias/${carDetails.images[3]}`} alt={carDetails.titre} loading="lazy" />
                        </motion.div>
                        <motion.div className="productImg small">
                            <img src={`http://localhost:5000/medias/${carDetails.images[4]}`} alt={carDetails.titre} loading="lazy" />
                        </motion.div>

                        <motion.button className="allImage glass" onClick={showImages}>
                            <ion-icon name="images-outline"></ion-icon>
                            Toutes les images
                        </motion.button>
                    </motion.div>

                    {
                        images && (
                            <motion.div className="AllImages">
                                <motion.div className="productImg"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.button className="closeImage" onClick={showImages}>
                                        <ion-icon name="close-outline"></ion-icon>
                                    </motion.button>
                                    {carDetails.images.map((image, index) => (
                                        <motion.div className="AllImagesConetent">
                                            <img key={index} src={`http://localhost:5000/medias/${image}`} alt={`Image ${index + 1}`} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        )
                    }

                    <motion.div className="productDetail"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >

                        <motion.div className="left-box"
                            initial='offscreen'
                            animate='onscreen'
                            viewport={{ once: false, amount: 0.2 }}
                            variants={containerVariants}
                            transition={{ staggerChildren: 0.5 }}
                        >

                            <motion.div className="detailHead"
                                initial='offscreen'
                                animate='onscreen'
                                viewport={{ once: false, amount: 0.2 }}
                                variants={containerVariants}
                                transition={{ staggerChildren: 0.5 }}
                            >
                                <motion.img
                                    onClick={() => toggleUserDetail(carDetails.owner)}
                                    className='shadow card-raduis'
                                    src={carDetails.owner.photo ? `http://localhost:5000/${carDetails.owner.photo}` : avatar}
                                    alt="Profil"
                                    loading="lazy" />
                                <motion.h2>Publie par {carDetails.owner.nom} </motion.h2>
                                {carDetails.owner.verifie ? (<ion-icon name="shield-checkmark"></ion-icon>) : ('')}

                                {isUserDetailOpen && selectedUser ? (
                                    <motion.div className="userModal">
                                        <motion.div className="selectedUserCard card-radius"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >

                                            <motion.div className="selectedUserHead">
                                                <motion.img
                                                    className="shadow" // J'ai corrigé "raduis" en "radius"
                                                    src={selectedUser.photo ? `http://localhost:5000/${selectedUser.photo}` : avatar}
                                                    alt="Profil"
                                                    loading="lazy"
                                                />
                                                <div className="selectedUserHeadInfo">
                                                    <h3>{selectedUser.nom}</h3>
                                                    {carDetails.owner.isAdmin && (<h4> +{selectedUser.prefixe}{selectedUser.numero}</h4>)}
                                                    {carDetails.owner.isAdmin === false && (<h4> {selectedUser.lieu}</h4>)}
                                                    <h4 className="email"> {selectedUser.email}</h4>
                                                </div>
                                            </motion.div>

                                            <motion.div className="selectedUserBody">
                                                {selectedUser.nomEntreprise ? (
                                                    <div className="selectedUserBodyItem">
                                                        <h4>Nom d'entreprise</h4>
                                                        <p> {selectedUser.nomEntreprise} </p>
                                                    </div>

                                                ) : null}

                                                {selectedUser.domaineActivite ? (
                                                    <div className="selectedUserBodyItem">
                                                        <h4>Domaine d'activité</h4>
                                                        <p> {selectedUser.domaineActivite} </p>
                                                    </div>
                                                ) : null}

                                                {selectedUser.descriptionActivite ? (
                                                    <div className="selectedUserBodyItem">
                                                        <h4>Description</h4>
                                                        <p> {selectedUser.descriptionActivite} </p>
                                                    </div>
                                                ) : null}

                                                {carDetails.owner.isAdmin && selectedUser.lieu ? (
                                                    <div className="selectedUserBodyItem">
                                                        <h4>Lieu</h4>
                                                        <p> {selectedUser.lieu} </p>
                                                    </div>
                                                ) : null}

                                                {selectedUser.genre ? (
                                                    <div className="selectedUserBodyItem">
                                                        <h4>genre</h4>
                                                        <p> {selectedUser.genre} </p>
                                                    </div>
                                                ) : null}

                                                {selectedUser.date ? (
                                                    <div className="selectedUserBodyItem">
                                                        <h4>date</h4>
                                                        <p> {selectedUser.date} </p>
                                                    </div>
                                                ) : null}

                                                {selectedUser.type ? (
                                                    <div className="selectedUserBodyItem">
                                                        <h4>type de compte</h4>
                                                        <p> {selectedUser.type} </p>
                                                    </div>
                                                ) : null}

                                                <div className="selectedUserBodyItem identifiant">
                                                    <h4>identifiant</h4>
                                                    <p> {selectedUser._id} </p>
                                                </div>

                                            </motion.div>

                                            <motion.div className=" selectedUserFooter">
                                                {selectedUser.facebook ? (
                                                    <div>
                                                        <Link to={selectedUser.facebook} target="_blank"><ion-icon name="logo-facebook"></ion-icon></Link>
                                                    </div>
                                                ) : null}

                                                {selectedUser.tiktok ? (
                                                    <div>
                                                        <Link to={selectedUser.tiktok} target="_blank"><ion-icon name="logo-tiktok"></ion-icon></Link>
                                                    </div>
                                                ) : null}

                                                {selectedUser.linkedin ? (
                                                    <div>
                                                        <Link to={selectedUser.linkedin} target="_blank"><ion-icon name="logo-linkedin"></ion-icon></Link>
                                                    </div>
                                                ) : null}
                                            </motion.div>

                                        </motion.div>

                                        <div onClick={() => toggleUserDetail(null)} className="button">
                                            <ion-icon name="close-outline"></ion-icon>
                                        </div>
                                    </motion.div>
                                ) : null}

                            </motion.div>

                            <motion.div>
                                {carDetails.carburant && (<h4>{`- ${carDetails.carburant}`}</h4>)}
                                {carDetails.transmission && (<h4>{`- ${carDetails.transmission}`}</h4>)}
                                {carDetails.cylindree && (<h4>{`- ${carDetails.cylindree}`}</h4>)}
                                {carDetails.puissance && (<h4>{`- ${carDetails.puissance}`}</h4>)}
                            </motion.div>

                            <motion.div className="productDescription"
                                initial='offscreen'
                                animate='onscreen'
                                viewport={{ once: false, amount: 0.2 }}
                                variants={containerVariants}
                                transition={{ staggerChildren: 0.5 }}
                            >

                                <motion.div className="box"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.h3>Commodites et equipement</motion.h3>

                                    <motion.div className="commodites">

                                        {carDetails.commodite.map(commodite => (
                                            <motion.span className='item card-raduis shadow' key={commodite}>
                                                {commodite.includes('Système de climatisation') && <ion-icon name="snow-outline"></ion-icon>}
                                                {commodite.includes('Sièges chauffants') && <ion-icon name="thermometer-outline"></ion-icon>}
                                                {commodite.includes('Sièges ventilés') && <ion-icon name="nuclear-outline"></ion-icon>}
                                                {commodite.includes('Sièges en cuir') && <ion-icon name="document-text-outline"></ion-icon>}
                                                {commodite.includes('Toit ouvrant') && <ion-icon name="sunny-outline"></ion-icon>}
                                                {commodite.includes('Système de navigation GPS') && <ion-icon name="navigate-outline"></ion-icon>}
                                                {commodite.includes('Système audio haut de gamme') && <ion-icon name="musical-notes-outline"></ion-icon>}
                                                {commodite.includes('Connectivité Bluetooth') && <ion-icon name="bluetooth-outline"></ion-icon>}
                                                {commodite.includes('Musique en streaming') && <ion-icon name="musical-note-outline"></ion-icon>}
                                                {commodite.includes('Caméra de recul') && <ion-icon name="camera-outline"></ion-icon>}
                                                {commodite.includes('Capteurs de stationnement') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                {commodite.includes('Régulateur de vitesse adaptatif') && <ion-icon name="speedometer-outline"></ion-icon>}
                                                {commodite.includes('Système de freinage automatique d\'urgence') && <ion-icon name="warning-outline"></ion-icon>}
                                                {commodite.includes('Système d\'assistance au maintien de la voie') && <ion-icon name="navigate-outline"></ion-icon>}
                                                {commodite.includes('Phares automatiques') && <ion-icon name="flash-outline"></ion-icon>}
                                                {commodite.includes('Démarrage sans clé') && <ion-icon name="key-outline"></ion-icon>}
                                                {commodite.includes('Système de surveillance angles morts') && <ion-icon name="eye-outline"></ion-icon>}
                                                {commodite.includes('Assistance stationnement automatique') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                {commodite.includes('Poignées de porte pouvant être électrifiées') && <ion-icon name="lock-closed-outline"></ion-icon>}
                                                {commodite.includes('Fonction spray au poivre') && <ion-icon name="flame-outline"></ion-icon>}
                                                {commodite.includes('un sous-plancher protégé') && <ion-icon name="shield-checkmark-outline"></ion-icon>}
                                                {commodite.includes('un pare-chocs avant Ram renforcé en acier') && <ion-icon name="hammer-outline"></ion-icon>}
                                                {commodite.includes('Fonction de vision nocturne') && <ion-icon name="moon-outline"></ion-icon>}
                                                {commodite.includes('poignées de porte magnétiques') && <ion-icon name="magnet-outline"></ion-icon>}
                                                {commodite.includes('enregistrement vidéo permanent') && <ion-icon name="videocam-outline"></ion-icon>}
                                                {commodite.includes('Lumières stroboscopiques et éblouissantes') && <ion-icon name="flash-outline"></ion-icon>}
                                                {commodite.includes('Casques et gilets pare-balles') && <ion-icon name="shield-outline"></ion-icon>}
                                                {commodite.includes('disques pare-balles') && <ion-icon name="disc-outline"></ion-icon>}
                                                {commodite.includes('une armure') && <ion-icon name="body-outline"></ion-icon>}
                                                {commodite.includes('Machine à fumée') && <ion-icon name="cloud-outline"></ion-icon>}
                                                {commodite.includes('Pneus runflat de qualité militaire') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                {commodite.includes('Écrans tactiles pour la navigation') && <ion-icon name="navigate-outline"></ion-icon>}
                                                {commodite.includes('Systèmes appels') && <ion-icon name="call-outline"></ion-icon>}
                                                {commodite.includes('Systèmes audio haute qualité avec connectivité Bluetooth,USB et auxiliaire') && <ion-icon name="musical-notes-outline"></ion-icon>}
                                                {commodite.includes('Intégration smartphone') && <ion-icon name="phone-portrait-outline"></ion-icon>}
                                                {commodite.includes('Sièges chauffants et ventilés') && <ion-icon name="thermometer-outline"></ion-icon>}
                                                {commodite.includes('Climatisation automatique ou à zones multiples') && <ion-icon name="snow-outline"></ion-icon>}
                                                {commodite.includes('Sièges ajustables électriquement avec mémoire de position') && <ion-icon name="color-wand-outline"></ion-icon>}
                                                {commodite.includes('Éclairage d\'ambiance') && <ion-icon name="bulb-outline"></ion-icon>}
                                                {commodite.includes('Sièges en cuir ou en similicuir') && <ion-icon name="person-circle-outline"></ion-icon>}
                                                {commodite.includes('Système de freinage antiblocage (ABS)') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                {commodite.includes('Répartiteur électronique de freinage (EBD)') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                {commodite.includes('Assistance au freinage d\'urgence (AEB)') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                {commodite.includes('Régulateur de vitesse adaptatif (ACC)') && <ion-icon name="speedometer-outline"></ion-icon>}
                                                {commodite.includes('Aide au maintien de voie (LKA)') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                {commodite.includes('Surveillance des angles morts (BSM)') && <ion-icon name="eye-outline"></ion-icon>}
                                                {commodite.includes('Alerte de collision arrière (RCA)') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                {commodite.includes('Airbags frontaux, latéraux et rideaux') && <ion-icon name="shield-checkmark-outline"></ion-icon>}
                                                {commodite.includes('Ceintures de sécurité à prétensionneur') && <ion-icon name="key-outline"></ion-icon>}
                                                {commodite.includes('Appuie-têtes actifs') && <ion-icon name="headset-outline"></ion-icon>}
                                                {commodite.includes('Caméras de recul') && <ion-icon name="camera-reverse-outline"></ion-icon>}
                                                {commodite.includes('Caméras à 360 degrés') && <ion-icon name="camera-outline"></ion-icon>}
                                                {commodite.includes('Capteurs de stationnement') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                {commodite.includes('Structure de carrosserie déformable') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                {commodite.includes('Système de gestion de l\'énergie en cas de collision (EMS)') && <ion-icon name="battery-charging-outline"></ion-icon>}
                                                {commodite.includes('Système de désactivation du moteur en cas de collision (ECM)') && <ion-icon name="power-outline"></ion-icon>}
                                                {commodite.includes('Alerte de franchissement de ligne (LDW)') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                {commodite.includes('Alerte de collision frontale (FCW)') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                {commodite.includes('Avertissement de fatigue du conducteur (DAA)') && <ion-icon name="walk-outline"></ion-icon>}
                                                {commodite.includes('Appels d\'urgence automatiques (eCall)') && <ion-icon name="call-outline"></ion-icon>}
                                                {commodite.includes('Systèmes d\'infodivertissement avec écran tactile') && <ion-icon name="phone-portrait-outline"></ion-icon>}
                                                {commodite.includes('Connectivité Bluetooth pour les appels et la musique') && <ion-icon name="bluetooth-outline"></ion-icon>}
                                                {commodite.includes('Contrôle électronique de la stabilité (ESC)') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                {commodite.includes('Contrôle de traction (TC)') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                {commodite.includes('Ancrages ISOFIX pour les sièges pour enfants') && <ion-icon name="child-outline"></ion-icon>}
                                                {commodite.includes('Systèmes de verrouillage des portes arrière') && <ion-icon name="lock-closed-outline"></ion-icon>}
                                                {commodite.includes('Systèmes de surveillance de la pression des pneus (TPMS)') && <ion-icon name="speedometer-outline"></ion-icon>}
                                                {commodite.includes('Assistance au stationnement automatique.') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                {commodite.includes('Commandes vocales') && <ion-icon name="mic-outline"></ion-icon>}
                                                {commodite.includes('Caméras panoramiques pour une meilleure vue autour du véhicule.') && <ion-icon name="camera-outline"></ion-icon>}
                                                {commodite.includes('Commande vocale pour contrôler diverses fonctions du véhicule.') && <ion-icon name="mic-outline"></ion-icon>}
                                                {commodite.includes('Toit ouvrant panoramique.') && <ion-icon name="sunny-outline"></ion-icon>}
                                                {commodite.includes('Coffre à commande électrique.') && <ion-icon name="lock-closed-outline"></ion-icon>}
                                                {commodite.includes('Systèmes de surveillance de la pression des pneus.') && <ion-icon name="speedometer-outline"></ion-icon>}
                                                {commodite.includes('Systèmes d\'antidérapage et de contrôle de stabilité.') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                {commodite.includes('Systèmes de freinage antiblocage (ABS).') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                {commodite.includes('Hotspot Wi-Fi embarqué.') && <ion-icon name="wifi-outline"></ion-icon>}
                                                {commodite.includes('Prises de charge USB pour les passagers.') && <ion-icon name="battery-half-outline"></ion-icon>}
                                                {commodite.includes('Points de charge sans fil pour les appareils compatibles.') && <ion-icon name="battery-charging-outline"></ion-icon>}
                                                {commodite.includes("Espaces de rangement astucieusement conçus dans tout le véhicule.") && <ion-icon name="cube-outline"></ion-icon>}
                                                {commodite.includes("Sièges arrière rabattables pour augmenter l'espace de chargement.") && <icon-ion name="expand-outline"></icon-ion>}
                                                {commodite.includes("Phares à LED ou à décharge haute intensité pour une meilleure visibilité nocturne.") && <icon-ion name="flash-off-outline"></icon-ion>}
                                                {commodite.includes("Feux de jour à LED pour une meilleure visibilité diurne.") && <icon-ion name="sunny-outline"></icon-ion>}


                                                <h5>{commodite}</h5>
                                            </motion.span>
                                        ))}

                                    </motion.div>
                                </motion.div>
                                <motion.div className="box"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.h3>Description</motion.h3>
                                    <motion.p> {carDetails.description} </motion.p>
                                </motion.div>

                                {carDetails.video.length > 0 &&
                                    <motion.div className="video box">
                                        <video controls preload>
                                            <source src={`http://localhost:5000/medias/${carDetails.video[0]}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </motion.div>
                                }

                            </motion.div>
                        </motion.div>

                        <motion.div className={`right-box card-raduis ${carDetails.typePlacement === 'en vente' ? 'right-box-resize' : ''}`}
                            initial='offscreen'
                            animate='onscreen'
                            viewport={{ once: false, amount: 0.2 }}
                            variants={containerVariants}
                            transition={{ staggerChildren: 0.5 }}
                        >

                            <motion.div className={`right-box-item card-raduis shadow ${carDetails.typePlacement === 'en vente' ? 'resize' : ''}`}
                                initial='offscreen'
                                animate='onscreen'
                                viewport={{ once: false, amount: 0.2 }}
                                variants={containerVariants}
                                transition={{ staggerChildren: 0.5 }}
                            >

                                <motion.div className="prixDureeNote"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >

                                    <motion.div className="prixDuree"
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        <motion.div className="prix">
                                            {numeral(carDetails.prix).format('0,0').replace(/,/g, ' ')} <span>FCFA</span>
                                        </motion.div>

                                        {carDetails.duree !== '' && (
                                            <>
                                                <motion.span>/</motion.span>
                                                <motion.div className="duree">
                                                    {carDetails.duree}
                                                </motion.div>
                                            </>
                                        )}
                                    </motion.div>


                                </motion.div>


                                <motion.div className="contacter"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.div>
                                        <ion-icon name="call-outline"></ion-icon> +{ORANGE} <br />
                                    </motion.div>
                                    <motion.div>
                                        <ion-icon name="call-outline"></ion-icon> +{MTN}
                                    </motion.div>
                                    <motion.div>
                                        <ion-icon name="mail-outline"></ion-icon> <a href={`mailto:${EMAIL}`}> {EMAIL} </a>
                                    </motion.div>
                                    <motion.div className="WhatsApp">
                                        <Link target="_blank" to={`https://api.whatsapp.com/send?phone=2250706223380&text=Je suis intéressé par votre: ${carDetails.marque}, Lieu : ${carDetails.ville} ${carDetails.commune} ${carDetails.quartier} ${carDetails.nomRue}, Qui coûte: ${carDetails.prix} Fcfa.  ${window.location.href}`}><ion-icon name="logo-whatsapp"></ion-icon> WhatsApp</Link>
                                    </motion.div>
                                </motion.div>


                                <motion.form onSubmit={carBooking}>

                                    <motion.div className="inputGroup">
                                        <label htmlFor="nom">Nom et Prénom</label>
                                        <input
                                            type="text"
                                            id="nom"
                                            placeholder="Ahmed konaté"
                                            value={carBookingData.nom}
                                            onChange={(e) => setCarBookingData({ ...carBookingData, nom: e.target.value })}
                                        />
                                    </motion.div>

                                    <motion.div className="inputGroup">
                                        <label htmlFor="numero">Votre numéro de téléphone</label>
                                        <input
                                            type="textp"
                                            id="numero"
                                            placeholder="+225 0706223300"
                                            value={carBookingData.numero}
                                            onChange={(e) => setCarBookingData({ ...carBookingData, numero: e.target.value })}
                                        />
                                    </motion.div>

                                    <motion.div className="inputGroup">
                                        <label htmlFor="email">Votre email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="konateahmed@gmail.com"
                                            value={carBookingData.email}
                                            onChange={(e) => setCarBookingData({ ...carBookingData, email: e.target.value })}
                                        />
                                    </motion.div>
                                    {carDetails.typePlacement !== 'en vente' && (
                                        <>
                                            <motion.div className="inputGroup">
                                                <label htmlFor="dateOccupation">Date d'occupation</label>
                                                <input
                                                    type="date"
                                                    id="dateOccupation"
                                                    value={carBookingData.dateOccupation}
                                                    onChange={(e) => setCarBookingData({ ...carBookingData, dateOccupation: e.target.value })}
                                                />
                                            </motion.div>

                                            <motion.div className="inputGroup">
                                                <label htmlFor="dateDepot">Date de dépôt</label>
                                                <input
                                                    type="date"
                                                    id="dateDepot"
                                                    value={carBookingData.dateDepot}
                                                    onChange={(e) => setCarBookingData({ ...carBookingData, dateDepot: e.target.value })}
                                                />
                                            </motion.div>

                                            <motion.div className="voiture">
                                                <h4>avec chauffeur</h4>
                                                <div className="selectContainer">
                                                    <div className="selectGroup">
                                                        <input
                                                            type="radio"
                                                            name="chauffeurOption"
                                                            id="avecChauffeur"
                                                            onChange={() => setCarBookingData({ ...carBookingData, chauffeur: "Oui" })}
                                                        />
                                                        <label className='card-raduis shadow' htmlFor="avecChauffeur">
                                                            Oui
                                                        </label>
                                                    </div>
                                                    <div className="selectGroup">
                                                        <input
                                                            type="radio"
                                                            name="chauffeurOption"
                                                            id="sansChauffeur"
                                                            onChange={() => setCarBookingData({ ...carBookingData, chauffeur: "Non" })}
                                                        />
                                                        <label className='card-raduis shadow' htmlFor="sansChauffeur">
                                                            Non
                                                        </label>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </>

                                    )}

                                    {carDetails.typePlacement === 'en vente' ? (
                                        <motion.button type="submit">
                                            <motion.span>Intéressé(e)</motion.span>
                                        </motion.button>
                                    ) : (
                                        <motion.button type="submit">
                                            <motion.span>Réserver</motion.span>
                                        </motion.button>
                                    )}

                                </motion.form>

                            </motion.div>

                        </motion.div>
                    </motion.div>

                    <motion.div className="avisEtCommentaire"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        {commentaires.length > 0 && (
                            <motion.h3>avis</motion.h3>
                        )}

                        {commentaires.length > 0 && (

                            <motion.div className="avisContainer">

                                {commentaires
                                    .filter(commentaire => commentaire.owner)
                                    .map(commentaire => (
                                        <motion.div key={commentaire._id} className="avis shadow card-raduis"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            <motion.div className="avisHead"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >
                                                <motion.img className='photoProfil item-raduis' src={commentaire.owner.photo ? `http://localhost:5000/${commentaire.owner.photo}` : avatar} alt="Profil" loading="lazy" />
                                                <motion.div className="nomEtDate"
                                                    initial='offscreen'
                                                    animate='onscreen'
                                                    viewport={{ once: false, amount: 0.2 }}
                                                    variants={containerVariants}
                                                    transition={{ staggerChildren: 0.5 }}
                                                >
                                                    <motion.h4>{commentaire.owner.nom}</motion.h4>
                                                    <motion.span>{commentaire.createdAt && new Date(commentaire.createdAt).toLocaleString()}</motion.span>
                                                </motion.div>
                                                {user && user._id === commentaire.owner._id && (
                                                    <motion.button onClick={() => {
                                                        deleteComment({ commentId: commentaire._id });
                                                    }}>supprimer
                                                    </motion.button>
                                                )}
                                            </motion.div>
                                            <motion.div className="aviscontent">
                                                {commentaire.content}
                                            </motion.div>
                                        </motion.div>
                                    ))}

                            </motion.div>

                        )}

                        <motion.div className="commentaireForme">
                            <motion.form onSubmit={ajouterCommentaire}
                                initial='offscreen'
                                animate='onscreen'
                                viewport={{ once: false, amount: 0.2 }}
                                variants={containerVariants}
                                transition={{ staggerChildren: 0.5 }}
                            >
                                <motion.textarea name="commentaire" cols="10" rows="5" placeholder="Ajouter votre commentaire ..." onChange={handleInputChange} value={contenuCommentaire}></motion.textarea>
                                <Button type='submit'>
                                    Ajouter mon commentaire
                                </Button>
                            </motion.form>
                        </motion.div>

                    </motion.div>

                    {allCars.length > 0 && (

                        <motion.div className="autresProposition"
                            initial='offscreen'
                            animate='onscreen'
                            viewport={{ once: false, amount: 0.2 }}
                            variants={containerVariants}
                            transition={{ staggerChildren: 0.5 }}
                        >
                            <motion.h3>Autres propositions</motion.h3>
                            <motion.div className="autre">
                                {allCars.map((car) => (
                                    // Vérifiez si l'ID du bien est différent de l'ID du bien actuellement affiché (carDetails)
                                    <ProductCard key={car._id}>
                                        <Link to={`/car-details/${car._id}`} onClick={refreshPage}>
                                            <motion.img className='card-img card-raduis' src={`http://localhost:5000/medias/${car.images[0]}`} alt={car.titre} loading="lazy" />
                                            <motion.div className="infos"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >
                                                <motion.h2>{car.marque}</motion.h2>
                                                <motion.h5>{car.typePropiete}</motion.h5>
                                                <motion.div className="lieu">
                                                    <ion-icon name="location-outline"></ion-icon>
                                                    {car.ville} {car.commune}
                                                </motion.div>
                                                <motion.div className="prix">
                                                    {numeral(car.prix).format('0,0').replace(/,/g, ' ')} <span>FCFA</span>
                                                </motion.div>

                                            </motion.div>
                                        </Link>
                                    </ProductCard>
                                ))}
                            </motion.div>
                        </motion.div>

                    )}

                </motion.div>
            )
            }

            <Footer />

        </>
    )
}
