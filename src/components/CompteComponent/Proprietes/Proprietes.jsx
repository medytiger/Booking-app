import React, { useContext, useEffect, useState } from "react";
import axios from "axios"; // Ajoutez cette ligne d'importation
import './Proprietes.css'
import ProductCard from '../../../widgets/ProductCard/ProductCard'
import { Link, useParams } from 'react-router-dom'
import { CarHomeDataContext } from "../../../AddDataContext/AddDataContext";
import { toast } from "react-toastify";
import { UserContext } from "../../../userContext/userContext";
import Loader from "../../Loader/Loader";
import { motion } from 'framer-motion'
import numeral from "numeral";
import proprieteImg from '../../../assets/undraw_No_data_re_kwbl.png'



export default function Proprietes() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { ready } = useContext(UserContext);
    if (!ready) {
        return <Loader />
    }

    const { id } = useParams();
    const [myHomes, setMyHomes] = useState([]);
    const [myCars, setMyCars] = useState([]);
    const [isActive, setIsActive] = useState(false)
    const { setHomeData, setCarData, addModalVisible, setAddModalVisible, actualiseData, setActualiseData } = useContext(CarHomeDataContext);



    const handleHomeClick = async (clickedId) => {
        setAddModalVisible(!addModalVisible);

        try {
            const response = await axios.get(`/immobilier/${clickedId}`);
            const { data } = response;
            // Pré-remplir les données du bien dans le formulaire
            setHomeData({
                id: data._id,
                typePropiete: data.typePropiete,
                typePlacement: data.typePlacement,
                standing: data.standing,
                titre: data.titre,
                description: data.description,
                commodite: data.commodite,
                pays: data.pays,
                ville: data.ville,
                commune: data.commune,
                quartier: data.quartier,
                nomRue: data.nomRue,
                codePostal: data.codePostal,
                prix: data.prix,
                duree: data.duree,
                condition: data.condition,
                permis: data.permis,
                problemePermis: data.problemePermis,
                images: data.images,
                video: data.video,
                homeLink: data.homeLink,
            });
        } catch (error) {
            console.error(error);
        }
    };


    const handleCarClick = async (clickedId) => {
        setAddModalVisible(!addModalVisible);

        try {
            const response = await axios.get(`/automobile/${clickedId}`);
            const { data } = response
            setCarData({
                id: data._id,
                marque: data.marque,
                modele: data.modele,
                annee: data.annee,
                nombrePlaces: data.nombrePlaces,
                typePlacement: data.typePlacement,
                pays: data.pays,
                ville: data.ville,
                commune: data.commune,
                quartier: data.quartier,
                nomRue: data.nomRue,
                codePostal: data.codePostal,
                carrosserie: data.carrosserie,
                couleur: data.couleur,
                kilometrage: data.kilometrage,
                carburant: data.carburant,
                cylindree: data.cylindree,
                transmission: data.transmission,
                puissance: data.puissance,
                prix: data.prix,
                duree: data.duree,
                etat: data.etat,
                commodite: data.commodite,
                documents: data.documents,
                description: data.description,
                images: data.images,
                video: data.video,
                carLink: data.carLink,
            })
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        async function fetchData() {
            try {
                // Récupération des biens immobiliers
                const homesResponse = await axios.get('/mes-immobiliers');
                if (homesResponse.status === 200) {
                    const immobilierData = homesResponse.data.filter((home) => home.secteur === 'Immobiliers');
                    setMyHomes(immobilierData);
                } else {
                    toast.error('Une erreur est survenue lors de la récupération de vos biens immobiliers');
                }

                // Récupération des biens automobiles
                const carsResponse = await axios.get('/mes-automobiles');
                if (carsResponse.status === 200) {
                    const automobileData = carsResponse.data.filter((car) => car.secteur === 'Automobiles');
                    setMyCars(automobileData);
                } else {
                    toast.error('Une erreur est survenue lors de la récupération de vos biens automobiles');
                }
            } catch (error) {
                console.error('Une erreur est survenue lors de la récupération de vos données :', error);
            }
        }

        fetchData();
        // Incluez la valeur que vous souhaitez surveiller comme dépendance ici
    }, [isActive, actualiseData]);


    async function deleteHome(id) {
        try {
            const response = await axios.delete(`/immobilier/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                const updatedHomes = myHomes.filter(home => home._id !== id);
                setMyHomes(updatedHomes);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteCar(id) {
        try {
            const response = await axios.delete(`/automobile/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                const updatedCars = myCars.filter(car => car._id !== id);
                setMyCars(updatedCars);
                toast.success('Supprimée avec succès !');
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la suppression :', error);
        }
    }


    // Fonction pour activer un bien immobilier
    const activateHome = (homeId) => {
        axios
            .put(`/immobilier/${homeId}/active`, { active: true })
            .then((response) => {
                toast.success('Activé avec succès');
                setIsActive(!isActive)
            })
            .catch((error) => {
                // Gérez les erreurs si nécessaire
                console.error(error);

            });
    };

    // Fonction pour désactiver un bien immobilier
    const deactivateHome = (homeId) => {
        axios
            .put(`/immobilier/${homeId}/active`, { active: false })
            .then((response) => {
                setIsActive(!isActive)
                toast.success('Désactivé avec succès');
            })
            .catch((error) => {
                // Gérez les erreurs si nécessaire
                console.error(error);

            });
    };



    async function deactivateCar(carId) {
        axios
            .put(`/automobile/${carId}/active`, { active: false })
            .then((response) => {
                setIsActive(!isActive)
                toast.success('Désactivé avec succès');
            })
            .catch((error) => {
                // Gérez les erreurs si nécessaire
                console.error(error);

            });
    }

    async function activateCar(carId) {
        axios
            .put(`/automobile/${carId}/active`, { active: true })
            .then((response) => {
                setIsActive(!isActive)
                toast.success('Activé avec succès');
            })
            .catch((error) => {
                // Gérez les erreurs si nécessaire
                console.error(error);

            });
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

    return (
        <motion.div className='proprietes'
            initial='offscreen'
            animate='onscreen'
            viewport={{ once: false, amount: 0.2 }}
            variants={containerVariants}
            transition={{ staggerChildren: 0.5 }}
        >
            {myHomes.length > 0 || myCars.length > 0 ? (
                <>
                    {myHomes.length > 0 ? (<motion.h1>industrie immobilière</motion.h1>) : ('')}


                    <motion.div className="proprietesContainer">
                        {myHomes.length > 0 ? (
                            myHomes.map(home => (
                                <ProductCard key={home._id} className='proprieteCard'>

                                    <motion.button className='btn-raduis supprimer'
                                        onClick={() => {
                                            if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bien immobilier ?')) {
                                                deleteHome(home._id);
                                            }
                                        }}>
                                        Supprimer
                                    </motion.button>
                                    {home.active === 'true' ? (
                                        <motion.button
                                            className='btn-raduis archiver'
                                            onClick={() => deactivateHome(home._id)}
                                        >
                                            Désactiver
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            className='btn-raduis archiver'
                                            onClick={() => activateHome(home._id)}
                                        >
                                            Activer
                                        </motion.button>
                                    )}
                                    <Link onClick={() => handleHomeClick(home._id)}>

                                        <motion.div className="card-img">
                                            <img className=' card-raduis' src={`http://localhost:5000/medias/${home.images[0]}`} alt={home.titre} loading='lazy' />
                                        </motion.div>
                                        <motion.div className="infos"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >

                                            <motion.h2 className="titre">{home.titre}</motion.h2>
                                            <motion.h5>{home.typePropiete.join(", ")}</motion.h5>
                                            <motion.div className="lieu">
                                                <ion-icon name="location-outline"></ion-icon>
                                                {home.ville} - {home.commune}
                                            </motion.div>
                                            <motion.p className="cardDesciption">
                                                {home.description}
                                            </motion.p>
                                            <motion.div className="prixEtDuree"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >
                                                <motion.div className="prix">
                                                    {numeral(home.prix).format('0,0').replace(/,/g, ' ')} <span>FCFA</span>
                                                </motion.div>

                                                {home.duree !== '' && (
                                                    <>
                                                        <motion.span>/</motion.span>
                                                        <motion.div className="duree">
                                                            {home.duree}
                                                        </motion.div>
                                                    </>
                                                )}
                                            </motion.div>

                                            <motion.div className="note">
                                                <span>{home.favories.length}</span>
                                                <ion-icon name="heart"></ion-icon>
                                            </motion.div>
                                        </motion.div>
                                    </Link>
                                </ProductCard>
                            ))
                        ) : (
                            ''
                        )}
                    </motion.div>


                    {myCars.length > 0 ? (<motion.h1>Industrie automobile</motion.h1>) : ('')}


                    <motion.div className="proprietesContainer"
                        initial='offscreen'
                        animate='onscreen'
                        viewport={{ once: false, amount: 0.2 }}
                        variants={containerVariants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        {myCars.length > 0 ? (
                            myCars.map(car => (
                                <ProductCard key={car._id} className='proprieteCard'>
                                    <motion.button className='btn-raduis supprimer'
                                        onClick={() => {
                                            if (window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
                                                deleteCar(car._id);
                                            }
                                        }}>
                                        Supprimer
                                    </motion.button>
                                    {car.active === 'true' ? (
                                        <motion.button
                                            className='btn-raduis archiver'
                                            onClick={() => deactivateCar(car._id, !car.active)}
                                        >
                                            Désactiver
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            className='btn-raduis archiver'
                                            onClick={() => activateCar(car._id, !car.active)}
                                        >
                                            Activer
                                        </motion.button>
                                    )}

                                    <Link onClick={() => handleCarClick(car._id)}>
                                        <motion.div className="card-img">
                                            <img className=' card-raduis' src={`http://localhost:5000/medias/${car.images[0]}`} alt={car.titre} loading='lazy' />
                                        </motion.div>
                                        <motion.div className="infos"
                                            initial='offscreen'
                                            animate='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            <motion.h2>{car.marque}</motion.h2>
                                            <motion.div className="lieu">
                                                <ion-icon name="location-outline"></ion-icon>
                                                {car.ville} - {car.commune}
                                            </motion.div>

                                            <motion.p className="cardDesciption">
                                                {car.description}
                                            </motion.p>

                                            <motion.div className="prixEtDuree"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >
                                                <motion.div className="prix">
                                                    {numeral(car.prix).format('0,0').replace(/,/g, ' ')} <span>FCFA</span>
                                                </motion.div>

                                                {car.duree !== '' && (
                                                    <>
                                                        <motion.span>/</motion.span>
                                                        <motion.div className="duree">
                                                            {car.duree}
                                                        </motion.div>
                                                    </>
                                                )}
                                            </motion.div>


                                            <motion.div className="note">
                                                <span>{car.favories.length}</span>
                                                <ion-icon name="heart"></ion-icon>
                                            </motion.div>

                                        </motion.div>
                                    </Link>
                                </ProductCard>
                            ))
                        ) : (
                            ''
                        )}


                    </motion.div>
                </>
            ) : (
                <img className='reservationImg' src={proprieteImg} alt="" loading="lazy" />
            )}

        </motion.div>
    )
}
