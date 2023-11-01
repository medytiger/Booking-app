import axios from 'axios';
import React, { useEffect, useState } from 'react';
import avatar from '../../../assets/avatar.jpg'
import './Cars.css';

export default function Cars() {
    const [users, setUsers] = useState([]);
    const [cars, setCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs:", error);
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

        fetchUsers();
        fetchCars();
    }, []);

    function getOwnerData(ownerId) {
        const owner = users.find(user => user._id === ownerId);
        return owner ? owner : { nom: "Utilisateur inconnu" };
    }

    // Avant le retour du composant
    const ownerDataMap = {};
    cars.forEach(car => {
        ownerDataMap[car.owner] = getOwnerData(car.owner);
    });

    const filteredCars = cars
        .filter(car =>
            car.marque.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.modele.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.pays.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
            // ... autres conditions
            (ownerDataMap[car.owner]?._id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (ownerDataMap[car.owner]?.nom || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (ownerDataMap[car.owner]?.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (ownerDataMap[car.owner]?.lieu || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (ownerDataMap[car.owner]?.pays || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (ownerDataMap[car.owner]?.ville || '').toLowerCase().includes(searchTerm.toLowerCase())
            // ... autres conditions
        )
        .filter(car =>
            !selectedUser || car.owner === selectedUser
        )
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));



    return (
        <div className='car'>
            <div className="filtre card-raduis">
                <input type="text" placeholder='Chercher une voiture' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <div className="filter card-raduis"><ion-icon name="options-outline"></ion-icon> Filtrer</div>
            </div>
            <h1>Liste des voitures [{filteredCars.length}] </h1>
            <ul>
                {filteredCars.map(car => (
                    <li key={car._id} className='card-raduis'>
                        <img className='item-raduis' src={`http://localhost:5000/medias/${car.images[0]}`} alt="Image voiture" loading='lazy' />
                        <div className="carInfo">
                            <h4>{car.marque} {car.modele} {car.annee}</h4>
                            <span>{car.pays} {car.ville} {car.commune}</span>
                            <div className="date">
                                <span>publié le</span>
                                <span>{new Date(car.updatedAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="userInfo">
                            <img className='item-raduis' src={getOwnerData(car.owner).photo ? `http://localhost:5000/${getOwnerData(car.owner).photo}` : avatar} alt="Profil" loading='lazy' />
                            <div >
                                <h4>{getOwnerData(car.owner).nom}</h4>
                                <span>{getOwnerData(car.owner).domaineActivite}</span>
                                <div className="userdetail">
                                    +
                                    <span>{getOwnerData(car.owner).prefixe}</span>
                                    <span>{getOwnerData(car.owner).numero}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
