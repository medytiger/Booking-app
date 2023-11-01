import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './IndexMain.css'
import Section from '../Section/Section'
import ProductCard from '../../widgets/ProductCard/ProductCard'
import axios from 'axios'
import numeral from 'numeral';
import { toast } from 'react-toastify'
import { UserContext } from '../../userContext/userContext'
import { CarHomeDataContext } from '../../AddDataContext/AddDataContext'
import { motion } from 'framer-motion';

export default function IndexMain() {
    const { user } = useContext(UserContext);
    const { like,
        addHomeToFavorites,
        removeHomeFromFavorites,
        addCarToFavorites,
        removeCarFromFavorites,
    } = useContext(CarHomeDataContext);
    const [allHomes, setAllHomes] = useState([]);
    const [allCars, setAllCars] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [budgetVisible, setBudgetVisible] = useState(false);


    const [rangeValue, setRangeValue] = useState('99999999999999');

    const allData = [...allHomes, ...allCars];

    async function fetchData() {
        try {
            // Récupération des biens immobiliers
            const homesResponse = await axios.get('/immobiliers');
            if (homesResponse.status === 200) {
                // Vérifiez les propriétés "active" dans les données
                const homesWithActive = homesResponse.data.filter((home) =>
                    home.hasOwnProperty('active')
                );
                // Filtrer les biens immobiliers actifs
                let homes = homesWithActive.filter((home) => home.active === 'true');

                // Trier les biens immobiliers par date de publication du plus récent au plus ancien
                homes = homes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 100);

                setAllHomes(homes);
            } else {
                toast.error(
                    'Une erreur est survenue lors de la récupération des biens immobiliers'
                );
            }

            // Récupération des biens automobiles
            const carsResponse = await axios.get('/automobiles');

            if (carsResponse.status === 200) {
                const carsWithActive = carsResponse.data.filter((car) =>
                    car.hasOwnProperty('active')
                );

                // Filtrer les biens automobiles actifs
                let cars = carsWithActive.filter((car) => car.active === 'true');

                // Trier les biens automobiles par date de publication du plus récent au plus ancien
                cars = cars.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 100);

                setAllCars(cars);
            } else {
                toast.error(
                    'Une erreur est survenue lors de la récupération des biens automobiles'
                );
            }
        } catch (error) {
            toast.error('Une erreur est survenue lors de la récupération des données');
        }
    }

    useEffect(() => {
        fetchData();
    }, [like]);




    const handleFiltreChange = (filtre) => {
        if (selectedFilters.includes(filtre)) {
            setSelectedFilters(selectedFilters.filter((item) => item !== filtre));
        } else {
            setSelectedFilters([...selectedFilters, filtre]);
        }
    };

    function filtrerDonnees(donnees, filtres, rangeValue) {
        return donnees.filter((item) => {
            const valeurs = Object.values(item);
            const chaine = valeurs.join(' ').toLowerCase();

            if (filtres.length > 0) {
                const correspondFiltres = filtres.some(filter => chaine.includes(filter.toLowerCase()));
                return correspondFiltres;
            }

            return true;
        }).filter(item => parseFloat(item.prix) <= parseFloat(rangeValue));
    }

    const filteredHomes = filtrerDonnees(allHomes, selectedFilters, rangeValue);
    const filteredCars = filtrerDonnees(allCars, selectedFilters, rangeValue);


    const handleRangeChange = (event) => {
        setRangeValue(event.target.value);
    }

    const showBudget = () => {
        setBudgetVisible(!budgetVisible);
    };

    const FiltreOptions = [
        'Immobiliers',
        'Automobiles',
    ];

    let maxPrice = Math.max(...allData.map((item) => item.prix));


    const containerVariants = {
        offscreen: { y: 50, opacity: 0 },
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
        <motion.div
            className='container indexMain'
            initial='offscreen'
            whileInView='onscreen'
            viewport={{ once: false, amount: 0.1 }}
            variants={containerVariants}
            transition={{ staggerChildren: 0.5 }}
        >

            <motion.div className="container-menu">
                <motion.div className="index-menu">

                    <motion.div className="selectContainer">
                        {FiltreOptions.map((filtre) => (
                            <div className="selectGroup" key={filtre}>
                                <input
                                    type="checkbox"
                                    name={filtre}
                                    id={filtre}
                                    checked={selectedFilters.includes(filtre)}
                                    onChange={() => handleFiltreChange(filtre)}
                                />

                                <motion.label className="shadow" htmlFor={filtre}>
                                    {filtre}
                                </motion.label>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div className="IndexFiltre budget card-raduis shadow">
                        <span>Budget :</span>
                        <div className="rangeContainer">

                            <span className={`tonBudget card-raduis ${budgetVisible ? "budgetVisible" : ""}`}>
                                {rangeValue} FCFA
                            </span>

                            <div className="range">
                                <span className="left">0</span>
                                <input
                                    type="range"
                                    min='0'
                                    max={maxPrice}
                                    step='1'
                                    onMouseEnter={showBudget}
                                    onMouseLeave={showBudget}
                                    onChange={handleRangeChange}
                                />
                                <span className="right">{maxPrice}</span>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
                <motion.div className="indexFilter card-raduis">
                    <ion-icon name="options-outline"></ion-icon>
                    <span>Filtrer</span>
                </motion.div>
            </motion.div>

            {filteredHomes.length > 0 && (
                <Section>
                    <motion.div className="section-head">
                        <motion.div className="titre">
                            <motion.h1>Immobiliers<span></span></motion.h1>
                            <motion.p>Découvrez notre sélection de biens immobiliers disponibles</motion.p>
                        </motion.div>
                    </motion.div>
                    <motion.div className="sectionMain">
                        {filteredHomes
                            .filter(home => home.owner)
                            .map(home => (
                                <ProductCard key={home._id} className='proprieteCard'>
                                    <motion.div className="like" >
                                        <span>{home.favories.length}</span>
                                        {home.favories.includes(user?._id) ? (
                                            <span onClick={() => { removeHomeFromFavorites(home._id) }}>
                                                <ion-icon name="heart"></ion-icon>
                                            </span>
                                        ) : (
                                            <span onClick={() => { addHomeToFavorites(home._id) }}>
                                                <ion-icon name="heart-outline"></ion-icon>
                                            </span>
                                        )}
                                    </motion.div>
                                    <Link to={`/home-details/${home._id}`}>
                                        <motion.div className="card-img">
                                            <motion.img src={`http://localhost:5000/medias/${home.images[0]}`} alt={home.titre} loading="lazy" />
                                        </motion.div>
                                        <motion.div
                                            className="infos"
                                            initial='offscreen'
                                            whileInView='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            <motion.h2>{home.titre}</motion.h2>
                                            <motion.h5>{home.typePropiete.join(", ")} {home.typePlacement}</motion.h5>
                                            <motion.div className="lieu">
                                                <ion-icon name="location-outline"></ion-icon>
                                                {home.commune} {home.ville}
                                            </motion.div>

                                            <motion.div className="prixEtDuree">
                                                <motion.div className="prix">
                                                    {numeral(home.prix).format('0,0').replace(/,/g, ' ')} <span>FCFA</span>
                                                </motion.div>
                                                {home.duree ? '/' : ''}

                                                <motion.div className="duree">
                                                    <motion.span> {home.duree} </motion.span>
                                                </motion.div>
                                            </motion.div>

                                        </motion.div>
                                    </Link>
                                </ProductCard>
                            ))}
                    </motion.div>
                </Section>
            )}

            {filteredCars.length > 0 && (
                <Section>
                    <motion.div className="section-head">
                        <motion.div className="titre">
                            <motion.h1>automobiles <span></span></motion.h1>
                            <motion.p>Découvrez notre sélection de voitures disponibless</motion.p>
                        </motion.div>
                    </motion.div>
                    <motion.div className="sectionMain">
                        {filteredCars
                            .filter(car => car.owner)
                            .map(car => (
                                <ProductCard key={car._id} className='proprieteCard'>
                                    <motion.div className="like" >
                                        <motion.span>{car.favories.length}</motion.span>
                                        {car.favories.includes(user?._id) ? (
                                            <motion.span
                                                onClick={() => { removeCarFromFavorites(car._id) }}
                                            >
                                                <ion-icon name="heart"></ion-icon>
                                            </motion.span>
                                        ) : (
                                            <motion.span
                                                onClick={() => { addCarToFavorites(car._id) }}
                                            >
                                                <ion-icon name="heart-outline"></ion-icon>
                                            </motion.span>
                                        )}
                                    </motion.div>
                                    <Link to={`/car-details/${car._id}`}>
                                        <motion.div className="card-img">
                                            <motion.img className=' card-raduis' src={`http://localhost:5000/medias/${car.images[0]}`} alt={car.titre} loading="lazy" />
                                        </motion.div>
                                        <motion.div
                                            className="infos"
                                            initial='offscreen'
                                            whileInView='onscreen'
                                            viewport={{ once: false, amount: 0.2 }}
                                            variants={containerVariants}
                                            transition={{ staggerChildren: 0.5 }}
                                        >
                                            <motion.h2>{car.marque} - {car.modele} {car.annee}</motion.h2>
                                            <motion.h5> {car.typePlacement} </motion.h5>
                                            <motion.div className="lieu">
                                                <ion-icon name="location-outline"></ion-icon>
                                                {car.commune} {car.ville}
                                            </motion.div>
                                            <motion.div className="prixEtDuree">
                                                <motion.span >
                                                    {car.transmission}
                                                </motion.span>

                                                {car.carburant &&
                                                    <motion.span className='carburant'>
                                                        |
                                                    </motion.span>
                                                }
                                                {car.carburant &&
                                                    <motion.span className='carburant'>
                                                        <motion.span> {car.carburant} </motion.span>
                                                    </motion.span>
                                                }
                                            </motion.div>
                                            <motion.div className="prixEtDuree">
                                                <motion.div className="prix">
                                                    {numeral(car.prix).format('0,0').replace(/,/g, ' ')} <span>FCFA</span>
                                                </motion.div>

                                                {car.duree !== '' && (
                                                    <>
                                                        <span>/</span>
                                                        <motion.div className="duree">
                                                            {car.duree}
                                                        </motion.div>
                                                    </>
                                                )}
                                            </motion.div>

                                        </motion.div>
                                    </Link>
                                </ProductCard>
                            ))}
                    </motion.div>
                </Section>
            )}



        </motion.div >
    )
}
