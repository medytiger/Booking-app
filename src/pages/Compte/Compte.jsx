
import React, { useContext, useEffect, useState } from 'react'
import './Compte.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Link, useLocation, Outlet, Navigate } from 'react-router-dom'
import avatar from '../../assets/avatar.jpg'

import Button from '../../widgets/Button/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../userContext/userContext'
import { CarHomeDataContext } from '../../AddDataContext/AddDataContext'
import axios from 'axios'
import { motion } from 'framer-motion'
import Loader from '../../components/Loader/Loader'
import numeral from 'numeral'



export default function Compte() {

    const { user, setUser, ready } = useContext(UserContext);

    if (!ready) {
        return <Loader />
    }

    if (!user) {
        return <Navigate to={'/'} />
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

    const path = window.location.pathname;
    const parts = path.split('/');
    const location = useLocation();
    const lastPart = parts[parts.length - 1];
    const [allHomesLike, setAllHomesLike] = useState([]);
    const [allCarsLike, setAllCarsLike] = useState([]);
    const [myHomes, setMyHomes] = useState([]);
    const [myCars, setMyCars] = useState([]);
    const [maisonReservee, setMaisonReservee] = useState([]);
    const [automobileReserve, setAutomobileReserve] = useState([]);
    const [maReservationMaison, setMaReservationMaison] = useState([]);
    const [maReservationAutomobile, setMaReservationAutomobile] = useState([]);
    const [annonces, setAnnonces] = useState([]);
    const [actualiseHome, setActualiseHome] = useState(false);
    const [actualiseCar, setActualiseCar] = useState(false);
    const [actualiseReservation, setActualiseReservation] = useState(false);
    const [favories, setFavories] = useState(false);
    const [resizeMenu, setResizeMenu] = useState(false);


    const {
        addModalVisible, setAddModalVisible,
        addFormStep,
        setAddFormStep,
        homeStepVisible,
        carStepVisible,
        addCar,
        addImmobilier,
        secteur,
    } = useContext(CarHomeDataContext);

    useEffect(() => {
        axios.get('/ma-reservation-maison')
            .then(response => {
                setMaReservationMaison(response.data);
                setActualiseHome(!actualiseHome)
            })
            .catch(error => {
                toast.error(error);
            });
    }, [actualiseReservation]);

    useEffect(() => {
        axios.get('/ma-reservation-automobile')
            .then(response => {
                setMaReservationAutomobile(response.data);
                setActualiseCar(!actualiseCar)
            })
            .catch(error => {
                toast.error(error);
            });
    }, [actualiseReservation]);

    useEffect(() => {
        async function fetchMyHomes() {
            try {
                const response = await axios.get('/mes-immobiliers');
                setMyHomes(response.data);
            } catch (error) {
                toast.error("Une erreur est survenue lors de la récupération de vos biens immobiliers");
            }
        }

        fetchMyHomes();
    }, []);

    useEffect(() => {
        async function fetchMyCars() {
            try {
                const response = await axios.get('/mes-automobiles');
                setMyCars(response.data);
            } catch (error) {
                toast.error("Une erreur est survenue lors de la récupération de vos biens automobile");
            }
        }

        fetchMyCars();
    }, []);

    useEffect(() => {
        axios.get('/mes-maisons-reservee')
            .then(response => {
                setMaisonReservee(response.data);
            })
            .catch(error => {
                toast.error(error);
            });
    }, [actualiseReservation]);

    useEffect(() => {
        axios.get('/mes-voitures-reservee')
            .then(response => {
                setAutomobileReserve(response.data);
            })
            .catch(error => {
                toast.error(error);
            });
    }, [actualiseReservation]);


    const showAddModal = () => {
        setAddFormStep(0)
        setAddModalVisible(!addModalVisible);
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");

        if (confirmed) {
            try {
                await axios.delete(`/user/${user._id}`);
                toast.success('Compte supprimé avec succès.');
                // Redirection après suppression
                window.location.href = '/';
                setUser('');
            } catch (error) {
                toast.error('Une erreur est survenue lors de la suppression de l\'utilisateur.');
            }
        }
    };




    const deleteHomeBooking = async (bookingId) => {
        try {
            // Envoyez une requête DELETE vers l'endpoint approprié avec l'ID de la réservation
            const response = await axios.delete(`/homeBooking/${bookingId}`);

            // Vérifiez si la suppression a réussi
            if (response.status === 200) {
                // La réservation a été supprimée avec succès
                toast.success('La réservation a été supprimée avec succès.');
                setActualiseReservation(!actualiseReservation)
                // Vous pouvez également mettre à jour votre interface utilisateur en conséquence,
                // par exemple en supprimant la réservation de la liste des réservations affichées.
            } else {
                toast.error('Une erreur est survenue lors de la suppression de la réservation.');
            }
        } catch (error) {
            if (error.response) {
                // Si l'erreur provient du serveur (status code >= 400)
                const errorMessage = error.response.data.error;
                toast.error(errorMessage);
            } else {
                // Si une autre erreur se produit (par exemple, une erreur de connexion au serveur)
                toast.error(error);
                toast.error('Une erreur est survenue lors de la suppression de la réservation. Veuillez réessayer plus tard.');
            }
        }
    };

    const handleDeleteHomeBooking = (bookingId) => {
        if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
            deleteHomeBooking(bookingId);
        }
    };

    const deleteCarBooking = async (bookingId) => {
        try {
            // Envoyez une requête DELETE vers l'endpoint approprié avec l'ID de la réservation
            const response = await axios.delete(`/carBooking/${bookingId}`);

            // Vérifiez si la suppression a réussi
            if (response.status === 200) {
                // La réservation a été supprimée avec succès
                toast.success('La réservation a été supprimée avec succès.');
                setActualiseReservation(!actualiseReservation)
                // Vous pouvez également mettre à jour votre interface utilisateur en conséquence,
                // par exemple en supprimant la réservation de la liste des réservations affichées.
            } else {
                toast.error('Une erreur est survenue lors de la suppression de la réservation.');
            }
        } catch (error) {
            if (error.response) {
                // Si l'erreur provient du serveur (status code >= 400)
                const errorMessage = error.response.data.error;
                toast.error(errorMessage);
            } else {
                // Si une autre erreur se produit (par exemple, une erreur de connexion au serveur)
                toast.error(error);
                toast.error('Une erreur est survenue lors de la suppression de la réservation. Veuillez réessayer plus tard.');
            }
        }
    };

    const handleDeleteCarBooking = (bookingId) => {
        if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
            deleteCarBooking(bookingId);
        }
    };

    useEffect(() => {
        const fetchAnnonces = async () => {
            try {
                const response = await axios.get('/annonces');
                const sortedAnnonces = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setAnnonces(sortedAnnonces);
            } catch (error) {
                toast.error(error);
            }
        };

        fetchAnnonces();
    }, []);


    async function fetchData() {
        try {
            // Récupération de toutes les données (biens immobiliers et automobiles)
            const homesResponse = await axios.get('/immobiliers');
            const carsResponse = await axios.get('/automobiles');

            if (homesResponse.status === 200 && carsResponse.status === 200) {
                const allHome = homesResponse.data;
                const allCar = carsResponse.data;

                // Filtrer les biens likés par l'utilisateur
                const userLikedHomes = allHome.filter((item) =>
                    item.favories.includes(user._id)
                );
                const userLikedallCars = allCar.filter((item) =>
                    item.favories.includes(user._id)
                );

                // Mettre à jour l'état likedHomes avec les biens likés par l'utilisateur
                setAllHomesLike(userLikedHomes);
                setAllCarsLike(userLikedallCars);

            } else {
                toast.error('Une erreur est survenue lors de la récupération des données');
            }
        } catch (error) {
            toast.error('Une erreur est survenue lors de la récupération des données');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const showFavorieModal = () => {
        setFavories(!favories);
    };

    const showMenuLink = () => {
        setResizeMenu(!resizeMenu);
    };


    return (
        <>
            <Navbar />
            <div className="container comptePage">

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

                <motion.div className="compteContainer"
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <motion.h1>{lastPart}</motion.h1>

                    <div className="compteContent">

                        <motion.div className="compteSide "
                            initial='offscreen'
                            animate='onscreen'
                            viewport={{ once: false, amount: 0.2 }}
                            variants={containerVariants}
                            transition={{ staggerChildren: 0.5 }}
                        >
                            <motion.div className="sideHead shadow card-raduis"
                                initial='offscreen'
                                animate='onscreen'
                                viewport={{ once: false, amount: 0.2 }}
                                variants={containerVariants}
                                transition={{ staggerChildren: 0.5 }}
                            >
                                <motion.img className='shadow card-raduis' src={user.photo ? `http://localhost:5000/${user.photo}` : avatar} alt="Profil" loading="lazy" />
                                <motion.div className="userInfos">

                                    {user && (
                                        <motion.h2>{user.nom}</motion.h2>
                                    )}
                                    <motion.span>
                                        {user && (
                                            <> {user.email} </>
                                        )}
                                    </motion.span>
                                    <Link className='link' to='/profil'>Aller au profil</Link >
                                </motion.div>
                            </motion.div>

                            <motion.button className="add shadow card-raduis" onClick={showAddModal}>
                                <ion-icon name="add-outline"></ion-icon>
                                Ajouter un bien
                            </motion.button>
                            {user.isAdmin && (

                                <Link to='/dashboard' className="dashbord shadow card-raduis">
                                    <ion-icon name="today-outline"></ion-icon>
                                    Aller au tableau de bord
                                </Link>
                            )}

                            <motion.div className={`sideOutlet shadow card-raduis  ${resizeMenu ? "resizeMenu" : ""}`}
                                initial='offscreen'
                                animate='onscreen'
                                viewport={{ once: false, amount: 0.2 }}
                                variants={containerVariants}
                                transition={{ staggerChildren: 0.5 }}
                            >
                                <motion.span className='sideOutletMenu' onClick={() => showMenuLink()}>MENU {resizeMenu ? <ion-icon name="close-outline"></ion-icon> : <ion-icon name="menu-outline"></ion-icon>} </motion.span>
                                <Link to="/compte" className='outfitLink' onClick={() => showMenuLink()}><ion-icon name="person-outline"></ion-icon>Compte</Link>
                                <Link to="/compte/proprietes" className='outfitLink' onClick={() => showMenuLink()}><ion-icon name="storefront-outline"></ion-icon>Mes Propriétés</Link>
                                <Link to="/compte/reservations" className='outfitLink' onClick={() => showMenuLink()}><ion-icon name="bookmarks-outline"></ion-icon>Réservations</Link>
                                <Link to="/compte/securite" className='outfitLink' onClick={() => showMenuLink()}><ion-icon name="key-outline"></ion-icon>Connexion et Sécurité</Link>
                                <Link to="/compte/facturation" className='outfitLink' onClick={() => showMenuLink()}><ion-icon name="card-outline"></ion-icon>Facturation et payement</Link>
                                <Link to="/compte/notification" className='outfitLink' onClick={() => showMenuLink()}> <ion-icon name="alert-circle-outline"></ion-icon>Notification</Link>
                                <Link to="/compte/confidentialite" className='outfitLink' onClick={() => showMenuLink()}><ion-icon name="eye-off-outline"></ion-icon>Confidentialité</Link>
                                <Link to="/compte/aide" className='outfitLink' onClick={() => showMenuLink()}><ion-icon name="help-outline"></ion-icon>Aide</Link>
                                <motion.button className='supprimer card-raduis' onClick={handleDelete}>Supprimer le compte</motion.button>
                            </motion.div>

                        </motion.div>

                        {location.pathname === '/compte' ? (
                            <motion.div className="compteItem"
                                initial='offscreen'
                                animate='onscreen'
                                viewport={{ once: false, amount: 0.2 }}
                                variants={containerVariants}
                                transition={{ staggerChildren: 0.5 }}
                            >

                                <motion.div className="items "
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.div className="item one shadow card-raduis"
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        <motion.h2>Produits et reservations</motion.h2>
                                        <motion.div className="userProduct"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            <motion.div className="produitLength card-raduis">
                                                {myHomes.length + myCars.length}
                                                {myHomes.length + myCars.length > 1 ? (<span>Biens</span>) : (<span>Bien</span>)}
                                            </motion.div>
                                            <motion.div className="reservationLength card-raduis">
                                                {maisonReservee.length + automobileReserve.length}
                                                {maisonReservee.length + automobileReserve.length > 1 ? (<span>Biens réserves</span>) : (<span>Bien réserve</span>)}
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>

                                </motion.div>

                                <motion.div className="items"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >

                                    {maReservationMaison.length > 0 || maReservationAutomobile.length > 0 ? (
                                        <motion.div className="item maReservation shadow card-raduis"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            <motion.h2>Mes reservations</motion.h2>

                                            <motion.div className="reservationContainer"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >

                                                <motion.div className="reservation">
                                                    {maReservationMaison.map((reservation) => (
                                                        <motion.div className='reservationContent'>
                                                            <motion.button onClick={() => handleDeleteHomeBooking(reservation._id)} className='annulerMaReservation'>
                                                                Annuler
                                                            </motion.button>
                                                            <Link to={`/home-details/${reservation.home._id}`} key={reservation._id} className="reservationCard shadow card-raduis">
                                                                <motion.div className="img"
                                                                    initial='offscreen'
                                                                    animate='onscreen'
                                                                    viewport={{ once: false, amount: 0.2 }}
                                                                    variants={containerVariants}
                                                                    transition={{ staggerChildren: 0.5 }}
                                                                >
                                                                    <motion.img src={`http://localhost:5000/medias/${reservation.home.images[0]}`} alt={`${reservation.home.titre}`} loading="lazy" />
                                                                </motion.div>
                                                                <motion.div className="reservationInfos "
                                                                    initial='offscreen'
                                                                    animate='onscreen'
                                                                    viewport={{ once: false, amount: 0.2 }}
                                                                    variants={containerVariants}
                                                                    transition={{ staggerChildren: 0.5 }}
                                                                >
                                                                    <motion.span className='titre'>{reservation.home.titre}</motion.span>
                                                                    <motion.span className='ville'>{reservation.home.ville} {reservation.home.commune} {reservation.home.quartier}</motion.span>
                                                                    <motion.span className='prix'>{numeral(reservation.home.prix).format('0,0').replace(/,/g, ' ')} FCFA / {reservation.home.duree}</motion.span>
                                                                </motion.div>

                                                            </Link>
                                                        </motion.div>

                                                    ))}
                                                </motion.div>

                                                <motion.div className="reservation"
                                                    initial='offscreen'
                                                    animate='onscreen'
                                                    viewport={{ once: false, amount: 0.2 }}
                                                    variants={containerVariants}
                                                    transition={{ staggerChildren: 0.5 }}
                                                >
                                                    {maReservationAutomobile.map((reservation) => (
                                                        <motion.div className='reservationContent'>
                                                            <motion.button onClick={() => handleDeleteCarBooking(reservation._id)} className='annulerMaReservation'>
                                                                Annuler
                                                            </motion.button>
                                                            <Link to={`/car-details/${reservation.automobile._id}`} key={reservation._id} className="reservationCard shadow card-raduis">
                                                                <motion.div className="img"
                                                                    initial='offscreen'
                                                                    animate='onscreen'
                                                                    viewport={{ once: false, amount: 0.2 }}
                                                                    variants={containerVariants}
                                                                    transition={{ staggerChildren: 0.5 }}
                                                                >
                                                                    <motion.img src={`http://localhost:5000/medias/${reservation.automobile.images[0]}`} alt={`${reservation.automobile.titre}`} loading="lazy" />
                                                                </motion.div>
                                                                <motion.div className="reservationInfos "
                                                                    initial='offscreen'
                                                                    animate='onscreen'
                                                                    viewport={{ once: false, amount: 0.2 }}
                                                                    variants={containerVariants}
                                                                    transition={{ staggerChildren: 0.5 }}
                                                                >
                                                                    <motion.span className='titre'>{reservation.automobile.marque}</motion.span>
                                                                    <motion.span className='ville'>{reservation.automobile.ville} {reservation.automobile.commune} {reservation.automobile.quartier}</motion.span>
                                                                    <motion.span className='prix'>{numeral(reservation.automobile.prix).format('0,0').replace(/,/g, ' ')} FCFA / {reservation.automobile.duree}</motion.span>

                                                                </motion.div>
                                                            </Link>
                                                        </motion.div>
                                                    ))}
                                                </motion.div>

                                            </motion.div>

                                        </motion.div>
                                    ) : ''}

                                </motion.div>

                                <motion.div className="items">
                                    {annonces.length > 0 && (
                                        <>
                                            <motion.div className="item shadow card-raduis"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >
                                                <motion.h2>Actualité</motion.h2>

                                                <motion.div className="notificationContainer"
                                                    initial='offscreen'
                                                    animate='onscreen'
                                                    viewport={{ once: false, amount: 0.2 }}
                                                    variants={containerVariants}
                                                    transition={{ staggerChildren: 0.5 }}
                                                >
                                                    <motion.ul>
                                                        {annonces.map((annonce) => (
                                                            <motion.li className='card-raduis' key={annonce._id}
                                                                initial='offscreen'
                                                                animate='onscreen'
                                                                viewport={{ once: false, amount: 0.2 }}
                                                                variants={containerVariants}
                                                                transition={{ staggerChildren: 0.5 }}
                                                            >
                                                                <motion.span className='typeBien card-raduis'> {annonce.type} </motion.span>

                                                                <>
                                                                    <motion.p>Zone : <strong>{annonce.lieu} </strong>avec un budget de : <strong>{annonce.budget}</strong> FCFA </motion.p>
                                                                    <motion.p>{annonce.description}</motion.p>
                                                                    <motion.div className=""
                                                                        initial='offscreen'
                                                                        animate='onscreen'
                                                                        viewport={{ once: false, amount: 0.2 }}
                                                                        variants={containerVariants}
                                                                        transition={{ staggerChildren: 0.5 }}
                                                                    >
                                                                        <motion.span>Publié par {annonce.nom} </motion.span>
                                                                        <motion.span className='dateDePublication'>le {new Date(annonce.createdAt).toLocaleDateString()}</motion.span>
                                                                        <motion.p>Email: {annonce.email} </motion.p>
                                                                        <motion.p>Numéro: {annonce.numero} </motion.p>
                                                                    </motion.div>
                                                                </>

                                                            </motion.li>
                                                        ))}
                                                    </motion.ul>
                                                </motion.div>
                                            </motion.div>
                                        </>
                                    )}
                                </motion.div>

                            </motion.div>
                        ) : (
                            <div className="compteMain">
                                <Outlet />
                            </div>
                        )}

                        {location.pathname === '/compte' ? (
                            <>
                                {allHomesLike.length > 0 || allCarsLike.length > 0 ? (
                                    <motion.div className='favories shadow card-raduis'
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        <motion.h2>Favories</motion.h2>
                                        {allHomesLike.map((home) => (
                                            <Link to={`/home-details/${home._id}`} className="homeliked" key={home._id}>
                                                <motion.div className="homelikedImg item-raduis">
                                                    <motion.img className='photoProfil' src={`http://localhost:5000/medias/${home.images[0]}`} alt={home.titre} loading="lazy" />
                                                </motion.div>
                                                <motion.div className="homeLikedInfos">
                                                    <motion.div className='favorieTitre'>{home.titre}</motion.div>
                                                    <motion.div className='favoriePrix'>{numeral(home.prix).format('0,0').replace(/,/g, ' ')} FCFA</motion.div>
                                                </motion.div>
                                            </Link>
                                        ))}
                                        {allCarsLike.map((car) => (
                                            <Link to={`/car-details/${car._id}`} className="homeliked" key={car._id}>
                                                <motion.div className="homelikedImg item-raduis">
                                                    <motion.img className='photoProfil' src={`http://localhost:5000/medias/${car.images[0]}`} alt={car.marque} loading="lazy" />
                                                </motion.div>
                                                <motion.div className="homeLikedInfos">
                                                    <motion.div className='favorieTitre'>{car.marque}</motion.div>
                                                    <motion.div className='favoriePrix'>{numeral(car.prix).format('0,0').replace(/,/g, ' ')} FCFA</motion.div>
                                                </motion.div>
                                            </Link>
                                        ))}
                                        <button onClick={() => showFavorieModal()}>Tout voir</button>
                                    </motion.div>
                                ) : (
                                    ''
                                )}
                                {favories && (
                                    <motion.div className="allFavories"
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        {allHomesLike.length > 0 || allCarsLike.length > 0 ? (
                                            <>
                                                <motion.span onClick={() => showFavorieModal()}><ion-icon name="close-outline"></ion-icon></motion.span>
                                                <motion.div className='favories  card-raduis'>
                                                    {allHomesLike.map((home) => (

                                                        <Link to={`/home-details/${home._id}`} className="homeliked card-raduis" key={home._id}>
                                                            <motion.div className="homelikedImg item-raduis">
                                                                <motion.img className='photoProfil' src={`http://localhost:5000/medias/${home.images[0]}`} alt={home.titre} loading="lazy" />
                                                            </motion.div>
                                                            <motion.div className="homeLikedInfos"
                                                                initial='offscreen'
                                                                animate='onscreen'
                                                                viewport={{ once: false, amount: 0.2 }}
                                                                variants={containerVariants}
                                                                transition={{ staggerChildren: 0.5 }}
                                                            >
                                                                <motion.div className='favorieTitre'>{home.titre}</motion.div>
                                                                <motion.div className='favoriePrix'>{numeral(home.prix).format('0,0').replace(/,/g, ' ')} FCFA</motion.div>
                                                            </motion.div>
                                                        </Link>
                                                    ))}
                                                    {allCarsLike.map((car) => (
                                                        <Link to={`/car-details/${car._id}`} className="homeliked card-raduis" key={car._id}>
                                                            <motion.div className="homelikedImg item-raduis">
                                                                <motion.img className='photoProfil' src={`http://localhost:5000/medias/${car.images[0]}`} alt={car.marque} loading="lazy" />
                                                            </motion.div>
                                                            <motion.div className="homeLikedInfos"
                                                                initial='offscreen'
                                                                animate='onscreen'
                                                                viewport={{ once: false, amount: 0.2 }}
                                                                variants={containerVariants}
                                                                transition={{ staggerChildren: 0.5 }}
                                                            >
                                                                <motion.div className='favorieTitre'>{car.marque}</motion.div>
                                                                <motion.div className='favoriePrix'>{numeral(car.prix).format('0,0').replace(/,/g, ' ')} FCFA</motion.div>
                                                            </motion.div>
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            </>
                                        ) : (
                                            ''
                                        )}
                                    </motion.div>
                                )}
                            </>

                        ) : ('')}

                    </div>
                </motion.div>

            </div>


            <div className={`addForm container  ${addModalVisible ? "activeAddForm" : ""}`}>

                <div className="barreContainer">
                    <div className="barre btn-raduis">
                        <div className=
                            {`barrePourcentage 
                                ${addFormStep == 0 ? 'etapeZero' : ''} 
                                ${addFormStep == 1 ? 'etapeUn' : ''} 
                                ${addFormStep == 2 ? 'etapeDeux' : ''}
                                ${addFormStep == 3 ? 'etapeTrois' : ''}
                                ${addFormStep == 4 ? 'etapeQuatre' : ''}
                                ${addFormStep == 5 ? 'etapeCinq' : ''}
                                ${addFormStep == 6 ? 'etapeSix' : ''}
                                ${addFormStep == 7 ? 'etapeSept' : ''}
                                ${addFormStep == 8 ? 'etapeHuite' : ''}
                            `}
                        >
                        </div>
                    </div>
                </div>

                <div className="formContainer  ">

                    <motion.div className="addFormLeftBox">

                        {secteur === "L'industrie automobile" ? (
                            <>
                                {addFormStep == 0 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            Veuillez sélectionner le secteur d'activité qui correspond le mieux à votre produit.
                                            Utilisez les boutons pour choisir entre "L'industrie automobile" et "L'immobilier".
                                        </motion.h1>
                                        <motion.p>
                                            Une fois votre choix effectué, cliquez sur le bouton "Suivant" pour continuer.
                                        </motion.p>
                                    </>
                                }
                                {addFormStep == 1 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            Nous sommes ravis de vous accompagner dans cette démarche et de vous aider à partager vos biens avec notre communauté.
                                        </motion.h1>
                                        <motion.p>
                                            Merci de prendre le temps de remplir ce formulaire avec soin.
                                            Lorsque vous aurez terminé, cliquez simplement sur le bouton 'PUBLIER' pour partager votre produit avec notre communauté. Nous avons hâte de voir ce que vous avez à offrir. Merci pour votre confiance.
                                        </motion.p>
                                        <motion.p>
                                            La première étape consiste à fournir la marque, le modèle, l'année de fabrication, le nombre de places et l'emplacement du véhicule.
                                        </motion.p>
                                    </>
                                }
                                {addFormStep == 2 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            La deuxième étape implique de spécifier les informations suivantes :
                                        </motion.h1>
                                        <motion.p>
                                            la carrosserie du véhicule (par exemple, berline, coupé, SUV, etc.), la couleur du véhicule, l'état du véhicule (neuve, occasion, endommagée), et le type de placement (en vente, en location).
                                        </motion.p>
                                    </>
                                }
                                {addFormStep == 3 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            "La troisième étape consiste à renseigner les détails suivants du véhicule :
                                        </motion.h1>
                                        <motion.p>
                                            KILOMÉTRAGE : Le nombre de kilomètres parcourus par la voiture.<br /><br />
                                            VITESSE : La vitesse maximale du véhicule. <br /><br />
                                            CARBURANT : Vous devez spécifier le type de carburant utilisé par la voiture (essence, diesel, hybride, électrique, etc.).<br /><br />
                                            CYLINDRÉE : Indiquez la taille du moteur en litres.
                                        </motion.p>
                                    </>
                                }
                                {addFormStep == 4 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            La quatrième étape consiste à choisir les détails suivants :
                                        </motion.h1>
                                        <motion.p>
                                            TRANSMISSION : Sélectionnez le type de transmission (Manuelle, Boite Automatique).<br /><br />
                                            PUISSANCE : Indiquez la puissance du moteur en chevaux.<br /><br />
                                            PRIX : Sélectionnez le prix de vente de la voiture.<br /><br />
                                            Si le véhicule est en vente, vous n'avez pas besoin de choisir une unité supplémentaire.<br /><br />
                                        </motion.p>
                                    </>
                                }
                                {addFormStep == 5 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            La cinquième étape vous permet de sélectionner parmi une variété de commodités disponibles pour votre véhicule. Vous pouvez choisir parmi les options suivantes
                                        </motion.h1>
                                        <motion.p>
                                            Système De Climatisation<br />
                                            Sièges Chauffants<br />
                                            Sièges Ventilés<br />
                                            Sièges En Cuir<br />
                                            Toit Ouvrant<br />
                                            Système De Navigation GPS<br />
                                            Système Audio Haut De Gamme<br />
                                            Connectivité Bluetooth<br />
                                            Musique En Streaming...
                                        </motion.p>
                                    </>
                                }
                                {addFormStep == 6 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            La sixième étape vous permet de sélectionner les documents que vous possédez pour votre véhicule. Vous pouvez choisir parmi les options suivantes
                                        </motion.h1>
                                        <motion.p>
                                            La Carte Grise<br />
                                            L'Assurance Automobile<br />
                                            La Visite Technique<br />
                                            La Vignette<br />
                                            Le Certificat De Non-Gage<br />
                                            De plus, vous avez la liberté d'ajouter toutes les informations supplémentaires ou commodités que nous n'avons pas proposées. Cela vous permet de personnaliser la description de votre véhicule selon vos besoins spécifiques.
                                        </motion.p>
                                    </>
                                }
                                {addFormStep == 7 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            La septième étape vous permet d'ajouter des images et une seule vidéo de votre véhicule
                                        </motion.h1>
                                        <motion.p>
                                            Vous pouvez ajouter des images en entrant le lien de l'image dans le champ prévu, puis en cliquant sur 'Ajouter'. De plus, vous avez la possibilité de télécharger des images en cliquant sur 'Télécharger les images' et en sélectionnant les fichiers depuis votre appareil. Si vous avez une vidéo de votre véhicule, vous pouvez également la télécharger en utilisant l'option 'Télécharger la vidéo'.
                                        </motion.p>
                                    </>
                                }
                                {addFormStep == 8 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            Félicitations ! Votre formulaire est complet et vous pouvez maintenant publier votre bien automobile.
                                        </motion.h1>
                                        <motion.p>
                                            Nous sommes ravis de vous informer que vous avez rempli toutes les informations nécessaires pour publier votre maison sur notre plateforme. Nous avons hâte de présenter votre propriété à nos clients et de les aider à trouver leur prochain lieu de séjour. Nous apprécions votre collaboration et votre diligence dans la préparation de votre formulaire. Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Encore une fois, félicitations et merci pour votre confiance en notre plateforme.
                                        </motion.p>
                                    </>
                                }
                            </>
                        ) : (
                            <>
                                {addFormStep == 0 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            Veuillez sélectionner le secteur d'activité qui correspond le mieux à votre produit.
                                            Utilisez les boutons pour choisir entre "L'industrie automobile" et "L'immobilier".
                                        </motion.h1>
                                        <motion.p>
                                            Une fois votre choix effectué, cliquez sur le bouton "Suivant" pour continuer.
                                        </motion.p>
                                    </>
                                }
                                {addFormStep == 1 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            Nous sommes ravis de vous accompagner dans cette démarche et de vous aider à partager vos produits avec notre communauté.
                                        </motion.h1>
                                        <motion.p>
                                            Merci de prendre le temps de remplir ce formulaire avec soin.
                                            Lorsque vous aurez terminé, cliquez simplement sur le bouton 'PUBLIER' pour partager votre produit avec notre communauté. Nous avons hâte de voir ce que vous avez à offrir. Merci pour votre confiance.
                                        </motion.p>
                                    </>
                                }
                                {addFormStep == 2 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            Nous vous recommandons d'inclure les caractéristiques clés de votre produit ainsi que des informations sur ses avantages et ses fonctionnalités uniques.
                                        </motion.h1>
                                        <motion.p>
                                            N'hésitez pas à être aussi précis que possible afin d'aider les clients à comprendre ce que votre produit peut leur offrir.
                                        </motion.p>
                                    </>
                                }
                                {addFormStep == 3 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            Veuillez saisir les commodités et équipements inclus dans votre produit.
                                        </motion.h1>
                                        <motion.p>
                                            Cela peut inclure des éléments tels que les accessoires, les pièces de rechange, les outils, les manuels d'utilisation, les garanties et autres équipements connexes.
                                            N'hésitez pas à être aussi détaillé que possible afin d'aider les clients à comprendre ce qu'ils peuvent attendre de votre produit et à prendre une décision d'achat éclairée.
                                        </motion.p>
                                    </>
                                }
                                {addFormStep == 4 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            Veuillez saisir l'adresse de votre propriété.
                                        </motion.h1>
                                        <motion.p>
                                            Nous avons besoin de cette information pour aider les clients à localiser votre propriété et à évaluer sa proximité par rapport à leurs besoins. Veuillez inclure le nom de la rue, le numéro de la propriété, la ville, l'état et le code postal. Si vous avez des instructions supplémentaires pour trouver votre propriété, n'hésitez pas à les inclure également.
                                        </motion.p>
                                    </>
                                }
                                {addFormStep == 5 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            Veuillez fournir les conditions financières et de sécurité pour louer votre propriété.
                                        </motion.h1>
                                        <motion.p>
                                            Cela peut inclure des informations sur les frais de location, le montant de la caution, les frais de service, les exigences de sécurité, les restrictions de paiement et autres instructions importantes pour louer votre propriété. Assurez-vous d'inclure toutes les informations pertinentes pour aider les clients à comprendre les coûts et les exigences associés à la location de votre propriété. Cela aidera les clients à prendre une décision éclairée sur la location de votre propriété.
                                        </motion.p>
                                    </>
                                }
                                {addFormStep == 6 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            Veuillez confirmer que votre propriété dispose de tous les documents nécessaires et qu'elle est sûre pour les locataires.
                                        </motion.h1>
                                        <motion.p>
                                            La construction d'une propriété nécessite des permis et documents spécifiques pour garantir la sécurité et le bien-être des occupants. Nous avons besoin de cette information pour nous assurer que votre propriété est en conformité avec les réglementations locales et qu'elle est sûre. Veuillez également nous informer de tout défaut ou problème de sécurité potentiel dans votre propriété afin que nous puissions en informer les clients potentiels. Cela aidera les clients à prendre une décision éclairée avant toutes actions.
                                        </motion.p>
                                    </>
                                }
                                {addFormStep == 7 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            La septième étape vous permet d'ajouter des images et une seule vidéo de votre bien immobilier
                                        </motion.h1>
                                        <motion.p>
                                            Vous pouvez ajouter des images en entrant le lien de l'image dans le champ prévu, puis en cliquant sur 'Ajouter'. De plus, vous avez la possibilité de télécharger des images en cliquant sur 'Télécharger les images' et en sélectionnant les fichiers depuis votre appareil. Si vous avez une vidéo de votre véhicule, vous pouvez également la télécharger en utilisant l'option 'Télécharger la vidéo'.
                                        </motion.p>
                                    </>
                                }
                                {addFormStep == 8 &&
                                    <>
                                        <motion.h1 className="addTexte">
                                            Félicitations ! Votre formulaire est complet et vous pouvez maintenant publier votre bien.
                                        </motion.h1>
                                        <motion.p>
                                            Nous sommes ravis de vous informer que vous avez rempli toutes les informations nécessaires pour publier votre maison sur notre plateforme. Nous avons hâte de présenter votre propriété à nos clients et de les aider à trouver leur prochain lieu de séjour. Nous apprécions votre collaboration et votre diligence dans la préparation de votre formulaire. Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Encore une fois, félicitations et merci pour votre confiance en notre plateforme.
                                        </motion.p>
                                    </>
                                }
                            </>
                        )}

                    </motion.div>

                    <form onSubmit={secteur === "L'industrie automobile" ? addCar : addImmobilier} className="addFormRightBox" encType="multipart/form-data">

                        {secteur === "L'industrie automobile" ? (
                            <>
                                <motion.div className="addformContent">
                                    {carStepVisible()}
                                </motion.div>
                            </>
                        ) : (
                            <>
                                <motion.div className="addformContent">
                                    {homeStepVisible()}
                                </motion.div>

                            </>
                        )}

                        <motion.div className="addFormControl">
                            <Button className={`retour ${addFormStep === 0 ? 'desabled' : ''}`} onClick={() => setAddFormStep(addFormStep - 1)}>retour</Button>
                            <Button className={`suivant ${addFormStep === 8 ? 'desabled' : ''}`} onClick={() => setAddFormStep(addFormStep + 1)}>suivant</Button>
                            <Button type='submit' className={`publier ${addFormStep !== 8 ? 'desabled' : ''}`}>publier</Button>
                        </motion.div>

                    </form>

                    <motion.button className='addModalCloseBtn btn-raduis' onClick={showAddModal}>
                        <ion-icon name="close-outline"></ion-icon>
                    </motion.button>
                </div>

            </div >

            <Footer />
        </>
    )
}
