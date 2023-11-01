import React, { useContext } from 'react'
import './Authentification.css'
import { UserContext } from '../../../userContext/userContext';
import { motion } from 'framer-motion';

export default function Authentification() {
    const containerVariants = {
        offscreen: { y: 50, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                duration: 2
            }
        }
    };
    const { userData, setUserData, } = useContext(UserContext);

    return (
        <motion.div className='authentification'
            initial='offscreen'
            whileInView='onscreen'
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            transition={{ staggerChildren: 0.5 }}
        >
            <h2>Creez un compte</h2>
            <div className="social-contiainer">
                <a href="#" className='facebook'><ion-icon name="logo-facebook"></ion-icon></a>
                <a href="#" className='google'><ion-icon name="logo-google"></ion-icon></a>
                <a href="#" className='linkedin'><ion-icon name="logo-linkedin"></ion-icon></a>
            </div>
            <span>ou entrez vos informations pour vous inscrir</span>

            <div className='signInputSection'>
                <h3>Type de compte</h3>
                <div className="selectContainer">
                    <div className="selectGroup">
                        <input type="radio" name="type" id="Personnel" checked={userData.type === "Personnel"} onChange={(e) => setUserData({ ...userData, type: "Personnel" })} />
                        <label className="card-raduis shadow" htmlFor="Personnel">
                            Personnel
                        </label>
                    </div>
                    <div className="selectGroup">
                        <input type="radio" name="type" id="Entreprise" checked={userData.type === "Entreprise"} onChange={(e) => setUserData({ ...userData, type: "Entreprise" })} />
                        <label className="card-raduis shadow" htmlFor="Entreprise">
                            Entreprise
                        </label>
                    </div>
                    <div className="selectGroup">
                        <input type="radio" name="type" id="hybride" checked={userData.type === "Hybride"} onChange={(e) => setUserData({ ...userData, type: "Hybride" })} />
                        <label className="card-raduis shadow" htmlFor="hybride">
                            Hybride
                        </label>
                    </div>
                </div>
            </div>

            <div className='signInputSection'>
                <h3>Domaine d'activite</h3>
                <input className='btn-raduis' type="text" placeholder="Domaine d'activité (Agent immobilier) " value={userData.domaineActivite} onChange={(e) => setUserData({ ...userData, domaineActivite: e.target.value })} />
            </div>
        </motion.div>
    )
}
