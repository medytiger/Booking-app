import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext/userContext";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import './HomeDetails.css';
import { toast } from "react-toastify";
import { motion } from 'framer-motion';
import numeral from "numeral";
import Navbar from '../../components/Navbar/Navbar';
import ProductCard from '../../widgets/ProductCard/ProductCard';
import Footer from '../../components/Footer/Footer';
import Button from '../../widgets/Button/Button';
import avatar from '../../assets/avatar.jpg';
import Loader from "../../components/Loader/Loader";
import { EMAIL, ORANGE, MTN } from '../../App'


export default function HomeDetails() {

    const { user, ready } = useContext(UserContext);

    if (!ready) {
        return <Loader />
    }

    const containerVariants = {
        offscreen: { y: 20, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                duration: 1,
            }
        }
    };

    const { homeId } = useParams(); // Récupère l'ID du bien immobilier à partir de l'URL

    const refreshPage = () => {
        setInterval(() => {
            window.location.reload()
        }, 1000);
    }

    const [images, setImage] = useState(false)
    const [homeDetails, setHomeDetails] = useState(null);
    const [allHomes, setAllHomes] = useState([]);

    const [commentaires, setCommentaires] = useState([]);
    const [contenuCommentaire, setContenuCommentaire] = useState('');
    const [actualiseCommentaire, setActualiseCommentaire] = useState(false)

    const [isUserDetailOpen, setIsUserDetailOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null);


    const [homeBookData, setHomeBookData] = useState({
        nom: user ? user.nom : '',
        numero: user ? user.numero : '',
        email: user ? user.email : '',
        dateArrive: '',
        dateDepart: '',
    });

    const showImages = (e) => {
        e.preventDefault()
        setImage(!images)
    }

    // Obtenir l'URL actuelle de la page
    const currentURL = window.location.href;

    // Construisez le lien WhatsApp en incluant l'URL de la page
    const whatsappLink = `https://api.whatsapp.com/send?phone=2250706223380&text=Je suis intéressé par le produit sur cette page : ${window.location.href}`;


    useEffect(() => {
        async function fetchHomeDetails() {
            try {
                const response = await axios.get(`/immobilier/${homeId}`);
                setHomeDetails(response.data);
            } catch (error) {
                console.error('Une erreur est survenue lors de la récupération des détails du bien immobilier :', error);
            }
        }

        fetchHomeDetails();
    }, [homeId]);

    useEffect(() => {
        async function fetchData() {
            try {
                if (homeDetails) {
                    const homesResponse = await axios.get('/immobiliers');
                    if (homesResponse.status === 200) {
                        const Homes = homesResponse.data;

                        const similarHomes = Homes.filter((home) => {
                            return (
                                home.typePropiete.includes(homeDetails.typePropiete) ||
                                (home.typePlacement.includes(homeDetails.typePlacement) && home._id !== homeDetails?._id)
                            );
                        });

                        const randomSimilarHomes = similarHomes.sort(() => Math.random() - 0.5).slice(0, 8);
                        setAllHomes(randomSimilarHomes);
                        // window.location.reload();
                        window.scrollTo(0, 0);
                    } else {
                        toast.error('Une erreur est survenue lors de la récupération des biens immobiliers');
                    }
                }
            } catch (error) {
                toast.error('Une erreur est survenue lors de la récupération des données');
            }
        }

        fetchData();
    }, [homeDetails]);


    const homeBooking = async (e) => {
        e.preventDefault();

        // Vérifier si l'utilisateur est connecté
        if (!user) {
            // L'utilisateur n'est pas connecté, afficher un message ou rediriger vers la page de connexion
            // Par exemple, vous pouvez utiliser une bibliothèque de notifications comme toast pour afficher un message.
            toast.error('Veuillez vous connecter ou créer un compte pour effectuer une réservation.');
            // Vous pouvez également rediriger l'utilisateur vers la page de connexion ou d'inscription ici.
            return;
        }

        try {
            if (homeDetails.typePlacement !== 'En vente' && homeDetails.duree !== 'Le mois') {
                // ... le reste du code pour la validation des dates
            }

            // Envoyer la demande de réservation
            const response = await axios.post('/homeBooking', {
                owner: user._id,
                home: homeDetails._id,
                nom: homeBookData.nom,
                numero: homeBookData.numero,
                email: homeBookData.email,
                dateArrive: homeBookData.dateArrive,
                dateDepart: homeBookData.dateDepart,
            });

            // Le formulaire a été soumis avec succès
            toast.success('Votre réservation a été effectuée avec succès.');

            // Réinitialiser les valeurs du formulaire après la soumission réussie
            setHomeBookData({
                home: '',
                nom: '',
                numero: '',
                dateArrive: '',
                dateDepart: '',
            });
        } catch (error) {
            if (error.response) {
                // Gérer les erreurs provenant du serveur
                const errorMessage = error.response.data.error;
                toast.error(errorMessage);
            } else {
                // Gérer d'autres erreurs (par exemple, erreurs de connexion au serveur)
                console.error(error);
                toast.error('Une erreur est survenue lors de la réservation. Veuillez réessayer plus tard.');
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
            home: homeDetails._id,
            content: contenuCommentaire,
            createdAt: new Date() // Utilisez la date réelle ici
        };

        try {
            const response = await axios.post(`/home-commentaires`, nouveauCommentaire);
            if (response.status === 201) {
                setContenuCommentaire('');
                setActualiseCommentaire(!actualiseCommentaire);
            } else {
                console.error('Une erreur est survenue lors de l\'ajout du commentaire');
            }
        } catch (error) {
            console.error('Une erreur est survenue lors de l\'ajout du commentaire');
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const commentairesResponse = await axios.get(`/home-commentaires/${homeDetails._id}`);
                const lesCommentaires = commentairesResponse.data;

                // Triez les commentaires si nécessaire
                const sortedCommentaires = lesCommentaires.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setCommentaires(sortedCommentaires);
            } catch (error) {
                console.error('Une erreur est survenue :', error.message);
            }
        }

        // Charger les commentaires au chargement de la page
        fetchData();

        // Mettre à jour les commentaires lorsque `actualiseCommentaire` change
        // Cette dépendance assure que les commentaires sont mis à jour lorsque `actualiseCommentaire` change
    }, [homeDetails, actualiseCommentaire]);


    const deleteComment = async ({ commentId }) => {
        try {
            const response = await axios.delete(`/home-commentaires/${commentId}`);
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

            {homeDetails && (

                <motion.div className='container homeDetails'
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >


                    <motion.div className="productHead"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >

                        <motion.h1> {homeDetails.titre} </motion.h1>

                        <motion.div className="sousTitre"
                            initial='offscreen'
                            animate='onscreen'
                            viewport={{ once: false, amount: 0.2 }}
                            variants={containerVariants}
                            transition={{ staggerChildren: 0.5 }}>
                            <motion.div className="left-box"
                                initial='offscreen'
                                animate='onscreen'
                                viewport={{ once: false, amount: 0.2 }}
                                variants={containerVariants}
                                transition={{ staggerChildren: 0.5 }}
                            >
                                <motion.a href={`https://maps.google.com/?q=${homeDetails.pays} ${homeDetails.ville} ${homeDetails.commune} ${homeDetails.quartier} ${homeDetails.nomRue} `} target='_blank'>
                                    <ion-icon name="location-outline"></ion-icon>
                                    {homeDetails.ville} {` - ${homeDetails.commune}`} {homeDetails.quartier} {homeDetails.nomRue}{` | ${homeDetails.pays}`}
                                </motion.a>
                                <motion.span className="nombreDeLike">
                                    {homeDetails.favories.length}
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
                            <img src={`http://localhost:5000/medias/${homeDetails.images[0]}`} alt={homeDetails.titre} loading="lazy" />
                        </motion.div>
                        <motion.div className="productImg small">
                            <img src={`http://localhost:5000/medias/${homeDetails.images[1]}`} alt={homeDetails.titre} loading="lazy" />
                        </motion.div>
                        <motion.div className="productImg small">
                            <img src={`http://localhost:5000/medias/${homeDetails.images[2]}`} alt={homeDetails.titre} loading="lazy" />
                        </motion.div>
                        <motion.div className="productImg small">
                            <img src={`http://localhost:5000/medias/${homeDetails.images[3]}`} alt={homeDetails.titre} loading="lazy" />
                        </motion.div>
                        <motion.div className="productImg small">
                            <img src={`http://localhost:5000/medias/${homeDetails.images[4]}`} alt={homeDetails.titre} loading="lazy" />
                        </motion.div>

                        <motion.button className="allImage glass" onClick={showImages}>
                            <ion-icon name="images-outline"></ion-icon>
                            Toutes les images
                        </motion.button>
                    </motion.div>

                    {images && (
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
                                {homeDetails.images.map((image, index) => (
                                    <motion.div className="AllImagesConetent"
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        <motion.img key={index} src={`http://localhost:5000/medias/${image}`} alt={`Image ${index + 1}`} loading="lazy" />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}

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
                                    onClick={() => toggleUserDetail(homeDetails.owner)}
                                    className="shadow"
                                    src={homeDetails.owner.photo ? `http://localhost:5000/${homeDetails.owner.photo}` : avatar}
                                    alt="Profil"
                                    loading="lazy"
                                />
                                <motion.h2>Publie par {homeDetails.owner.nom} </motion.h2>
                                {homeDetails.owner.verifie ? (<ion-icon name="shield-checkmark" onClick={() => toggleUserDetail(homeDetails.owner)}></ion-icon>) : ('')}


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
                                                    {homeDetails.owner.isAdmin && (<h4> +{selectedUser.prefixe}{selectedUser.numero}</h4>)}
                                                    {homeDetails.owner.isAdmin === false && (<h4> {selectedUser.lieu}</h4>)}
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

                                                {homeDetails.owner.isAdmin && selectedUser.lieu ? (
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

                            <motion.div className="typePropieteContainer">

                                {homeDetails.typePropiete.map((typePropiete, index) => (
                                    <motion.div className="typePropiete"
                                        key={index}
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        {typePropiete.includes('Maison')}
                                        {typePropiete.includes('Appartement')}
                                        {typePropiete.includes('Appartement meublé')}
                                        {typePropiete.includes('Résidence')}
                                        {typePropiete.includes('Bureau')}
                                        {typePropiete.includes('Hotel')}
                                        {typePropiete.includes('Motel')}
                                        {typePropiete.includes('Salle d\'evenement')}
                                        {typePropiete.includes('Entrepôt')}
                                        {typePropiete.includes('Magasin')}
                                        {typePropiete.includes('Restaurant')}
                                        {typePropiete.includes('Parc')}
                                        {typePropiete.includes('Salle de sport')}
                                        {typePropiete.includes('Café')}
                                        {typePropiete.includes('Terrain')}

                                        <motion.h4>{index === homeDetails.typePropiete.length - 1 && `- ${homeDetails.typePropiete}`}</motion.h4>

                                    </motion.div>
                                ))}

                                {homeDetails.standing && (<h4>`- {homeDetails.standing}` </h4>)}


                            </motion.div>

                            <motion.div className="productDescription"
                                initial='offscreen'
                                animate='onscreen'
                                viewport={{ once: false, amount: 0.2 }}
                                variants={containerVariants}
                                transition={{ staggerChildren: 0.5 }}
                            >

                                {homeDetails.commodite !== '' &&
                                    <motion.div className="box"
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        <motion.h3>Commodites et equipement</motion.h3>

                                        <motion.div className="commodites"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >

                                            {homeDetails.commodite.map(commodite => (
                                                <motion.span className='item card-raduis shadow' key={commodite}>
                                                    {commodite.includes('TV') && <ion-icon name="tv-outline"></ion-icon>}
                                                    {commodite.includes('Wi-Fi') && <ion-icon name="wifi-outline"></ion-icon>}
                                                    {commodite.includes('Camera') && <ion-icon name="videocam-outline"></ion-icon>}
                                                    {commodite.includes('Climatisation') && <ion-icon name="snow-outline"></ion-icon>}
                                                    {commodite.includes('Réfrigérateur') && <ion-icon name="snow-outline"></ion-icon>}
                                                    {commodite.includes('Coffre-fort') && <ion-icon name="lock-closed-outline"></ion-icon>}
                                                    {commodite.includes('Salle de bains privative') && <ion-icon name="water-outline"></ion-icon>}
                                                    {commodite.includes('Serviettes et linge de lit') && <ion-icon name="bed-outline"></ion-icon>}
                                                    {commodite.includes('Service de chambre') && <ion-icon name="cart-outline"></ion-icon>}
                                                    {commodite.includes('Petit-déjeuner inclus') && <ion-icon name="cafe-outline"></ion-icon>}
                                                    {commodite.includes('Piscine') && <ion-icon name="water-outline"></ion-icon>}
                                                    {commodite.includes('Centre de remise en forme') && <ion-icon name="fitness-outline"></ion-icon>}
                                                    {commodite.includes('Restaurant') && <ion-icon name="restaurant-outline"></ion-icon>}
                                                    {commodite.includes('Blanchisserie') && <ion-icon name="basket-outline"></ion-icon>}
                                                    {commodite.includes('Réception 24h/24') && <ion-icon name="business-outline"></ion-icon>}
                                                    {commodite.includes('Parking') && <ion-icon name="car-outline"></ion-icon>}
                                                    {commodite.includes('Service de navette') && <ion-icon name="bus-outline"></ion-icon>}
                                                    {commodite.includes('Cuisine équipée') && <ion-icon name="microwave-outline"></ion-icon>}
                                                    {commodite.includes('Machine à laver') && <ion-icon name="hardware-chip-outline"></ion-icon>}
                                                    {commodite.includes('Sèche-linge') && <ion-icon name="hardware-chip-outline"></ion-icon>}
                                                    {commodite.includes('Fer et planche à repasser') && <ion-icon name="hammer-outline"></ion-icon>}
                                                    {commodite.includes('Jardin ou terrasse') && <ion-icon name="leaf-outline"></ion-icon>}
                                                    {commodite.includes('Barbecue') && <ion-icon name="flame-outline"></ion-icon>}
                                                    {commodite.includes('Espace de stationnement') && <ion-icon name="car-sport-outline"></ion-icon>}
                                                    {commodite.includes('Jacuzzi ou bain à remous') && <ion-icon name="water-outline"></ion-icon>}
                                                    {commodite.includes('Système de sécurité') && <ion-icon name="shield-checkmark-outline"></ion-icon>}
                                                    {commodite.includes('Bureau et chaise de travail') && <ion-icon name="briefcase-outline"></ion-icon>}
                                                    {commodite.includes('Téléphone') && <ion-icon name="call-outline"></ion-icon>}
                                                    {commodite.includes('Salle de réunion ou salle de conférence') && <ion-icon name="business-outline"></ion-icon>}
                                                    {commodite.includes('Espace de rangement') && <ion-icon name="albums-outline"></ion-icon>}
                                                    {commodite.includes('Imprimante, scanner ou photocopieuse') && <ion-icon name="print-outline"></ion-icon>}
                                                    {commodite.includes('Kitchenette') && <ion-icon name="microwave-outline"></ion-icon>}
                                                    {commodite.includes('Espace de détente') && <ion-icon name="happy-outline"></ion-icon>}
                                                    {commodite.includes('Toilettes et lavabo privés') && <ion-icon name="water-outline"></ion-icon>}
                                                    {commodite.includes('Services de secrétariat') && <ion-icon name="business-outline"></ion-icon>}
                                                    {commodite.includes('Accès facile aux transports en commun') && <ion-icon name="bus-outline"></ion-icon>}
                                                    {commodite.includes('Espace extérieur') && <ion-icon name="sunny-outline"></ion-icon>}
                                                    <h5>{commodite}</h5>
                                                </motion.span>
                                            ))}

                                        </motion.div>
                                    </motion.div>

                                }

                                {homeDetails.description !== '' &&
                                    <motion.div className="box"
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        <motion.h3>Description</motion.h3>
                                        <motion.p> {homeDetails.description} </motion.p>
                                    </motion.div>
                                }


                                {homeDetails.video.length > 0 && (
                                    <motion.div className="video box">
                                        <motion.video controls preload>
                                            <source src={`http://localhost:5000/medias/${homeDetails.video[0]}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </motion.video>
                                    </motion.div>
                                )}
                                {homeDetails.condition !== '' && (
                                    <motion.div className="box">
                                        <motion.h3>Les conditions</motion.h3>
                                        <motion.p> {homeDetails.condition} </motion.p>
                                    </motion.div>
                                )}

                                {homeDetails.problemePermis !== '' && (
                                    <motion.div className="box">
                                        <motion.h3>A prendre en compte</motion.h3>
                                        <motion.p> {homeDetails.problemePermis} </motion.p>
                                    </motion.div>

                                )}

                            </motion.div>
                        </motion.div>

                        <motion.div className={`right-box card-raduis ${homeDetails.duree === 'Le mois' ? 'right-box-resize' : ''}`}>

                            <motion.div className="right-box-item card-raduis shadow">

                                <motion.div className="prixDureeNote">

                                    <motion.div className="prixDuree"
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        <motion.div className="prix">
                                            {numeral(homeDetails.prix).format('0,0').replace(/,/g, ' ')} <span>FCFA</span>
                                        </motion.div>

                                        {homeDetails.duree !== '' && (
                                            <>
                                                <motion.span>/</motion.span>
                                                <motion.div className="duree">
                                                    {homeDetails.duree}
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
                                        <Link target="_blank" to={`https://api.whatsapp.com/send?phone=2250706223380&text=Je suis intéressé par votre: ${homeDetails.titre}, Lieu : ${homeDetails.ville} ${homeDetails.commune} ${homeDetails.quartier} ${homeDetails.nomRue}, Qui coûte: ${homeDetails.prix} Fcfa.  ${window.location.href}`}><ion-icon name="logo-whatsapp"></ion-icon> WhatsApp</Link>
                                    </motion.div>
                                </motion.div>

                                <motion.form onSubmit={homeBooking}
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.div className="inputGroup">
                                        <motion.label htmlFor="">Nom et Prénom</motion.label>
                                        <motion.input
                                            type="text"
                                            placeholder="Ahmed konaté"
                                            value={homeBookData.nom}
                                            onChange={(e) => setHomeBookData({ ...homeBookData, nom: e.target.value })}
                                        />
                                    </motion.div>
                                    <motion.div className="inputGroup">
                                        <motion.label htmlFor="">Votre numéro de téléphone</motion.label>
                                        <motion.input
                                            type="text"
                                            placeholder="+225 0706223300"
                                            value={homeBookData.numero}
                                            onChange={(e) => setHomeBookData({ ...homeBookData, numero: e.target.value })}
                                        />
                                    </motion.div>
                                    <motion.div className="inputGroup">
                                        <motion.label htmlFor="">Votre adresse email</motion.label>
                                        <motion.input
                                            type="email"
                                            placeholder="konateahmed@gmail.com"
                                            value={homeBookData.email}
                                            onChange={(e) => setHomeBookData({ ...homeBookData, email: e.target.value })}
                                        />
                                    </motion.div>

                                    {homeDetails.typePlacement !== 'En vente' && homeDetails.duree !== 'Le mois' && (
                                        <>
                                            <motion.div className="inputGroup">
                                                <motion.label htmlFor="dateArrive">Date d'arrivée</motion.label>
                                                <motion.input
                                                    type="date"
                                                    id="dateArrive"
                                                    value={homeBookData.dateArrive}
                                                    onChange={(e) => setHomeBookData({ ...homeBookData, dateArrive: e.target.value })}
                                                />
                                            </motion.div>
                                            <motion.div className="inputGroup">
                                                <motion.label htmlFor="dateDepart">Date de départ</motion.label>
                                                <motion.input
                                                    type="date"
                                                    id="dateDepart"
                                                    value={homeBookData.dateDepart}
                                                    onChange={(e) => setHomeBookData({ ...homeBookData, dateDepart: e.target.value })}
                                                />
                                            </motion.div>
                                        </>
                                    )}

                                    <motion.button type="submit">
                                        <motion.span>
                                            {homeDetails.typePlacement === 'En vente' || homeDetails.duree === 'Le mois' ? 'Intéressé(e)' : 'Réserver'}
                                        </motion.span>
                                    </motion.button>

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
                                                <motion.div className="nomEtDate">
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

                        <motion.div className="commentaireForme"
                            initial='offscreen'
                            animate='onscreen'
                            viewport={{ once: false, amount: 0.2 }}
                            variants={containerVariants}
                            transition={{ staggerChildren: 0.5 }}
                        >
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

                    {allHomes.length > 0 && (

                        <motion.div className="autresProposition"
                            initial='offscreen'
                            animate='onscreen'
                            viewport={{ once: false, amount: 0.2 }}
                            variants={containerVariants}
                            transition={{ staggerChildren: 0.5 }}
                        >
                            <motion.h3>Autres propositions</motion.h3>

                            <motion.div className="autre">
                                {allHomes.map((home) => (
                                    // Vérifiez si l'ID du bien est différent de l'ID du bien actuellement affiché (homeDetails)
                                    <ProductCard key={home._id}>
                                        <Link to={`/home-details/${home._id}`} onClick={refreshPage}>
                                            <motion.img className='card-img card-raduis' src={`http://localhost:5000/medias/${home.images[0]}`} alt={home.titre} loading="lazy" />
                                            <motion.div className="infos"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >
                                                <motion.h2>{home.titre}</motion.h2>
                                                <motion.h5>{home.typePropiete}</motion.h5>
                                                <motion.div className="lieu">
                                                    <ion-icon name="location-outline"></ion-icon>
                                                    {home.ville} {home.commune}
                                                </motion.div>
                                                <motion.div className="prix">
                                                    {numeral(home.prix).format('0,0').replace(/,/g, ' ')} <span>FCFA</span>
                                                </motion.div>

                                            </motion.div>
                                        </Link>
                                    </ProductCard>
                                ))}
                            </motion.div>
                        </motion.div>

                    )}

                </motion.div >
            )
            }

            <Footer />

        </>
    )
}
