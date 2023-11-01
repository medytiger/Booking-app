import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../userContext/userContext';
import './Dashboard.css';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import avatar from '../../assets/avatar.jpg'
import Loader from '../../components/Loader/Loader';

const DASHBOARD_PATH = '/dashboard';

export default function Dashboard() {
    const { user, ready } = useContext(UserContext);
    if (!ready) {
        return <Loader />
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const [users, setUsers] = useState([]);
    const [homes, setHomes] = useState([]);
    const [homeReservations, setHomeReservations] = useState([]);
    const [cars, setCars] = useState([]);
    const [carReservations, setCarReservations] = useState([]);

    // Vérifie si l'utilisateur est authentifié et est administrateur
    const isAdmin = user && user.isAdmin;

    // Redirige l'utilisateur vers la page d'accueil s'il n'est pas administrateur
    if (!isAdmin) {
        navigate('/');
        return null;
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const usersResponse = await axios.get('/users');
                setUsers(usersResponse.data);
                const carsResponse = await axios.get('/automobiles');
                setCars(carsResponse.data);
                const homesResponse = await axios.get('/immobiliers');
                setHomes(homesResponse.data);
                const carReservationsResponse = await axios.get('/carBookings');
                setCarReservations(carReservationsResponse.data);
                const homeReservationsResponse = await axios.get('/homeBookings');
                setHomeReservations(homeReservationsResponse.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        }

        fetchData();
    }, []);



    const latestUsers = users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);

    const latestHomes = homes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);

    const latestHomeReservations = homeReservations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);

    const latestCars = cars.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);

    const latestCarReservations = carReservations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);


    // Pour chaque réservation, trouvez la maison correspondante et ajoutez les informations de la maison à la réservation
    const reservationsWithHomes = latestHomeReservations.map(reservation => {
        const home = homes.find(home => home._id === reservation.home);
        return {
            ...reservation,
            home: home || { titre: "Maison inconnue" } // Si la maison n'est pas trouvée, utilisez un objet par défaut avec un titre
        };
    });

    const reservationsWithCars = latestCarReservations.map(reservation => {
        const automobile = cars.find(automobile => automobile._id === reservation.automobile);
        return {
            ...reservation,
            automobile: automobile
        };
    });

    return (
        <>
            <Navbar />
            <div className="dashboard container">
                <div className="dashboardOutletLinkContainer">
                    <div className="dashboardOutletLink shadow card-raduis">
                        <Link to={DASHBOARD_PATH} className='outfitLink'><ion-icon name="today-outline"></ion-icon>Dashboard</Link>
                        <Link to={`${DASHBOARD_PATH}/utilisateurs`} className='outfitLink'><ion-icon name="person-outline"></ion-icon>Utilisateurs</Link>
                        <Link to={`${DASHBOARD_PATH}/maisons`} className='outfitLink'><ion-icon name="home-outline"></ion-icon>Biens immobiliers</Link>
                        <Link to={`${DASHBOARD_PATH}/maisons-reservees`} className='outfitLink'><ion-icon name="bookmarks-outline"></ion-icon>Réservations immobilières</Link>
                        <Link to={`${DASHBOARD_PATH}/voitures`} className='outfitLink'><ion-icon name="car-sport-outline"></ion-icon>Biens automobiles</Link>
                        <Link to={`${DASHBOARD_PATH}/voitures-reservees`} className='outfitLink'><ion-icon name="bookmarks-outline"></ion-icon>Réservations automobiles</Link>
                    </div>

                </div>
                {location.pathname === DASHBOARD_PATH ? (
                    <div className="dashboardItem">

                        <div className="users card-raduis">
                            <div className="headUsercontent">
                                <h1>Total utilisateurs : {users.length}</h1>
                                <div className="usersImg">
                                    {latestUsers.length > 0 && latestUsers.map(user => (
                                        <img className='item-raduis ' key={user._id} src={user.photo ? `http://localhost:5000/${user.photo}` : avatar} alt="Profil" loading='lazy' />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="homes card-raduis">
                            <div className="home">
                                <h2>Biens immobiliers</h2>
                                <h3>{homes.length} Biens</h3>
                            </div>
                            <div className="images">
                                {latestHomes.length > 0 && latestHomes.map(latestHome => (
                                    <img
                                        key={latestHome._id}
                                        className="item-raduis"
                                        src={`http://localhost:5000/medias/${latestHome.images[0]}`}
                                        alt={`Image bien immobilier ${latestHome.titre}`}
                                        loading='lazy'
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="homeBookings card-raduis">
                            <div className="homeBooking">
                                <h2>Réservations immobilières</h2>
                                <h3>{homeReservations.length} Réservations</h3>
                            </div>
                            <div className="images">
                                {reservationsWithHomes.length > 0 && reservationsWithHomes.map(reservation => (
                                    <img
                                        key={reservation._id}
                                        className="item-raduis"
                                        src={`http://localhost:5000/medias/${reservation.home.images[0]}`}
                                        alt={`Image bien immobilier ${(reservation.home.titre)}`}
                                        loading='lazy'
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="cars card-raduis">
                            <div className="carsContent">
                                <h2>Biens automobiles</h2>
                                <h3>{cars.length} Biens</h3>
                            </div>
                            <div className="images">
                                {latestCars.length > 0 && latestCars.map(latestCar => (
                                    <img
                                        key={latestCar._id}
                                        className="item-raduis"
                                        src={`http://localhost:5000/medias/${latestCar.images[0]}`}
                                        alt={`Image bien automobile ${latestCar._id}`}
                                        loading='lazy'
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="carbookings card-raduis">
                            <div className="carBooking">
                                <h2>Réservations automobiles</h2>
                                <h3>{carReservations.length} Réservations</h3>
                            </div>
                            <div className="images">
                                {reservationsWithCars.length > 0 && reservationsWithCars.map(reservation => (
                                    <img
                                        key={reservation._id}
                                        className="item-raduis"
                                        src={`http://localhost:5000/medias/${reservation.automobile.images[0]}`}
                                        alt={`Image bien automobile ${(reservation.automobile.titre)}`}
                                        loading='lazy'
                                    />
                                ))}
                            </div>
                        </div>

                    </div>

                ) : (
                    <div className="dashboardOutle card-raduis">
                        <Outlet />
                    </div>
                )}
            </div>
        </>
    );
}

