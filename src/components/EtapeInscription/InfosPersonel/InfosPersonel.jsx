import React, { useContext, useState } from 'react'
import './InfosPersonel.css'
import { UserContext } from '../../../userContext/userContext';
import { motion } from 'framer-motion';


export default function InfosPersonel() {
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
    const [showPassword, setShowPassword] = useState(false);


    return (
        <motion.div className='infosPersonel'
            initial='offscreen'
            whileInView='onscreen'
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            transition={{ staggerChildren: 0.5 }}
        >

            {userData.type === "Personnel" && (
                <div className='signInputSection'>
                    <h3>Nom et prénon(s)</h3>
                    <input
                        className='btn-raduis'
                        type="text"
                        placeholder='Nom complet. Exemple:(Ahmed konaté)'
                        value={userData.nom}
                        onChange={(e) => setUserData({ ...userData, nom: e.target.value })}
                    />
                </div>
            )}
            {userData.type === "Entreprise" && (
                <>
                    <div className="signInputSection">
                        <h3>Nom et prénon(s)</h3>
                        <input
                            className='btn-raduis'
                            type="text"
                            placeholder='Nom complet. Exemple:(Ahmed konaté)'
                            value={userData.nom}
                            onChange={(e) => setUserData({ ...userData, nom: e.target.value })}
                        />
                    </div>

                    <div className="signInputSection">
                        <h3>Nom de l'entreprise</h3>
                        <input
                            className='btn-raduis'
                            type="text"
                            placeholder=" Nom d'entreprise Exemple:(AK Corporation)"
                            value={userData.nomEntreprise}
                            onChange={(e) => setUserData({ ...userData, nomEntreprise: e.target.value })}
                        />
                    </div>
                </>
            )}
            {userData.type === "Hybride" && (
                <>
                    <div className="signInputSection">
                        <h3>Nom et prénon(s)</h3>
                        <input
                            className='btn-raduis'
                            type="text"
                            placeholder='Nom complet. Exemple:(Ahmed konaté)'
                            value={userData.nom}
                            onChange={(e) => setUserData({ ...userData, nom: e.target.value })}
                        />
                    </div>

                    <div className="signInputSection">
                        <h3>Nom de l'entreprise</h3>
                        <input
                            className='btn-raduis'
                            type="text"
                            placeholder=" Nom d'entreprise Exemple:(KIPUS AFRIQUE)"
                            value={userData.nomEntreprise}
                            onChange={(e) => setUserData({ ...userData, nomEntreprise: e.target.value })}
                        />
                    </div>
                </>
            )}

            <div className='signInputSection'>
                <h3>votre Email</h3>
                <input className='btn-raduis' type="email" placeholder='Email Exemple:(koanteahmed@gmail.com)' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} autoComplete='off' />
            </div>

            <div className='signInputSection'>
                <h3>votre mot de passe</h3>

                <input className='btn-raduis' type={showPassword ? 'text' : 'password'} placeholder='Mot de passe' value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} autoComplete='off' />
                {showPassword ? (
                    <ion-icon
                        name="eye-outline"
                        onClick={() => setShowPassword(false)}
                    ></ion-icon>
                ) : (
                    <ion-icon
                        name="eye-off-outline"
                        onClick={() => setShowPassword(true)}
                    ></ion-icon>
                )}
            </div>
        </motion.div>
    )
}