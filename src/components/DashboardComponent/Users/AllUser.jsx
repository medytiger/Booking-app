import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import avatar from '../../../assets/avatar.jpg'
import './AllUser.css'
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../../userContext/userContext';


export default function AllUser() {

    const { id } = useParams();
    const userConnect = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);

    // Récupère la liste des utilisateurs et leurs biens immobiliers et automobiles
    useEffect(() => {
        async function fetchUsers() {
            try {
                const usersResponse = await axios.get('/users');
                const homesResponse = await axios.get('/immobiliers');
                const carsResponse = await axios.get('/automobiles');
                const homesBookingResponse = await axios.get('/homeBookings');
                const carsBookingResponse = await axios.get('/carBookings');

                const users = usersResponse.data;
                const homes = homesResponse.data;
                const homesBookings = homesBookingResponse.data;
                const cars = carsResponse.data;
                const carsBookings = carsBookingResponse.data;

                // Associe les biens, les réservations et les utilisateurs correspondants
                const usersWithHomesAndCars = users.map(user => {

                    const userHomes = homes.filter(home => home.owner === user._id);
                    const userCars = cars.filter(car => car.owner === user._id);
                    const userHomeBookings = homesBookings.filter(homesBooking => homesBooking.owner === user._id);
                    const userCarBookings = carsBookings.filter(carsBooking => carsBooking.owner === user._id);
                    const myHomeBookings = homesBookings.filter(homesBooking => homesBooking.owner !== user._id && homes.find(home => home.owner === user._id));
                    const myCarBookings = carsBookings.filter(carsBooking => carsBooking.owner !== user._id && cars.find(car => car.owner === user._id));

                    return {
                        ...user,
                        homes: userHomes,
                        cars: userCars,
                        homeBookings: userHomeBookings,
                        carBookings: userCarBookings,
                        myHomeBookings: myHomeBookings,
                        myCarBookings: myCarBookings,
                    };
                });

                // Inverse l'ordre des utilisateurs pour afficher le dernier inscrit en haut
                const reversedUsers = usersWithHomesAndCars.reverse();
                setUsers(reversedUsers);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs :", error);
            }
        }

        fetchUsers();
    }, []);



    const filtreOption = [
        'personnel',
        'entreprise',
        'Hybride',
    ];

    // Définissez une fonction pour gérer les changements de la chaîne de recherche
    function handleSearchTextChange(event) {
        setSearchText(event.target.value.toLowerCase());
    }

    // Définissez une fonction pour gérer les changements de filtre
    function handleCheckboxChange(event) {
        const selectedType = event.target.value.toLowerCase();
        if (event.target.checked) {
            setSelectedFilters([...selectedFilters, selectedType]);
        } else {
            setSelectedFilters(selectedFilters.filter(filter => filter !== selectedType));
        }
    }

    // Utilisez la fonction `filter()` pour filtrer les utilisateurs en fonction de la chaîne de recherche et des options de filtre sélectionnées
    const filteredUsers = users.filter(user => {
        return (searchText === '' || Object.values(user).some(value => String(value).toLowerCase().includes(searchText))) && (selectedFilters.length === 0 || selectedFilters.includes(user.type.toLowerCase()));
    });

    // Définissez une fonction pour ouvrir le modal
    function openUserDetail() {
        setIsUserDetailOpen(!isUserDetailOpen);
    }

    // Définissez une fonction pour gérer la sélection d'un utilisateur
    function handleUserClick(user) {
        setSelectedUser(user);
        openUserDetail()
    }



    return (
        <div>
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

            <div>

                <div className="filterContainer shadow card-raduis">

                    <div className="selectContainer">
                        {filtreOption.map((type) => (
                            <div className="selectGroup" key={type}>
                                <input
                                    type="checkbox"
                                    id={type}
                                    value={type}
                                    onChange={handleCheckboxChange}
                                    checked={selectedFilters.includes(type.toLowerCase())}
                                />
                                <label htmlFor={type}>
                                    {type}
                                </label>
                            </div>
                        ))}
                    </div>
                    <input type="text" placeholder='Rechercher un utilisateur' value={searchText} onChange={handleSearchTextChange} />
                    <div className="filter card-raduis">
                        <ion-icon name="options-outline"></ion-icon>
                        Filtrer
                    </div>
                </div>

                <ul className='userContainer'>
                    <h1>Liste des Utilisateurs [{users.length}]</h1>
                    {filteredUsers.map(user => (
                        <li className='userCard shadow card-raduis' key={user._id} onClick={() => { handleUserClick(user) }}>
                            <img className='card-raduis' src={user.photo ? `http://localhost:5000/${user.photo}` : avatar} alt="Profil" loading='lazy' />
                            <div className='userListInfo item-raduis'>
                                <h4>
                                    {user.nom}
                                </h4>
                                <div className='item'>
                                    {user.domaineActivite}
                                </div>
                                <div className='item'>
                                    {user.type}
                                </div>
                            </div>

                            <div className='biensUtilisateur card-raduis'>
                                <h5>Biens utilisateur</h5>
                                <div className="nombreBiens">
                                    <p className='item-raduis'>
                                        <span>{user.homes.length}</span>
                                        <span className='item'>homes</span>
                                    </p>
                                    <p className='item-raduis'>
                                        <span>{user.cars.length}</span>
                                        <span className='item'>cars</span>
                                    </p>
                                </div>
                            </div>

                            <div className='contactConatiner card-raduis'>
                                <h5>Contacts utilisateur</h5>
                                <div className="contact">
                                    <span>
                                        {user.email}
                                    </span>
                                    <span>
                                        +{user.prefixe}{user.numero}
                                    </span>

                                </div>
                            </div>

                        </li>
                    ))}
                </ul>

            </div>

            {
                isUserDetailOpen && (
                    <div className="userDetail">
                        <div className="close" onClick={openUserDetail}>
                            <ion-icon name="close-outline"></ion-icon>
                        </div>
                        <div className="user card-raduis">

                            <div className="userHead card-raduis">
                                <img className='card-raduis' src={selectedUser.photo ? `http://localhost:5000/${selectedUser.photo}` : avatar} alt="Profil" loading='lazy' />

                                <div className='selectUserInfo item-raduis'>
                                    <h4>
                                        {selectedUser.nom}
                                    </h4>
                                    <div className='item'>
                                        {selectedUser.domaineActivite}
                                    </div>
                                    <div className='item'>
                                        {selectedUser.type}
                                    </div>
                                    <div>
                                        {selectedUser.email}
                                    </div>
                                    <div>
                                        +{selectedUser.prefixe}{selectedUser.numero}
                                    </div>
                                </div>


                            </div>

                            <div className="userBodyDescription">
                                <div className="userBodyDescriptionItem  card-raduis">
                                    <div className='bodyItem'>
                                        <h4>{selectedUser.nom}</h4>  {selectedUser.date ? (`, né${selectedUser.genre === "Homme" ? "" : "e"} le ${selectedUser.date}`) : ('')}
                                    </div>
                                    <div className='bodyItem'>
                                        <h4>Domaine d'activité:</h4> {selectedUser.domaineActivite}
                                    </div>
                                    <div className='bodyItem'>
                                        <h4>lieu:</h4> {selectedUser.lieu}
                                    </div>
                                </div>
                                <div className="userBodyDescriptionItem  card-raduis">
                                    <div className='bodyItem'>
                                        {selectedUser.nomEntreprise && (
                                            <div className='entreprise'>
                                                <h4>Nom entreprise:</h4>
                                                <span>{selectedUser.nomEntreprise}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className='bodyItem'>
                                        {selectedUser.descriptionActivite}
                                    </div>

                                </div>
                                <div className="userBodyDescriptionItem  card-raduis">
                                    <div className='bodyItem'>
                                        <h4>Identifiant:</h4>
                                        {selectedUser._id}
                                    </div>
                                    <div className='bodyItem'>
                                        <h4>Date de création:</h4>
                                        <span>{new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className='bodyItem'>
                                        <h4>Mis à jour le:</h4>
                                        <span>{new Date(selectedUser.updatedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                            </div>

                            <div className='selectedBiensUtilisateur card-raduis'>
                                <div className='biens item-raduis'>
                                    <span>{selectedUser.homes.length} Biens </span>
                                    <span className='item'> immobiliers</span>
                                </div>
                                <div className='biens item-raduis'>
                                    <span>{selectedUser.cars.length} Biens</span>
                                    <span className='item'> automobiles</span>
                                </div>
                                <div className='biens item-raduis'>
                                    <span>{selectedUser.homeBookings.length} Biens</span>
                                    <span className='item'> immobiliers</span>
                                    <span className='item'> réservé</span>
                                    <span className='item'> utilisateur</span>
                                </div>
                                <div className='biens item-raduis'>
                                    <span>{selectedUser.carBookings.length} Biens</span>
                                    <span className='item'> automobiles</span>
                                    <span className='item'> réservé</span>
                                    <span className='item'> utilisateur</span>
                                </div>
                                <div className='biens item-raduis'>
                                    <span>{selectedUser.myHomeBookings.length} Biens</span>
                                    <span className='item'> immobiliers</span>
                                    <span className='item'> réservé</span>
                                    <span className='item'> client</span>
                                </div>
                                <div className='biens item-raduis'>
                                    <span>{selectedUser.myCarBookings.length} Biens</span>
                                    <span className='item'> automobiles</span>
                                    <span className='item'> réservé</span>
                                    <span className='item'> client</span>
                                </div>

                            </div>

                            <div className="userDetailBody">

                                <div className="userBodyItem BodyItemImage card-raduis">
                                    <h3>Biens utilisateur</h3>
                                    <div className="userBodyItemImage">

                                        {selectedUser.homes && selectedUser.homes.map((home, index) => (
                                            <div className='cardUserSelectContainer card-raduis' key={index}>
                                                <div className='cardUserSelect'>
                                                    <span>
                                                        {home.titre}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                        {selectedUser.cars && selectedUser.cars.map((car, index) => (
                                            <div className='cardUserSelectContainer card-raduis' key={index}>
                                                <div className='cardUserSelect'>
                                                    <span>
                                                        {car.marque}-{car.modele}

                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                <div className="userBodyItem BodyItemImage card-raduis">
                                    <h3>réservations {selectedUser.nom}</h3>
                                    <div className="userBodyItemImage">

                                        {selectedUser.homeBookings && selectedUser.homeBookings.map((booking, index) => (
                                            <div className='cardUserSelectContainer card-raduis' key={index}>
                                                <div className='cardUserSelect'>
                                                    <span>Identifiant Maison : {booking.home}</span>
                                                </div>
                                            </div>
                                        ))}

                                        {selectedUser.carBookings && selectedUser.carBookings.map((car, index) => (
                                            <div className='cardUserSelectContainer card-raduis' key={index}>
                                                <div className='cardUserSelect'>
                                                    <span>Identifiant Automobile : {car.automobile}</span>
                                                    {/* <span>Publié par : {car.owner}</span> */}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                <div className="userBodyItem BodyItemImage card-raduis">
                                    <h3>Réservations des clients</h3>
                                    <div className="userBodyItemImage">
                                        {selectedUser.myHomeBookings && selectedUser.myHomeBookings.map((booking, index) => (
                                            <div className='cardUserSelectContainer card-raduis' key={index}>
                                                <div className='cardUserSelect card-raduis'>
                                                    <span>Identifiant Maison : {booking.home}</span>
                                                    <span>Réservé par : {booking.owner}</span>
                                                </div>
                                            </div>
                                        ))}
                                        {selectedUser.myCarBookings && selectedUser.myCarBookings.map((booking, index) => (
                                            <div className='cardUserSelectContainer card-raduis' key={index}>
                                                <div className='cardUserSelect'>
                                                    <span>Identifiant Automobile : {booking.automobile}</span>
                                                    <span>Réservé par : {booking.owner}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                )
            }

        </div >
    )
}
