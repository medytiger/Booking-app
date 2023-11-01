import axios from 'axios';
import React, { useEffect, useState } from 'react';
import avatar from '../../../assets/avatar.jpg'
import './Homes.css'

export default function Homes() {
    const [users, setUsers] = useState([]);
    const [homes, setHomes] = useState([]);
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

        async function fetchHomes() {
            try {
                const response = await axios.get('/immobiliers');
                setHomes(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des biens immobiliers :", error);
                throw error; // Rethrow the error to handle it further up the chain
            }
        }

        fetchUsers();
        fetchHomes();
    }, []);

    function getOwnerData(ownerId) {
        const owner = users.find(user => user._id === ownerId);
        return owner ? owner : { nom: "Utilisateur inconnu" };
    }

    // Avant le retour du composant
    const ownerDataMap = {};
    homes.forEach(home => {
        ownerDataMap[home.owner] = getOwnerData(home.owner);
    });

    const filteredHomes = homes
        .filter(home =>
            home._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            home.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            home.pays.toLowerCase().includes(searchTerm.toLowerCase()) ||
            home.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
            home.commune.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ownerDataMap[home.owner]?._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ownerDataMap[home.owner]?.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ownerDataMap[home.owner]?.domaineActivite.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ownerDataMap[home.owner]?.lieu.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ownerDataMap[home.owner]?.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(home =>
            !selectedUser || home.owner === selectedUser
        )
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return (
        <div className='home'>
            <div className="filtre card-raduis">
                <input type="text" placeholder='Chercher une maison' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <div className="filter card-raduis"><ion-icon name="options-outline"></ion-icon> Filtrer</div>
            </div>
            <h1>Liste des biens immobiliers [{filteredHomes.length}] </h1>
            <ul>
                {filteredHomes.map(home => (
                    <li key={home._id} className='card-raduis'>
                        <img className='item-raduis' src={`http://localhost:5000/medias/${home.images[0]}`} alt="Image maison" loading='lazy' />
                        <div className="homeInfo">
                            <h4>{home.titre}</h4>
                            <span> {home.pays} {home.ville} {home.commune}</span>
                            <div className="date">
                                <span>publié le</span>
                                <span>{new Date(home.updatedAt).toLocaleDateString()}</span>

                            </div>
                        </div>
                        <div className="userInfo">
                            <img className='item-raduis' src={getOwnerData(home.owner).photo ? `http://localhost:5000/${getOwnerData(home.owner).photo}` : avatar} alt="Profil" loading='lazy' />
                            <div className="">
                                <h4>{getOwnerData(home.owner).nom}</h4>
                                <span>{getOwnerData(home.owner).domaineActivite}</span>
                                <div className="userdetail">
                                    +
                                    <span>{getOwnerData(home.owner).prefixe}</span>
                                    <span>{getOwnerData(home.owner).numero}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}