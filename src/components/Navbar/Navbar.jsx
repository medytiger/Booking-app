import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import './Navbar.css'
import { UserContext } from '../../userContext/userContext';
import Button from '../../widgets/Button/Button';
import ButtonFondColeur from '../../widgets/ButtonFondColeur/ButtonFondColeur';

import avatar from '../../assets/avatar.jpg'
import logo from '../../assets/Nomade.png'
import ProductCard from '../../widgets/ProductCard/ProductCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { CarHomeDataContext } from '../../AddDataContext/AddDataContext';
import numeral from 'numeral';

export default function Navbar() {
    const { user,
        registeUser,
        isModalVisible, setIsModalVisible,
        handleLogout,
        activePanel,
        setActivePanel,
        isMenuVisible,
        setIsMenuVisible,
        registeStepActive,
        registeEtape, setRegisteEtape,
        loginStepActive,
    } = useContext(UserContext);
    const { like,
        addHomeToFavorites,
        removeHomeFromFavorites,
        addCarToFavorites,
        removeCarFromFavorites,
    } = useContext(CarHomeDataContext);



    const [allHomes, setAllHomes] = useState([]);
    const [allCars, setAllCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const [hasBackground, setHasBackground] = useState(false);
    const [search, setSearch] = useState(false)


    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const isNotHomePage = window.location.pathname !== '/' && window.location.pathname !== '';
            const isScrolled = scrollTop > 0;
            const hasBackground = isNotHomePage || isScrolled || search;
            setHasBackground(hasBackground);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [search]);


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
                // Triez les biens immobiliers par date de création décroissante
                homes = homes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


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

                let cars = carsWithActive.filter((car) => car.active === 'true');
                // Triez les biens automobiles par date de création décroissante
                cars = cars.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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

    function handleSearchTermChange(event) {
        setSearchTerm(event.target.value);
    }

    function deactiveSearch() {
        setSearch(false)
    }



    function filterAllProperties(data, searchTerm) {
        return data.filter((item) => {
            const values = Object.values(item);
            const string = values.join(' ').toLowerCase();
            return string.includes(searchTerm.toLowerCase());
        });
    }

    const filteredHomes = filterAllProperties(allHomes, searchTerm);
    const filteredCars = filterAllProperties(allCars, searchTerm);



    const showMenu = (e) => {
        setIsMenuVisible(!isMenuVisible);
    };

    const showModal = () => {
        setIsModalVisible(!isModalVisible);
    };


    const showPanel = (e) => {
        setActivePanel(!activePanel);
    };

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
        <>
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
            <div className={`container navbar  ${hasBackground ? 'has-background glass' : ''}`}>
                <motion.div className="logo"
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >
                    <Link className='logoLink' to="/">
                        <img src={logo} alt="le logo de Nomade" />
                    </Link>
                </motion.div>

                <motion.div className="search-zone">
                    <div className={`search-content card-raduis ${search ? "optionClear" : ""}`} onClick={() => setSearch(true)}>
                        <div className="search">
                            <input type="text" placeholder='Rechercher' className='card-raduis' onChange={handleSearchTermChange} />
                            <div className="activeInput" >
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div className="compte">

                    <Link to={'/annonce'} className='annonce card-raduis'>Annonce</Link>

                    <div className="compteMenu"
                        onMouseEnter={showMenu}
                        onMouseLeave={showMenu}
                    >
                        {!user ? (
                            <ion-icon name="finger-print-outline" ></ion-icon>
                        ) : (
                            <div className={`photoProfilContainer  ${isMenuVisible ? " visible" : ""}`}>
                                <img className='photoProfil' src={user.photo ? `http://localhost:5000/${user.photo}` : avatar} alt="Profil" />
                            </div>
                        )}
                        <div className={`menu glass  ${isMenuVisible ? " visible" : ""}`}>

                            {!user ? (
                                <Link className='link' onClick={showModal}>
                                    Authentification
                                </Link>
                            ) : (
                                <>
                                    <Link to={'/profil'} onClick={showMenu} className='link'>
                                        Profil
                                    </Link>
                                    <Link to={'/compte'} onClick={showMenu} className='link'>
                                        Compte
                                    </Link>
                                </>
                            )}

                            <Link to='/about' className='link' onClick={showMenu}>A propos</Link>
                            <Link to='/annonce' className='link' onClick={showMenu}>Annonce</Link>
                            <Link to='/mettre-un-bien-sur-Nomade' className='link' onClick={showMenu}>Partenariat</Link>
                            <div className="navAide">
                                <Link to='/confidentialité' className='link' onClick={showMenu}>Confidentialité</Link>
                                <Link to="/centre-d'aide" className='link' onClick={showMenu}>Aide</Link>
                                {user && (
                                    <Link className='link' onClick={handleLogout}>Déconnection</Link>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div >

            {search && (
                <motion.div className="searchResult"
                    initial='offscreen'
                    animate='onscreen'
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >

                    <motion.div className="searchClose" onClick={deactiveSearch}>
                        <button><ion-icon name="close-outline"></ion-icon></button>
                    </motion.div>

                    <div className="sectionMain">
                        {filteredHomes.length > 0 || filteredCars.length > 0 ? (
                            <>
                                {filteredHomes.map((home) => (
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
                                            <div className="card-img card-raduis">
                                                <img src={`http://localhost:5000/medias/${home.images[0]}`} alt={home.titre} />
                                            </div>
                                            <motion.div className="infos"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >
                                                <motion.h2>{home.titre}</motion.h2>
                                                <motion.h5>{home.typePropiete.join(", ")} {home.typePlacement}</motion.h5>
                                                <motion.div className="lieu">
                                                    <ion-icon name="location-outline"></ion-icon>
                                                    {home.commune} - {home.ville}
                                                </motion.div>

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
                                                    {home.duree && (
                                                        <>
                                                            /
                                                            <motion.div className="duree">
                                                                <span> {home.duree} </span>
                                                            </motion.div>
                                                        </>

                                                    )}
                                                </motion.div>

                                            </motion.div>
                                        </Link>
                                    </ProductCard>
                                ))}

                                {filteredCars.map((car) => (
                                    <ProductCard key={car._id} className='proprieteCard '>
                                        <motion.div className="like" >
                                            <span>{car.favories.length}</span>
                                            {car.favories.includes(user?._id) ? (
                                                <span onClick={() => { removeCarFromFavorites(car._id) }}>
                                                    <ion-icon name="heart"></ion-icon>
                                                </span>
                                            ) : (
                                                <span onClick={() => { addCarToFavorites(car._id) }}>
                                                    <ion-icon name="heart-outline"></ion-icon>
                                                </span>
                                            )}
                                        </motion.div>
                                        <Link to={`/car-details/${car._id}`}>
                                            <motion.div className="card-img card-raduis"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >
                                                <motion.img src={`http://localhost:5000/medias/${car.images[0]}`} alt={car.titre} />
                                            </motion.div>
                                            <motion.div className="infos"
                                                initial='offscreen'
                                                animate='onscreen'
                                                viewport={{ once: false, amount: 0.2 }}
                                                variants={containerVariants}
                                                transition={{ staggerChildren: 0.5 }}
                                            >
                                                <motion.h2>{car.marque} - {car.modele} {car.annee}</motion.h2>
                                                <motion.h5> {car.typePlacement} </motion.h5>

                                                <motion.div className="prixEtDuree"
                                                    initial='offscreen'
                                                    animate='onscreen'
                                                    viewport={{ once: false, amount: 0.2 }}
                                                    variants={containerVariants}
                                                    transition={{ staggerChildren: 0.5 }}
                                                >
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
                                                            <span> {car.carburant} </span>
                                                        </motion.span>
                                                    }
                                                </motion.div>
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
                                                            /
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
                            </>
                        ) : (
                            <div className='nonDisponible'>
                                <h4>Désolé, ce bien n'est pas disponible pour le moment. Vous pouvez toutefois poster une annonce pour informer notre réseau.</h4>
                            </div>
                        )}
                    </div>

                </motion.div>
            )}


            <div className={`signModal  ${isModalVisible ? "modalVisible" : ""}`}>

                <motion.button className='modalClose btn-raduis' onClick={showModal}>
                    <ion-icon name="close-outline"></ion-icon>
                </motion.button>

                <motion.div className={`globalFormcontainer glass card-raduis ${activePanel ? "activePanel" : ""}`}
                    initial='offscreen'
                    whileInView='onscreen'
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    transition={{ staggerChildren: 0.5 }}
                >

                    <div className="form-container sign-up-container">
                        <motion.form onSubmit={registeUser}
                            initial='offscreen'
                            whileInView='onscreen'
                            viewport={{ once: true, amount: 0.2 }}
                            variants={containerVariants}
                            transition={{ staggerChildren: 0.5 }}
                        >

                            <div className="etape">
                                {registeStepActive()}
                            </div>

                            <div className="formControl">

                                <div className={`signButton last ${registeEtape == 0 ? 'desabled' : ''}`} onClick={() => setRegisteEtape(registeEtape - 1)}>
                                    <ion-icon name="arrow-back-outline"></ion-icon>
                                </div>

                                <div className={`signButton next ${registeEtape == 2 ? 'desabled' : ''}`} onClick={() => setRegisteEtape(registeEtape + 1)}>
                                    <ion-icon name="arrow-forward-outline"></ion-icon>
                                </div>

                                <Button type="submit" className={`signButton registe ${registeEtape !== 2 ? 'desabled' : ''}`}>
                                    Inscription
                                </Button>

                            </div>

                        </motion.form>
                    </div>

                    <div className="form-container sign-in-container">
                        {loginStepActive()}
                    </div>

                    <div className="overlay-container ">
                        <div className="overlay card-raduis">
                            <div className="overlay-panel overlay-left">
                                <h2>Bienvenue</h2>
                                <p>
                                    Nous espérons que vous passez une excellente journée et que vous trouverez tout ce dont vous avez besoin chez nous.
                                    <br />
                                    <br />
                                    <strong>Connectez-vous pour accéder à votre compte.</strong>
                                </p>
                                <ButtonFondColeur onClick={showPanel} className='ghost singIn '>
                                    connexion
                                </ButtonFondColeur>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h2>Nous sommes ravis de vous accueillir !</h2>
                                <p>
                                    Nous espérons que vous passerez un excellent moment sur notre site et que vous trouverez tout ce dont vous avez besoin pour profiter pleinement de nos services.
                                    <br />
                                    <br />
                                    <strong>Inscrivez-vous pour créer un compte et accéder à toutes nos fonctionnalités.</strong>
                                </p>
                                <ButtonFondColeur onClick={showPanel} className='ghost singUp '>
                                    inscription
                                </ButtonFondColeur>
                            </div>
                        </div>
                    </div>

                </motion.div>

            </div>

        </>
    )
}
