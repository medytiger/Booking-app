import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Reservations.css';
import { UserContext } from '../../../userContext/userContext';
import avatar from '../../../assets/avatar.jpg'
import reservationImg from '../../../assets/undraw_No_data_re_kwbl.png'
import Loader from '../../Loader/Loader';
import { motion } from 'framer-motion'
import numeral from 'numeral';


export default function maisonReservee() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
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
                duration: 1
            }
        }
    };

    const [maisonReservee, setMaisonReservee] = useState([]);
    const [automobileReserve, setAutomobileReserve] = useState([]);
    const [actualisation, setActualisation] = useState(false);

    useEffect(() => {
        axios.get('/mes-maisons-reservee')
            .then(response => {
                setMaisonReservee(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [actualisation]);

    useEffect(() => {
        axios.get('/mes-voitures-reservee')
            .then(response => {
                setAutomobileReserve(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [actualisation]);


    return (

        <motion.div className='reservations'
            initial='offscreen'
            animate='onscreen'
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariants}
            transition={{ staggerChildren: 0.5 }}
        >
            <motion.h1>Réservations</motion.h1>
            {maisonReservee.length > 0 || automobileReserve.length > 0 ? (
                <>
                    <motion.div className="reservationContainer"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        {maisonReservee
                            .filter(reservation => reservation.owner && reservation.home.owner === user._id)
                            .map(reservation => (
                                <motion.div key={reservation._id} className="reservationContent"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <motion.div className="reservationCard shadow card-raduis"
                                        initial='offscreen'
                                        animate='onscreen'
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={containerVariants}
                                        transition={{ staggerChildren: 0.5 }}
                                    >
                                        {/* Informations sur la maison */}
                                        <motion.div className="productCard card-raduis"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            <motion.div className="productImage"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >

                                                <motion.img src={`http://localhost:5000/medias/${reservation.home.images[0]}`} alt="" loading='lazy' />
                                            </motion.div>
                                            <motion.div className="productInfo"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >
                                                <motion.h4 className='titre'>{reservation.home.titre}</motion.h4>
                                                <motion.span className='ville'>{reservation.home.ville} {reservation.home.commune} {reservation.home.quartier}</motion.span>
                                                <motion.span className='prix'><ion-icon name="card-outline"></ion-icon>{numeral(reservation.home.prix).format('0,0').replace(/,/g, ' ')} FCFA</motion.span>
                                            </motion.div>
                                        </motion.div>

                                        {/* Informations sur le client */}
                                        <motion.div className="clientCard client card-raduis"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            {/* Informations sur le client */}
                                            <motion.div className="client"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >
                                                <motion.div className="clientImage item-raduis">
                                                    <motion.img className='photoProfil' src={reservation.owner.photo ? `http://localhost:5000/${reservation.owner.photo}` : avatar} alt="Profil" loading='lazy' />
                                                </motion.div>
                                                <motion.div className="clientdetail"
                                                    initial='offscreen'
                                                    animate='onscreen'
                                                    viewport={{ once: false, amount: 0.2 }}
                                                    variants={containerVariants}
                                                    transition={{ staggerChildren: 0.5 }}
                                                >
                                                    <motion.h3>{reservation.nom}</motion.h3>
                                                    <motion.div className="clientContact"
                                                        initial='offscreen'
                                                        animate='onscreen'
                                                        viewport={{ once: false, amount: 0.2 }}
                                                        variants={containerVariants}
                                                        transition={{ staggerChildren: 0.5 }}
                                                    >
                                                        <motion.span><a href={`mailto:${reservation.email}`}>{reservation.email}</a></motion.span>
                                                        <motion.span>|</motion.span>
                                                        <motion.span>{reservation.prefixe} {reservation.numero}</motion.span>
                                                    </motion.div>
                                                </motion.div>
                                            </motion.div>

                                            {/* Durée de la réservation */}
                                            <motion.div className="clientInfos"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >
                                                <motion.h5>Durée de réservation</motion.h5>
                                                <motion.div className="dateContainer"
                                                    initial='offscreen'
                                                    animate='onscreen'
                                                    viewport={{ once: false, amount: 0.2 }}
                                                    variants={containerVariants}
                                                    transition={{ staggerChildren: 0.5 }}
                                                >
                                                    <motion.span className='date'><ion-icon name="calendar-outline"></ion-icon>{new Date(reservation.dateArrive).toLocaleDateString()}</motion.span>
                                                    <ion-icon name="arrow-forward-outline"></ion-icon>
                                                    <motion.span className='date'><ion-icon name="calendar-outline"></ion-icon>{new Date(reservation.dateDepart).toLocaleDateString()}</motion.span>
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            ))}

                        {automobileReserve
                            .filter(reservation => reservation.owner && reservation.automobile.owner === user._id)
                            .map(reservation => (
                                <motion.div key={reservation._id} className="reservationContent"
                                    initial='offscreen'
                                    animate='onscreen'
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={containerVariants}
                                    transition={{ staggerChildren: 0.5 }}
                                >
                                    <div className="reservationCard shadow card-raduis">
                                        {/* Informations sur l'automobile */}
                                        <motion.div className="productCard card-raduis"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >

                                            <motion.div className="productImage">
                                                <img src={`http://localhost:5000/medias/${reservation.automobile.images[0]}`} alt="" loading='lazy' />
                                            </motion.div>
                                            <motion.div className="productInfo"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >
                                                <motion.h4 className='titre'>{reservation.automobile.marque} {reservation.automobile.model} {reservation.automobile.annee}</motion.h4>
                                                <motion.span className='ville'>{reservation.automobile.ville} {reservation.automobile.commune} {reservation.automobile.quartier}</motion.span>
                                                <motion.span className='prix'><ion-icon name="card-outline"></ion-icon> {numeral(reservation.automobile.prix).format('0,0').replace(/,/g, ' ')} FCFA </motion.span>

                                                <motion.span className='ville'>{reservation.chauffeur !== 'Oui' ? 'Sans chauffeur' : 'Avec chauffeur'}</motion.span>

                                            </motion.div>
                                        </motion.div>

                                        {/* Informations sur le client */}
                                        <motion.div className="clientCard client card-raduis">
                                            <motion.div className="client"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >
                                                <motion.div className="clientImage item-raduis">
                                                    <img className='photoProfil' src={reservation.owner.photo ? `http://localhost:5000/${reservation.owner.photo}` : avatar} alt="Profil" loading='lazy' />
                                                </motion.div>
                                                <motion.div className="clientdetail"
                                                    initial='offscreen'
                                                    animate='onscreen'
                                                    viewport={{ once: false, amount: 0.2 }}
                                                    variants={containerVariants}
                                                    transition={{ staggerChildren: 0.5 }}
                                                >
                                                    <motion.h3>{reservation.nom}</motion.h3>
                                                    <motion.div className="clientContact"
                                                        initial='offscreen'
                                                        animate='onscreen'
                                                        viewport={{ once: false, amount: 0.2 }}
                                                        variants={containerVariants}
                                                        transition={{ staggerChildren: 0.5 }}
                                                    >
                                                        <motion.span><a href={`mailto:${reservation.email}`}>{reservation.email}</a></motion.span>
                                                        <motion.span>|</motion.span>
                                                        <motion.span>{reservation.numero}</motion.span>
                                                    </motion.div>
                                                </motion.div>
                                            </motion.div>

                                            {/* Durée de la réservation de l'automobile */}
                                            <motion.div className="clientInfos"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >
                                                <motion.h5>Durée de réservation</motion.h5>
                                                <motion.div className="dateContainer"
                                                    initial='offscreen'
                                                    animate='onscreen'
                                                    viewport={{ once: false, amount: 0.2 }}
                                                    variants={containerVariants}
                                                    transition={{ staggerChildren: 0.5 }}
                                                >
                                                    <motion.span className='date'><ion-icon name="calendar-outline"></ion-icon>{new Date(reservation.dateOccupation).toLocaleDateString()}</motion.span>
                                                    <ion-icon name="arrow-forward-outline"></ion-icon>
                                                    <motion.span className='date'><ion-icon name="calendar-outline"></ion-icon>{new Date(reservation.dateDepot).toLocaleDateString()}</motion.span>
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                    </motion.div>
                </>
            ) : (

                <motion.img className='reservationImg' src={reservationImg} alt="" loading='lazy' />
            )
            }
        </motion.div>


    );

}
