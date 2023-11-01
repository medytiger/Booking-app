import axios from 'axios';
import React, { useEffect, useState } from 'react';
import avatar from '../../../assets/avatar.jpg'
import './CarsReservations.css'

export default function CarsReservations() {
    const [carReservations, setCarReservations] = useState([]);
    const [cars, setCars] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        async function fetchCarReservations() {
            try {
                const response = await axios.get('/carBookings');
                setCarReservations(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des réservations de voitures :", error);
                throw error; // Rethrow the error to handle it further up the chain
            }
        }

        async function fetchCars() {
            try {
                const response = await axios.get('/automobiles');
                setCars(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des voitures :", error);
                throw error; // Rethrow the error to handle it further up the chain
            }
        }

        async function fetchUsers() {
            try {
                const response = await axios.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs :", error);
                throw error; // Rethrow the error to handle it further up the chain
            }
        }

        fetchCarReservations();
        fetchCars();
        fetchUsers();
    }, []);

    function getOwnerData(ownerId) {
        const owner = users.find(user => user._id === ownerId);
        return owner ? owner : { nom: "Utilisateur inconnu" };
    }

    function getAutomobileData(automobileId) {
        const automobile = cars.find(car => car._id === automobileId);
        return automobile ? automobile : { titre: "Voiture inconnue" };
    }

    const filteredReservations = carReservations.filter(reservation =>
        getAutomobileData(reservation.automobile)?._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getAutomobileData(reservation.automobile)?.marque?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getAutomobileData(reservation.automobile)?.modele?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getAutomobileData(reservation.automobile)?.etat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getAutomobileData(reservation.automobile)?.pays?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getAutomobileData(reservation.automobile)?.ville?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getAutomobileData(reservation.automobile)?.commune?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getOwnerData(reservation.owner)?._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getOwnerData(reservation.owner)?.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getOwnerData(reservation.owner)?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getOwnerData(reservation.owner)?.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getOwnerData(reservation.owner)?.numero?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getOwnerData(reservation.owner)?.domaineActivite?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getOwnerData(reservation.owner)?.lieu?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='reservations'>
            <div className="filtre card-raduis">
                <input type="text" placeholder='Chercher une réservation' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <div className="filter card-raduis"><ion-icon name="options-outline"></ion-icon> Filtrer</div>
            </div>
            <h1>Liste des réservations de voitures [{filteredReservations.length}] </h1>
            <ul>
                {filteredReservations.map(reservation => (
                    <li key={reservation._id} className='card-raduis'>
                        <div className="reservationInfo">
                            <img className='item-raduis' src={`http://localhost:5000/medias/${getAutomobileData(reservation.automobile).images[0]}`} alt="Image voiture" loading='lazy' />
                            <div className="reservationDetail">
                                <h4>{getAutomobileData(reservation.automobile).marque} {getAutomobileData(reservation.automobile).modele} {getAutomobileData(reservation.automobile).annee}</h4>
                                <span>{getAutomobileData(reservation.automobile).pays} {getAutomobileData(reservation.automobile).ville} {getAutomobileData(reservation.automobile).commune}</span>
                                <div className="date">
                                    <span>publié le </span>
                                    <span>{new Date(getAutomobileData(reservation.automobile).updatedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="userInfo">
                            <img className='item-raduis' src={getOwnerData(reservation.owner).photo ? `http://localhost:5000/${getOwnerData(reservation.owner).photo}` : avatar} alt="Profil" loading='lazy' />
                            <div className="userdetail">
                                <h4>{getOwnerData(reservation.owner).nom}</h4>
                                <span>{getOwnerData(reservation.owner).domaineActivite}</span>
                                <div className="">
                                    + {getOwnerData(reservation.owner).prefixe}
                                    {getOwnerData(reservation.owner).numero}
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
