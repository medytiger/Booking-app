import axios from 'axios';
import React, { useEffect, useState } from 'react';
import avatar from '../../../assets/avatar.jpg';
import './homesReservations.css';

export default function HomesReservations() {
    const [homeReservations, setHomeReservations] = useState([]);
    const [homes, setHomes] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchHomeReservations() {
            try {
                const response = await axios.get('/homeBookings');
                setHomeReservations(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des réservations immobilières :", error);
            }
        }

        async function fetchHomes() {
            try {
                const response = await axios.get('/immobiliers');
                setHomes(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des biens immobiliers :", error);
            }
        }

        async function fetchUsers() {
            try {
                const response = await axios.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs :", error);
            }
        }

        fetchHomeReservations();
        fetchHomes();
        fetchUsers();
    }, []);

    function getOwnerData(ownerId) {
        const owner = users.find(user => user._id === ownerId);
        return owner ? owner : { nom: "Utilisateur inconnu" };
    }

    function getImmobilierData(immobilierId) {
        const home = homes.find(home => home._id === immobilierId);
        return home ? home : { titre: "Maison inconnue" };
    }

    const filteredReservations = homeReservations.filter(reservation =>
        getImmobilierData(reservation.home)?._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getImmobilierData(reservation.home)?.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getImmobilierData(reservation.home)?.typePlacement?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getImmobilierData(reservation.home)?.standing?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getImmobilierData(reservation.home)?.duree?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getImmobilierData(reservation.home)?.ville?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getImmobilierData(reservation.home)?.commune?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getImmobilierData(reservation.home)?.commune?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            <h1>Liste des réservations immobilières [{filteredReservations.length}] </h1>
            <ul>
                {filteredReservations.map(reservation => (
                    <li key={reservation._id} className='card-raduis'>
                        <div className="reservationInfo">
                            <img className='item-raduis' src={`http://localhost:5000/medias/${getImmobilierData(reservation.home)?.images?.[0]}`} alt="Image maison" loading='lazy' />
                            <div className="reservationDetail">
                                <h4>{getImmobilierData(reservation.home).titre}</h4>
                                <span>{getImmobilierData(reservation.home).pays} {getImmobilierData(reservation.immobilier).ville} {getImmobilierData(reservation.immobilier).commune}</span>
                                <div className="date">
                                    <span>publié le </span>
                                    <span>{new Date(getImmobilierData(reservation.home).updatedAt).toLocaleDateString()}</span>
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
